import React, { useState } from "react";

const About = () => {
  const tabs = ["Story", "Mission", "Success", "Team & Others"];

  const content = {
    Story: `We started with a simple promise — to make parcel delivery fast, reliable,
and stress-free. Over the years, our commitment to real-time tracking,
efficient logistics, and customer-first service has made us a trusted
partner for thousands. Whether it’s a personal gift or a time-sensitive
business delivery, we ensure it reaches its destination — on time, every time.`,

    Mission: `Our mission is simple — deliver happiness on time. We strive to provide
a seamless delivery experience with advanced tracking, fast logistics,
and professional support. Customer trust is our biggest asset.`,

    Success: `From a small local service to a nationwide trusted brand — our journey is
built on consistency, customer love, and successful deliveries. With
thousands of daily parcels delivered, our success reflects our dedication.`,

    "Team & Others": `Behind every successful delivery is a team of committed professionals.
From dispatch riders to support staff — our team works day and night to
ensure your packages reach safely and on time.`,
  };

  const [active, setActive] = useState("Story");

  return (
    <div className="py-16 px-6 lg:px-20 bg-gray-100 min-h-screen">

      {/* Card Container */}
      <div className="bg-white shadow-xl rounded-2xl p-10 border border-gray-200 max-w-5xl mx-auto">

        {/* Title Section */}
        <div className="mb-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-2">About Us</h2>
          <p className="text-gray-600 max-w-xl mx-auto mt-2">
            Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
            From personal packages to business shipments — we deliver on time, every time.
          </p>
        </div>

        {/* Tabs */}
        <div className="border rounded-xl p-6 shadow-sm bg-gray-50">
          <div className="flex flex-wrap gap-6 text-lg font-medium mb-6 justify-center">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`pb-1 transition-colors duration-200 ${
                  active === tab
                    ? "text-primary border-b-2 border-primary"
                    : "text-gray-700 hover:text-primary"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Content */}
          <p className="text-gray-700 leading-relaxed whitespace-pre-line text-center md:text-left">
            {content[active]}
          </p>
        </div>

      </div>
    </div>
  );
};

export default About;
