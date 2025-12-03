import React from "react";
import { useParams } from "react-router";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";

const ParcelTrack = () => {
  const { trackingId } = useParams();
  const axiosInstance = useAxios();

  const { data: trackings = [], isLoading } = useQuery({
    queryKey: ["tracking", trackingId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/trackings/${trackingId}/logs`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  if (!isLoading && trackings.length === 0) {
    return (
      <div className="p-8 text-center bg-white shadow-lg rounded-xl">
        <h1 className="text-2xl font-bold mb-4 text-red-500">
          ❌ No Tracking Logs Found
        </h1>
        <p className="text-gray-600 text-lg">
          No tracking information is available for this parcel yet.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-12 text-center">
        Parcel Tracking: <span className="text-primary">{trackingId}</span>
      </h2>

      <div className="relative max-w-3xl mx-auto">
        {/* Vertical line */}
        <div className="absolute left-5 top-0 w-1 bg-gray-300 h-full"></div>

        <div className="flex flex-col space-y-10">
          {trackings.map((log) => (
            <div key={log._id} className="flex items-start relative">
              {/* Circle */}
              <div className="flex flex-col items-center mr-6 z-10">
                <div className="w-5 h-5 rounded-full bg-primary shadow-lg"></div>
              </div>

              {/* Card */}
              <div className="bg-white shadow-md rounded-xl p-5 border border-gray-200 hover:shadow-xl transition duration-300 flex-1">
                <p className="text-sm text-gray-400 mb-2">
                  {new Date(log.createdAt).toLocaleString()}
                </p>
                <p className="text-gray-900 font-semibold text-lg md:text-xl">
                  {log.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParcelTrack;
