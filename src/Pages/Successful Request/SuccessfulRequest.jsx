import React from "react";
import { useNavigate } from "react-router-dom";

const SuccessfulRequest = () => {
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const requestNumber = localStorage.getItem("requestNumber");
  const name = `${firstName} ${lastName}`;
  const navigate = useNavigate();
  return (
    <div className="bg-red-500 min-h-screen flex items-center">
      <div className="w-full">
        <h2 className="text-center text-white font-bold text-2xl uppercase mb-10">
          Congratulations !!!!!!!!!!!!!
        </h2>
        <div className="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2">
          <h1 className="text-red-500 text-xl border-b-2 border-red-500 pb-4 mb-4 ">
            Dear {name}
          </h1>
          <p>
            We have recived your request and we are so glad that you have
            choosen us as your travel companion.
          </p>
          <p>We will contact you soon </p>
          <p className="text-red-500 text-lg  border-t-2  pt-2 mt-2 ">
            Your Request Number : {requestNumber}
          </p>
          <div className="flex justify-end">
            <button
              className=" bg-red-500 text-white font-bold py-2 px-4 rounded-lg"
              onClick={() => {
                navigate("/dashboard/passenger");
              }}
            >
              okay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessfulRequest;
