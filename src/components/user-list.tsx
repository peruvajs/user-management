"use client";

import React from "react";

import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FixedSizeList } from "react-window";
import {
  selectUsers,
  selectSelectedUserId,
  setSelectedUser,
} from "../store/usersSlice";
import type { User } from "../types";
import "../styles/user-list.css";

const ITEMS_PER_PAGE = 100000;

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const selectedUserId = useSelector(selectSelectedUserId);
  const [listHeight, setListHeight] = useState(window.innerHeight - 100);
  const [currentPage, setCurrentPage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const ListComponent = FixedSizeList as any;

  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);

  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, users.length);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setListHeight(window.innerHeight - 100);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSelectUser = (user: User) => {
    dispatch(setSelectedUser(user.id));
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
      dispatch(setSelectedUser(0));
    }
  };

  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const userIndex = startIndex + index;
    const user = users[userIndex];
    if (!user) return null;

    return (
      <div
        className={`user-item ${selectedUserId === user.id ? "selected" : ""}`}
        style={style}
        onClick={() => handleSelectUser(user)}
      >
        <div className="user-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
        <div className="user-info">
          <div className="user-name">Пользователь {user.id}</div>
          <div className="user-email">{user.email}</div>
        </div>
      </div>
    );
  };

  const totalUsers = users.length;
  const currentRange = `${startIndex + 1}-${endIndex}`;

  return (
    <div className="user-list-container" ref={containerRef}>
      <div className="user-list-header">
        <h2>Список пользователей</h2>
        <div className="pagination-info">
          Показаны записи {currentRange} из {totalUsers}
        </div>
      </div>
      {users.length > 0 ? (
        <>
          <ListComponent
            className="user-list"
            height={listHeight - 100}
            itemCount={Math.min(ITEMS_PER_PAGE, endIndex - startIndex)}
            itemSize={60}
            width="100%"
          >
            {Row}
          </ListComponent>

          <div className="user-list-footer">
            <div className="page-jump">
              <span>Страница:</span>
              <input
                type="number"
                min="1"
                max={totalPages}
                value={currentPage + 1}
                onChange={(e) => {
                  const page = Number.parseInt(e.target.value) - 1;
                  if (!isNaN(page) && page >= 0 && page < totalPages) {
                    handlePageChange(page);
                  }
                }}
              />
              <span>из {totalPages}</span>
            </div>
          </div>
        </>
      ) : (
        <div className="loading-message">Загрузка пользователей...</div>
      )}
    </div>
  );
};

export default UserList;
