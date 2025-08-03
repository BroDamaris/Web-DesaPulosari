import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main>
        {/* Konten dari rute anak akan dirender di sini */}
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
