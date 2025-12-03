import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Loading/Loading";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !!user?.email, 
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      // Assuming 'items' array might be returned if available
      return res.data; 
    },
  });

  const formatPaymentDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    }).format(new Date(dateString));
  };
  
  if (isLoading) {
    return (
      <Loading></Loading>
    );
  }

  if (!isLoading && payments.length === 0) {
    return (
      <div className="p-8 text-center bg-white shadow-lg rounded-xl">
        <h1 className="text-2xl font-bold mb-4 text-red-500">
          ❌ No Payment History Found
        </h1>
        <p className="text-gray-600 text-lg">
          It looks like you haven't completed any payments yet.
        </p>
        <p className="text-sm mt-2 text-gray-500">
          Your payment records will appear here after your first successful transaction.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-800 border-b pb-2">
        Payment History ({payments.length})
      </h1>

      <div className="overflow-x-auto">
        <table className="table w-full text-left">
          {/* Table Head: 'Name' field removed */}
          <thead className="bg-gray-100">
            <tr className="text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6">#</th>
              {/* <th className="py-3 px-6">Name</th> <-- REMOVED */}
              <th className="py-3 px-6">Amount</th>
              <th className="py-3 px-6">Paid Time</th>
              <th className="py-3 px-6">Transaction ID</th>
            </tr>
          </thead>

          {/* Table Body: Data cell for 'Name' removed */}
          <tbody className="text-gray-700 text-sm font-light">
            {payments.map((payment, index) => (
              <tr 
                key={payment._id} 
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-3 px-6 whitespace-nowrap font-medium">{index + 1}</td>
                {/* <td>{payment.name}</td> <-- REMOVED */}
                <td className="py-3 px-6 font-bold text-green-600">
                  ${payment.amount.toFixed(2)}
                </td>
                <td className="py-3 px-6 text-xs">
                  {formatPaymentDate(payment.paidAt)}
                </td>
                <td className="py-3 px-6 font-mono text-xs text-blue-600">
                  {payment.transactionId}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;