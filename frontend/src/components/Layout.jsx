import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {

  return (
    <div >
      <header className="px-3  mt-4">
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  );
};

export default Layout;
