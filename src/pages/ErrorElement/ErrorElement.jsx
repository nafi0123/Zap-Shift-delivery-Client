import React from "react";
import { Link } from "react-router";
import NavBar from "../Shared/NavBar/NavBar";
import Footer from "../Shared/Footer/Footer";

const ErrorElement = () => {
  return (
<div>
        <NavBar></NavBar>
    <div className="flex justify-center items-center min-h-screen bg-gray-200 px-4">
      <div className="bg-white rounded-3xl shadow-lg p-10 text-center max-w-xl w-full">

        {/* Cartoon Character */}
        <div className="relative w-32 h-40 mx-auto mb-6">
          
          {/* Body */}
          <div className="w-full h-full bg-pink-400 rounded-2xl shadow-md relative">
            <div className="absolute w-12 h-8 bg-white rounded-lg top-10 left-1/2 -translate-x-1/2"></div>
            <div className="absolute top-20 left-1/2 -translate-x-1/2 text-3xl">😮</div>
          </div>

          {/* Helmet */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-20 h-10 bg-yellow-400 border-4 border-yellow-600 rounded-lg"></div>

          {/* Wrench */}
          <div className="absolute right-0 top-12 text-4xl">🔧</div>

        </div>

        <h1 className="text-4xl font-bold text-gray-800 mb-5">Error 404</h1>

        <Link
          to="/"
          className="bg-lime-400 hover:bg-lime-500 transition px-6 py-2 rounded-md font-medium"
        >
          Go Home
        </Link>
      </div>
    </div>
    <Footer></Footer>
</div>
  );
};

export default ErrorElement;
