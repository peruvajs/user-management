"use client";

import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import UserList from "./components/user-list";
import UserEdit from "./components/user-edit";
import { fetchUsers } from "./store/usersSlice";
import "./App.css";
import React from "react";

function App() {
  useEffect(() => {
    store.dispatch(fetchUsers());
  }, []);

  return (
    <Provider store={store}>
      <div className="app-container">
        <header className="app-header"></header>
        <main className="app-content">
          <UserList />
          <UserEdit />
        </main>
      </div>
    </Provider>
  );
}

export default App;
