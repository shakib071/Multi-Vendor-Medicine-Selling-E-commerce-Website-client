import React from "react";
import { Link } from "react-router";
import { ShieldAlert } from "lucide-react";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-200 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-10 max-w-md w-full text-center animate-fadeIn">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <ShieldAlert className="w-14 h-14 sm:w-16 sm:h-16 text-red-500" />
        </div>

       
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-800 mb-2">
          403
        </h1>

   
        <h2 className="text-lg sm:text-2xl lg:text-3xl font-semibold text-gray-700 mb-4">
          Access Forbidden
        </h2>

        <p className="text-sm sm:text-base text-gray-500 mb-6">
          Sorry, you don’t have permission to access this page.  
          Please check your account privileges or return to the homepage.
        </p>

   
        <Link
          to="/"
          className="px-4 sm:px-6 py-2 sm:py-3 bg-red-500 text-white rounded-xl shadow hover:bg-red-600 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
