import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../Loading/Loading";

const AssignRiders = () => {
  const [selectedParcel, setSelectedParcel] = useState(null);
  const axiosSecure = useAxiosSecure();
  const riderModalRef = useRef();

  const { data: parcels = [], refetch: parcelsRefetch, isLoading: parcelsLoading } = useQuery({
    queryKey: ["parcels", "pending-pickup"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels?deliveryStatus=pending-pickup");
      return res.data;
    },
  });

  const { data: riders = [] } = useQuery({
    queryKey: ["riders", selectedParcel?.senderDistrict, "available"],
    enabled: !!selectedParcel,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders?status=approved&district=${selectedParcel?.senderDistrict}&workStatus=available`
      );
      return res.data;
    },
  });

  if (parcelsLoading) return <Loading />;

  const openAssignRiderModal = (parcel) => {
    setSelectedParcel(parcel);
    riderModalRef.current.showModal();
  };

  const handleAssignRider = (rider) => {
    const riderAssignInfo = {
      riderId: rider._id,
      riderEmail: rider.email,
      riderName: rider.name,
      parcelId: selectedParcel._id,
      trackingId: selectedParcel.trackingId,
    };
    axiosSecure.patch(`/parcels/${selectedParcel._id}`, riderAssignInfo).then((res) => {
      if (res.data.modifiedCount) {
        riderModalRef.current.close();
        parcelsRefetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Rider has been assigned.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 border-b pb-2">
        Assign Riders ({parcels.length})
      </h2>

      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr className="text-gray-600 uppercase text-sm font-semibold text-center">
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Parcel Name</th>
              <th className="py-3 px-4">Cost</th>
              <th className="py-3 px-4">Created At</th>
              <th className="py-3 px-4">Pickup District</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>

          <tbody className="text-gray-700 text-sm font-light">
            {parcels.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-400">
                  ❌ No Pending Parcels
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
                  <td className="py-3 px-4 font-bold text-green-600">${parcel.cost.toFixed(2)}</td>
                  <td className="py-3 px-4">{new Date(parcel.createdAt).toLocaleString()}</td>
                  <td className="py-3 px-4">{parcel.senderDistrict}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => openAssignRiderModal(parcel)}
                      className="btn btn-primary hover:bg-primary/20 text-black px-4 py-2 rounded-lg font-semibold transition"
                    >
                      Find Riders
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <dialog ref={riderModalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box w-full max-w-3xl">
          <h3 className="font-bold text-xl mb-4">
            Available Riders for {selectedParcel?.parcelName} ({riders.length})
          </h3>

          <div className="overflow-x-auto">
            <table className="table-auto w-full text-left border-collapse">
              <thead className="bg-gray-100">
                <tr className="text-gray-600 uppercase text-sm font-semibold text-center">
                  <th className="py-2 px-4">#</th>
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Email</th>
                  <th className="py-2 px-4">Assign</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm">
                {riders.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-6 text-gray-400">
                      ❌ No Riders Available
                    </td>
                  </tr>
                ) : (
                  riders.map((rider, i) => (
                    <tr
                      key={rider._id}
                      className="border-b border-gray-200 hover:bg-gray-50 transition text-center"
                    >
                      <td className="py-2 px-4">{i + 1}</td>
                      <td className="py-2 px-4">{rider.name}</td>
                      <td className="py-2 px-4">{rider.email}</td>
                      <td className="py-2 px-4">
                        <button
                          onClick={() => handleAssignRider(rider)}
                          className="btn btn-primary hover:bg-primary/20 text-black px-3 py-1 rounded-lg font-semibold transition"
                        >
                          Assign
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-outline btn-error">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignRiders;
