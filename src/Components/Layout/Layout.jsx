import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";

const Layout = () => {
  const navigate =useNavigate()
  useEffect(()=>{
    const role =localStorage.getItem("role")
    if (!role){
      navigate("/login")
    }
  },[])
  return (
    <div className="flex h-screen bg-gray-900 flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none bg-slate-950 md:w-64">
        <Sidebar />
      </div>
      <div className="flex-grow p-6 bg-white md:overflow-y-auto md:p-12"><Outlet /></div>
    </div>
  );
};

export default Layout;
