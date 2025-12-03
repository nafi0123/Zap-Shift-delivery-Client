import React, { useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const position = [23.685, 90.3563];
  const serviceCenters = useLoaderData();
  const mapRef = useRef(null);
  const [error, setError] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value.trim();
    setError("");

    if (!location) {
      setError("Please enter a district name.");
      return;
    }

    const district = serviceCenters.find((c) =>
      c.district.toLowerCase().includes(location.toLowerCase())
    );

    if (district) {
      const coord = [district.latitude, district.longitude];
      mapRef.current.flyTo(coord, 12, { duration: 1.5 });
    } else {
      setError("District not found!");
    }
  };

  return (
    <div className="py-16 px-6 lg:px-20 bg-gray-100 min-h-screen">

      {/* Card Container */}
      <div className="bg-white shadow-xl rounded-2xl p-10 border border-gray-200">

        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-6">
          We are available in <span className="text-primary">64 districts</span>
        </h2>

        {/* Sub-text */}
        <p className="text-gray-600 mb-10 max-w-2xl">
          Explore our full coverage across Bangladesh. Search a district to quickly find nearby service points.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-6 max-w-md">
          <label className="input input-bordered flex items-center gap-3 shadow-md rounded-xl bg-white">
            <svg
              className="h-[1.2em] opacity-60"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              className="grow"
              name="location"
              placeholder="Search district..."
            />
          </label>
          {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
        </form>

        {/* Map Section */}
        <div className="w-full h-[700px] rounded-2xl overflow-hidden shadow-xl border border-gray-200">
          <MapContainer
            className="w-full h-full"
            center={position}
            zoom={8}
            scrollWheelZoom={true}
            ref={mapRef}
          >
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Markers */}
            {serviceCenters.map((center, index) => (
              <Marker key={index} position={[center.latitude, center.longitude]}>
                <Popup className="text-sm">
                  <strong className="text-secondary text-lg">
                    {center.district}
                  </strong>
                  <br />
                  <span className="text-gray-500">Coverage:</span> <br />
                  <span className="font-medium text-gray-600">
                    {center.covered_area.join(", ")}
                  </span>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Coverage;
