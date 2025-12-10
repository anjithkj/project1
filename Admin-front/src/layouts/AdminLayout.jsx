import React from "react";
import AdminNavbar from "../components/AdminNavbar";

export default function AdminLayout({ children }) {
  return (
    <div>
      <AdminNavbar />
      <div className="mt-4">{children}</div>
    </div>
  );
}
