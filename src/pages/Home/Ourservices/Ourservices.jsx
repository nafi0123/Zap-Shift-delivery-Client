import React from "react";
import serviceIcon from "../../../assets/service.png";

const Ourservices = () => {
  const services = [
    {
      title: "Express & Standard Delivery",
      desc: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    },
    {
      title: "Nationwide Delivery",
      desc: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
      highlight: true,
    },
    {
      title: "Fulfillment Solution",
      desc: "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    },
    {
      title: "Cash on Home Delivery",
      desc: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    },
    {
      title: "Corporate Service / Contract In Logistics",
      desc: "Customized corporate services which includes warehouse and inventory management support.",
    },
    {
      title: "Parcel Return",
      desc: "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    },
  ];

  return (
    <div className="py-20 px-6 lg:px-20 bg-secondary rounded-3xl">
      {/* Heading */}
      <div className="text-center mb-14 text-white">
        <h2 className="text-3xl md:text-4xl font-bold">Our Services</h2>
        <p className="mt-3 text-gray-200 max-w-2xl mx-auto">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((item, idx) => (
          <div
            key={idx}
            className={`
              p-8 rounded-3xl shadow 
              border border-gray-300 
              transition-all duration-300
              bg-white
              hover:scale-[1.03] hover:shadow-lg
              hover:bg-primary/70
            `}
          >
            <img
              src={serviceIcon}
              alt="icon"
              className="w-16 h-16 mx-auto mb-4"
            />

            <h3
              className={`text-xl font-semibold text-center mb-3 
                ${item.highlight ? "text-secondary" : "text-secondary"}
              `}
            >
              {item.title}
            </h3>

            <p className="text-center text-gray-700 text-sm leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ourservices;
