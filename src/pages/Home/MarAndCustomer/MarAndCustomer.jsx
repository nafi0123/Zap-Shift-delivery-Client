import React from 'react';
import locationImg from '../../../assets/location-merchant.png';
import bgImg from '../../../assets/be-a-merchant-bg.png';

const MarAndCustomer = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-14">

            <div 
                className="
                    relative rounded-3xl overflow-hidden shadow-lg 
                    bg-cover bg-center
                "
                style={{ backgroundImage: `url(${bgImg})` }}
            >

                {/* overlay */}
                <div className="absolute inset-0 bg-[#03373D]/90"></div>

                {/* CONTENT */}
                <div className="relative p-10 md:p-14 grid md:grid-cols-2 gap-10 items-center">

                    {/* LEFT TEXT */}
                    <div className="text-white">
                        <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                            Merchant and Customer Satisfaction <br /> is Our First Priority
                        </h2>

                        <p className="text-gray-300 mt-4 leading-relaxed">
                            We offer the lowest delivery charge with the highest value along with
                            100% safety of your product. Our courier delivers your parcels to every
                            corner of Bangladesh right on time.
                        </p>

                        {/* BUTTONS */}
                        <div className="mt-8 flex flex-wrap gap-4">
                            
                            {/* Primary button */}
                            <button
                                className="
                                        bg-[#CAEB66] text-black font-semibold 
                                        px-6 py-2 rounded-full 
                                        hover:bg-[#bde156] transition
                                    "
                            >
                                Become a Merchant
                            </button>

                            {/* Outline button */}
                            <button
                                className="
                                        border border-[#CAEB66] text-[#CAEB66] 
                                        font-semibold px-6 py-2 rounded-full 
                                        hover:bg-[#CAEB66] hover:text-black 
                                        transition
                                    "
                            >
                                Earn with ZapShift Courier
                            </button>

                        </div>
                    </div>

                    {/* RIGHT IMAGE */}
                    <div className="flex justify-center md:justify-end">
                        <img
                            src={locationImg}
                            alt="Location Graphic"
                            className="w-[240px] md:w-[360px]"
                        />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MarAndCustomer;
