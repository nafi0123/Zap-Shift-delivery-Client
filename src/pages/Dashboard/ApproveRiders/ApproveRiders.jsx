import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaUserCheck } from "react-icons/fa";
import { IoPersonRemoveSharp } from "react-icons/io5";
import Loading from "../../Loading/Loading";

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();

  const { refetch, data: riders = [], isLoading } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  const updateRiderStatus = (rider, status) => {
    Swal.fire({
      title: `Are you sure you want to ${status} ${rider.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: status === "approved" ? "#16a34a" : "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: `Yes, ${status}`,
    }).then((result) => {
      if (result.isConfirmed) {
        const updateInfo = { status: status, email: rider.email };
        axiosSecure.patch(`/riders/${rider._id}`, updateInfo).then((res) => {
          if (res.data.modifiedCount) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `Rider status set to ${status}.`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 border-b pb-2">
        Riders Pending Approval ({riders.length})
      </h1>

      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr className="text-gray-600 uppercase text-sm font-semibold">
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">District</th>
              <th className="py-3 px-4">Application Status</th>
              <th className="py-3 px-4">Work Status</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="text-gray-700 text-sm font-light">
            {riders.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-400">
                  ❌ No Riders Pending Approval
                </td>
              </tr>
            ) : (
              riders.map((rider, index) => (
                <tr
                  key={rider._id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4 font-medium">{index + 1}</td>
                  <td className="py-3 px-4 font-medium">{rider.name}</td>
                  <td className="py-3 px-4">{rider.email}</td>
                  <td className="py-3 px-4">{rider.district}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`font-semibold ${
                        rider.status === "approved"
                          ? "text-green-600"
                          : rider.status === "rejected"
                          ? "text-red-500"
                          : "text-gray-500"
                      }`}
                    >
                      {rider.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 capitalize">{rider.workStatus}</td>
                  <td className="py-3 px-4 flex items-center justify-center gap-2">
                    {/* Approve button disabled if status is approved */}
                    <button
                      onClick={() => updateRiderStatus(rider, "approved")}
                      className="flex items-center gap-2 btn btn-primary hover:bg-primary/20 text-black px-4 py-2 rounded-lg font-semibold transition disabled:opacity-50"
                      disabled={rider.status === "approved"}
                    >
                      <FaUserCheck />
                      Approve
                    </button>

                    {/* Reject button disabled if status is pending */}
                    <button
                      onClick={() => updateRiderStatus(rider, "rejected")}
                      className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition disabled:opacity-50"
                      disabled={rider.status === "rejected"}
                    >
                      <IoPersonRemoveSharp />
                      Reject
                    </button>
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

export default ApproveRiders;
