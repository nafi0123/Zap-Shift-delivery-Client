import React from "react";
import bookKing from "../../../assets/bookingIcon.png";

const HowitsWork = () => {
  const items = [
    {
      title: "Booking Pick & Drop",
      desc: "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      title: "Cash On Delivery",
      desc: "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      title: "Delivery Hub",
      desc: "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      title: "Booking SME & Corporate",
      desc: "From personal packages to business shipments — we deliver on time, every time.",
    },
  ];

  return (
    <div className="py-16 px-6 lg:px-20">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-secondary">
        How it Works
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all border border-gray-200"
          >
            <img src={bookKing} alt="icon" className="w-14 h-14 mb-4" />

            <h3 className="text-lg font-semibold text-secondary mb-2">
              {item.title}
            </h3>

            <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowitsWork;
