import React from "react";
import { Link, useNavigate } from "react-router-dom";
import DignityLimousineLogo from "../../Logo/DignityLimousineLogo";
import NavLinks from "./SidbarItmes/NavLinks";
import { PowerIcon } from "@heroicons/react/24/outline";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-red-700 p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-96 " onClick={()=>{
          navigate("/home")
        }}>
          <DignityLimousineLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-950 md:block"></div>
        <button
          onClick={() => {
            navigate("/login");
          }}
          className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-red-800 text-white p-3 text-sm font-medium hover:bg-red-100 hover:text-red-600 md:flex-none md:justify-start md:p-2 md:px-3"
        >
          <PowerIcon className="w-6" />
          <div className="hidden md:block">
            {/* <Link to="/login"> */}
              <span>Sign Out</span>
            {/* </Link> */}
          </div>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
