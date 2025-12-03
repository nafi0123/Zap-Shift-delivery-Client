import { useQuery } from "@tanstack/react-query";
import React from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../Loading/Loading";

const AssignedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], refetch, isLoading } = useQuery({
    queryKey: ["parcels", user.email, "pending_rider_status"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}&deliveryStatus=driver_assigned`
      );
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  const handleUpdateStatus = (parcel, status) => {
    const statusInfo = {
      deliveryStatus: status,
      riderId: parcel.riderId,
      trackingId: parcel.trackingId,
    };
    axiosSecure.patch(`/parcels/${parcel._id}/status`, statusInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Parcel status updated to "${status.split("_").join(" ")}"`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleReject = (parcel) => {
    Swal.fire({
      title: "Reject Parcel?",
      text: "Are you sure you want to reject this parcel?",
      input: "text",
      inputLabel: "Reason (optional)",
      showCancelButton: true,
      confirmButtonText: "Reject",
      cancelButtonText: "Cancel",
      inputPlaceholder: "Enter reason...",
    }).then((result) => {
      if (result.isConfirmed) {
        const statusInfo = {
          deliveryStatus: "rejected",
          reason: result.value || "No reason provided",
          riderId: parcel.riderId,
          trackingId: parcel.trackingId,
        };
        axiosSecure.patch(`/parcels/${parcel._id}/status`, statusInfo).then((res) => {
          if (res.data.modifiedCount) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Parcel Rejected",
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
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 border-b pb-2">
        Parcels Pending Pickup ({parcels.length})
      </h2>

      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border-collapse rounded-lg">
          <thead className="bg-gray-100">
            <tr className="text-gray-600 uppercase text-sm font-semibold text-center">
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Parcel Name</th>
              <th className="py-3 px-4">Confirm</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {parcels.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-400">
                  ❌ No Pending Parcels
                </td>
              </tr>
            ) : (
              parcels.map((parcel, index) => {
                const isAcceptable = parcel.deliveryStatus === "driver_assigned";
                const isPickable = parcel.deliveryStatus === "rider_arriving";
                const isDeliverable = parcel.deliveryStatus === "parcel_picked_up";

                return (
                  <tr
                    key={parcel._id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition text-center"
                  >
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4 font-medium">{parcel.parcelName}</td>

                    {/* Confirm / Accept / Reject */}
                    <td className="py-3 px-4">
                      {isAcceptable ? (
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() =>
                              handleUpdateStatus(parcel, "rider_arriving")
                            }
                            className="btn btn-primary text-black text-lg shadow-md mt-4"
                          >
                            Accept
                          </button>

                          <button
                            onClick={() => handleReject(parcel)}
                            className="btn btn-primary text-black text-lg shadow-md mt-4"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-500 font-medium">
                          {parcel.deliveryStatus.split("_").join(" ")}
                        </span>
                      )}
                    </td>

                    {/* Step Actions */}
                    <td className="py-3 px-4 flex gap-2 justify-center">
                      <button
                        onClick={() =>
                          handleUpdateStatus(parcel, "parcel_picked_up")
                        }
                        className="btn btn-primary text-black text-lg shadow-md mt-4"
                        disabled={!isPickable}
                      >
                        Mark as Picked Up
                      </button>

                      <button
                        onClick={() =>
                          handleUpdateStatus(parcel, "parcel_delivered")
                        }
                        className="btn btn-primary text-black text-lg shadow-md mt-4"
                        disabled={!isDeliverable}
                      >
                        Mark as Delivered
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedDeliveries;
