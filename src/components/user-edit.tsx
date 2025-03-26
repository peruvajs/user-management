"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSelectedUser, updateUser } from "../store/usersSlice";
import type { User } from "../types";
import "../styles/user-edit.css";

const UserEdit = () => {
  const dispatch = useDispatch();
  const selectedUser = useSelector(selectSelectedUser);
  const [formData, setFormData] = useState<Partial<User> | null>(null);

  useEffect(() => {
    if (selectedUser) {
      setFormData({ ...selectedUser });
    } else {
      setFormData(null);
    }
  }, [selectedUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (formData) {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData && selectedUser) {
      dispatch(updateUser({ id: selectedUser.id, userData: formData }));
    }
  };

  if (!selectedUser || !formData) {
    return (
      <div className="user-edit-container empty">
        <div className="no-selection-message">
          Выберите пользователя из списка для редактирования
        </div>
      </div>
    );
  }

  return (
    <div className="user-edit-container">
      <div className="user-edit-header">
        <div className="user-avatar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
        <h2>Пользователь {selectedUser.id}</h2>
      </div>
      <form onSubmit={handleSubmit} className="user-edit-form">
        <div className="form-group">
          <label htmlFor="firstName">Имя</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName || ""}
            onChange={handleChange}
            placeholder="Введите имя"
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Фамилия</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName || ""}
            onChange={handleChange}
            placeholder="Введите фамилию"
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Возраст</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age || ""}
            onChange={handleChange}
            placeholder="Введите возраст"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            placeholder="Введите email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="jobTitle">Должность</label>
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={formData.jobTitle || ""}
            onChange={handleChange}
            placeholder="Не указано"
          />
        </div>
        <div className="form-group">
          <label htmlFor="department">Отдел</label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department || ""}
            onChange={handleChange}
            placeholder="Не указано"
          />
        </div>
        <div className="form-group">
          <label htmlFor="company">Компания</label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company || ""}
            onChange={handleChange}
            placeholder="Не указано"
          />
        </div>
        <button type="submit" className="save-button">
          Сохранить
        </button>
      </form>
    </div>
  );
};

export default UserEdit;
