import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../Loading/Loading";

const CompletedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["parcels", user.email, "parcel_delivered"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}&deliveryStatus=parcel_delivered`
      );
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  const calculatePayout = (parcel) => {
    return parcel.senderDistrict === parcel.receiverDistrict
      ? parcel.cost * 0.8
      : parcel.cost * 0.6;
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 border-b pb-2">
        Completed Deliveries ({parcels.length})
      </h2>

      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border-collapse rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr className="text-gray-600 uppercase text-sm font-semibold text-center">
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Parcel Name</th>
              <th className="py-3 px-4">Created At</th>
              <th className="py-3 px-4">Pickup District</th>
              <th className="py-3 px-4">Cost</th>
              <th className="py-3 px-4">Payout</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {parcels.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-400">
                  ❌ No Completed Deliveries
                </td>
              </tr>
            ) : (
              parcels.map((parcel, index) => (
                <tr
                  key={parcel._id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition text-center"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4 font-medium">{parcel.parcelName}</td>
                  <td className="py-3 px-4">
                    {new Date(parcel.createdAt).toLocaleString()}
                  </td>
                  <td className="py-3 px-4">{parcel.senderDistrict}</td>
                  <td className="py-3 px-4 font-semibold text-green-600">
                    ${parcel.cost.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 font-semibold text-blue-600">
                    ${calculatePayout(parcel).toFixed(2)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompletedDeliveries;
