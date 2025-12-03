import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { BsCheckCircle } from "react-icons/bs";
import PaymentCancelled from "./PaymentCancelled";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();
  const [paymentInfo, setPaymentInfo] = useState({});
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data.trackingId,
          });
        })
        .catch((err) =>{});
    }
  }, [sessionId, axiosSecure]);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ background: "linear-gradient(180deg, #f0f4f8 0%, #ffffff 100%)" }}
    >
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-md w-full text-center">
        {/* Success Icon */}
        <BsCheckCircle className="text-7xl text-primary mx-auto mb-6 animate-bounce" />

        {/* Heading */}
        <h2 className="text-3xl font-bold text-secondary mb-4">
          Payment Successful
        </h2>

        {/* Subtext */}
        <p className="text-gray-600 mb-8">
          Your payment has been processed successfully. Please keep your details safe.
        </p>

        {/* Receipt Card */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm text-left">
          
          {/* Transaction ID */}
          <div className="mb-4">
            <span className="block text-gray-500 font-medium">Transaction ID</span>
            <span className="block text-gray-900 font-semibold break-all text-lg">
              {paymentInfo.transactionId || "-"}
            </span>
          </div>

          <hr className="my-4 border-gray-300" />

          {/* Tracking ID */}
          <div>
            <span className="block text-gray-500 font-medium">Tracking ID</span>
            <span className="block text-gray-900 font-semibold break-all text-lg">
              {paymentInfo.trackingId || "-"}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <a
          href="/dashboard/my-parcels"
          className="btn btn-primary text-black w-full py-3 rounded-lg shadow-md hover:shadow-lg transition-all mt-8"
        >
          View My Parcels
        </a>
      </div>
    </div>
  );
};

export default PaymentSuccess;
