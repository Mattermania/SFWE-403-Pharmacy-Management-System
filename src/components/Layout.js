import React from "react";
import { Outlet } from "react-router-dom";
import SignOutButton from "./SignOutButton"; // Ensure SignOutButton exists in components

const Layout = () => {
  return (
    <div className="layout-container">
      <header className="layout-header">
        <SignOutButton />
      </header>
      <main className="layout-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;