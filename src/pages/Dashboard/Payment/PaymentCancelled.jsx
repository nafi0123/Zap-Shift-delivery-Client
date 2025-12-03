import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

const PaymentCancelled = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ background: "linear-gradient(180deg, #fdf2f2 0%, #ffffff 100%)" }}
    >
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-md w-full text-center">
        
        {/* Cancelled Icon */}
        <AiOutlineCloseCircle className="text-7xl text-red-500 mx-auto mb-6 animate-pulse" />

        {/* Heading */}
        <h2 className="text-3xl font-bold text-red-600 mb-4">
          Payment Cancelled
        </h2>

        {/* Subtext */}
        <p className="text-gray-600 mb-8">
          Your payment could not be processed. Please try again or contact support.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4">
          <a
            href="/send-parcel"
            className="btn btn-primary text-black w-full py-3 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            Try Again
          </a>
          <a
            href="/"
            className="btn btn-ghost w-full py-3 rounded-lg border border-gray-300 hover:bg-gray-100 transition-all"
          >
            Go Back Home
          </a>
          
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelled;
