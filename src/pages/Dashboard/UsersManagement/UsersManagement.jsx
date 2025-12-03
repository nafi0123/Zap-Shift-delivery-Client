import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FiShieldOff } from "react-icons/fi";
import { FaUserShield } from "react-icons/fa";
import Loading from "../../Loading/Loading";

const UsersManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");

  const {
    refetch,
    data: users = [],
    isLoading,
  } = useQuery({
    queryKey: ["users", searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchText=${searchText}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: `Are you sure you want to make ${user.displayName} an Admin?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make Admin",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/${user._id}/role`, { role: "admin" })
          .then((res) => {
            if (res.data.modifiedCount) {
              refetch();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${user.displayName} marked as an Admin`,
                showConfirmButton: false,
                timer: 2000,
              });
            }
          });
      }
    });
  };

  const handleRemoveAdmin = (user) => {
    Swal.fire({
      title: `Are you sure you want to remove Admin role from ${user.displayName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove Admin",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/${user._id}/role`, { role: "user" })
          .then((res) => {
            if (res.data.modifiedCount) {
              refetch();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${user.displayName} removed from Admin`,
                showConfirmButton: false,
                timer: 2000,
              });
            }
          });
      }
    });
  };

  return (
    <div className="p-6">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
        Users Management
      </h1>

      {/* Search */}
      <div className="mb-6">
        <input
          type="search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search users by name or email"
          className="w-full md:w-1/3 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white text-left shadow-md rounded-xl border border-gray-200">
          <thead className="bg-gray-100">
            <tr className="text-gray-600 uppercase text-sm font-semibold">
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Admin Action</th>
            </tr>
          </thead>

          <tbody className="text-gray-700 text-sm font-light">
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">
                  ❌ No Users Found
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr
                  key={user._id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4 font-medium">{index + 1}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={user.photoURL} alt={user.displayName} />
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold">{user.displayName}</div>
                        <div className="text-sm text-gray-400">
                          {user.country || "Unknown"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4 font-medium capitalize">
                    {user.role}
                  </td>
                  <td className="py-3 px-4 ">
                    {user.role === "admin" ? (
                      <button
                        onClick={() => handleRemoveAdmin(user)}
                        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition"
                      >
                        <FiShieldOff size={18} />
                        Remove Admin
                      </button>
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="flex items-center gap-2 btn btn-primary hover:bg-primary/20  text-black px-4 py-2 rounded-lg font-semibold transition"
                      >
                        <FaUserShield size={18} />
                        Make Admin
                      </button>
                    )}
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

export default UsersManagement;
