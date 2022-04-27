import React from "react";
import Header from "../../components/Header";
import { Outlet } from "react-router-dom";

export default function Home() {
  
  return (
    <div>
      <Header />
      <div className=" justify-content-center">
        <Outlet />
      </div>
    </div>
  );
}
