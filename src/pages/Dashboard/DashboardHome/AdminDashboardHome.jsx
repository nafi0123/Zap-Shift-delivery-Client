import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Cell, Pie, PieChart, Tooltip } from "recharts";

const AdminDashboardHome = () => {
  const STATUS_LABELS = {
    driver_assigned: "Driver Assigned",
    parcel_delivered: "Delivered",
    "pending-pickup": "Pending Pickup",
  };

  const VALUE_COLORS = {
    driver_assigned: "text-blue-600",
    parcel_delivered: "text-green-600",
    "pending-pickup": "text-orange-500",
  };

  const PIE_COLORS = {
    driver_assigned: "#03373D",
    parcel_delivered: "#4CAF50",
    "pending-pickup": "#F59E0B",
  };

  const axiosSecure = useAxiosSecure();
  const { data: deliveryStats = [] } = useQuery({
    queryKey: ["delivery-status-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels/delivery-status/stats");
      return res.data;
    },
  });

  const getPieChartData = (data) => {
    return data.map((item) => ({
      name: STATUS_LABELS[item._id] || item._id,
      key: item._id,
      value: item.count,
    }));
  };

  const renderCustomLabel = ({ cx, cy, midAngle, outerRadius, name }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 20;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={12}
      >
        {name}
      </text>
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-8">
        Admin Dashboard
      </h2>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {deliveryStats.map((stat) => (
          <div
            key={stat._id}
            className="p-6 rounded-2xl shadow-md border border-gray-200 bg-white hover:shadow-lg transition"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-primary/20 text-secondary shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="h-7 w-7 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 0 0118 0z"
                  />
                </svg>
              </div>

              <div className="break-all whitespace-normal max-w-[180px]">
                <p className="text-lg font-semibold text-secondary">
                  {STATUS_LABELS[stat._id] || stat._id}
                </p>

                <p className={`text-3xl font-bold ${VALUE_COLORS[stat._id]}`}>
                  {stat.count}
                </p>

                <p className="text-sm text-gray-500">Updated just now</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pie Chart Section */}
      <div className="w-full flex flex-col items-center">
        <div
          className="
            w-full bg-white shadow-md p-4 rounded-2xl border border-gray-200
            h-[260px]         /* Mobile */
            sm:h-[320px]      /* Tablet */
            md:h-[420px]      /* Desktop */
            max-w-xs          /* Mobile width */
            sm:max-w-md       /* Tablet width */
            md:max-w-xl       /* Desktop width */
            mx-auto
          "
        >
          <PieChart width="100%" height="100%">
            <Pie
              dataKey="value"
              startAngle={180}
              endAngle={0}
              data={getPieChartData(deliveryStats)}
              cx="50%"
              cy="80%"         /* Mobile friendly */
              outerRadius={110} /* Works for all devices */
              label={renderCustomLabel}
            >
              {getPieChartData(deliveryStats).map((entry) => (
                <Cell key={entry.key} fill={PIE_COLORS[entry.key]} />
              ))}
            </Pie>

            <Tooltip formatter={(value, name, props) => [`${value}`, props.payload.name]} />
          </PieChart>
        </div>

        {/* Legend */}
        <div className="flex gap-6 mt-4 flex-wrap justify-center">
          {deliveryStats.map((stat) => (
            <div key={stat._id} className="flex items-center gap-2">
              <span
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: PIE_COLORS[stat._id] }}
              />
              <span>{STATUS_LABELS[stat._id] || stat._id}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
