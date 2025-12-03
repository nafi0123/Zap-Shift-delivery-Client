import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

export default function RiderDashboardHome() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Load rider delivery stats safely
  const {
    data: deliveryData = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["rider-deliveries", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(
        `/riders/delivery-per-day?email=${encodeURIComponent(user.email)}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Total delivered calculation
  const totalDelivered = Array.isArray(deliveryData)
    ? deliveryData.reduce((sum, d) => sum + (d.deliveredCount || 0), 0)
    : 0;

  // Prepare chartData
  const chartData = deliveryData.map((d) => ({
    date: d._id || "unknown",
    delivered: d.deliveredCount || 0,
  }));

  chartData.sort((a, b) => (a.date > b.date ? 1 : -1));

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">

        {/* Summary Area */}
        <div className="md:col-span-2 bg-white shadow-lg rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">
                Welcome back
                {user?.displayName ? `, ${user.displayName}` : ""}
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Your deliveries overview
              </p>
            </div>

            {/* Simple icon-less summary */}
            <div className="flex items-center gap-4">
              <div className="bg-slate-100 px-4 py-2 rounded-lg text-center">
                <p className="text-xs text-slate-500">Total Delivered</p>
                <p className="text-xl font-bold">{totalDelivered}</p>
              </div>

              <div className="bg-slate-100 px-4 py-2 rounded-lg text-center">
                <p className="text-xs text-slate-500">Days Tracked</p>
                <p className="text-xl font-bold">{chartData.length}</p>
              </div>
            </div>
          </div>

          {/* Chart Section */}
          <div className="mt-6">
            {isLoading ? (
              <div className="h-56 flex items-center justify-center text-slate-500">
                Loading chart...
              </div>
            ) : isError ? (
              <div className="h-56 flex items-center justify-center text-red-500">
                Failed to load data
              </div>
            ) : chartData.length === 0 ? (
              <div className="h-56 flex items-center justify-center text-slate-500">
                No delivery history yet.
              </div>
            ) : (
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="delivered"
                      name="Delivered"
                      barSize={36}
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>

        {/* Recent Deliveries */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-3">Recent Deliveries</h3>

          {isLoading ? (
            <p className="text-slate-500">Loading...</p>
          ) : chartData.length === 0 ? (
            <p className="text-slate-500">No recent deliveries</p>
          ) : (
            <ul className="space-y-3">
              {chartData
                .slice()
                .reverse()
                .slice(0, 6)
                .map((d) => (
                  <li
                    key={d.date}
                    className="flex justify-between bg-slate-100 p-3 rounded-lg"
                  >
                    <div>
                      <p className="text-sm font-medium">{d.date}</p>
                      <p className="text-xs text-slate-600">
                        Delivered: {d.delivered}
                      </p>
                    </div>
                    <p className="text-sm font-semibold">+{d.delivered}</p>
                  </li>
                ))}
            </ul>
          )}


        </div>
      </div>

      {/* Mobile quick summary */}
      <div className="mt-6 md:hidden grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg text-center">
          <p className="text-sm text-slate-500">Total</p>
          <p className="text-2xl font-bold">{totalDelivered}</p>
        </div>
        <div className="bg-white p-4 rounded-lg text-center">
          <p className="text-sm text-slate-500">Days</p>
          <p className="text-2xl font-bold">{chartData.length}</p>
        </div>
      </div>
    </div>
  );
}
