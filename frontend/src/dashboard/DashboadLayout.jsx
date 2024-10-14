import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Menu, X, Home, Package, List, LogOut } from "lucide-react";

const navItems = [
  { icon: Home, label: "Dashboard", path: "/dashboard" },
  {
    icon: Package,
    label: "Create Auction Item",
    path: "/dashboard/create-auction-items",
  },
  { icon: List, label: "My Items", path: "/dashboard/my-auction-items" },
];

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-neutral-200">
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-30 w-64 bg-neutral-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between h-16 px-6 text-neutral-800 border-b">
          <Link to={'/'}>
            <span className="text-2xl font-semibold">Bidify</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 rounded-md lg:hidden hover:bg-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        <nav className="mt-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 w-full">
          <Link
            to="/logout"
            className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 bg-neutral-200 border-b">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1 rounded-md lg:hidden hover:bg-gray-100"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
          <div className="w-8 h-8 bg-neutral-200 rounded-full"></div>
        </header>

        <main className="flex-1 overflow-x-hidden rounded-md overflow-y-auto bg-neutral-100">
          <div className="container mx-auto px-6 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
