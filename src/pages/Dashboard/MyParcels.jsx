import { useQuery } from "@tanstack/react-query";
import React from "react";

import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../Loading/Loading";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["my-parcels", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  const handlePayment = async (parcel) => {
    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      senderEmail: parcel.senderEmail,
      parcelName: parcel.parcelName,
      trackingId: parcel.trackingId,
    };
    const res = await axiosSecure.post(
      "/payment-checkout-session",
      paymentInfo
    );
    window.location.assign(res.data.url);
  };

  if (isLoading) {
    return (
      <Loading></Loading>
    );
  }

  if (!isLoading && parcels.length === 0) {
    return (
      <div className="p-8 text-center bg-white shadow-lg rounded-xl">
        <h1 className="text-2xl font-bold mb-4 text-red-500">❌ No Parcels Found</h1>
        <p className="text-gray-600 text-lg">
          You haven't sent or received any parcels yet.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-800 border-b pb-2">
        My Parcels ({parcels.length})
      </h1>

      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr className="text-gray-600 uppercase text-sm font-semibold">
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Parcel Name</th>
              <th className="py-3 px-4">Cost</th>
              <th className="py-3 px-4">Payment</th>
              <th className="py-3 px-4">Tracking ID</th>
              <th className="py-3 px-4">Delivery Status</th>
            </tr>
          </thead>

          <tbody className="text-gray-700 text-sm font-light">
            {parcels.map((parcel, index) => (
              <tr
                key={parcel._id}
                className="border-b border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="py-3 px-4 whitespace-nowrap font-medium">{index + 1}</td>
                <td className="py-3 px-4 font-medium">{parcel.parcelName}</td>
                <td className="py-3 px-4 font-bold text-green-600">${parcel.cost.toFixed(2)}</td>
                <td className="py-3 px-4">
                  {parcel.paymentStatus === "paid" ? (
                    <span className="text-green-500 font-semibold">Paid</span>
                  ) : (
                    <button
                      onClick={() => handlePayment(parcel)}
                      className="btn btn-sm bg-primary text-black hover:bg-primary/90"
                    >
                      Pay
                    </button>
                  )}
                </td>
                <td className="py-3 px-4 font-mono text-blue-600">
                  <Link to={`/parcel-track/${parcel.trackingId}`}>
                    {parcel.trackingId}
                  </Link>
                </td>
                <td className="py-3 px-4">{parcel.deliveryStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
