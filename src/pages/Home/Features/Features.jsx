import React from 'react';
import liveDelivery from '../../../assets/live-tracking.png';
import safeDelivery from '../../../assets/safe-delivery.png';


const Features = () => {
    return (
        <div className="mt-10 px-4">

            {/* top dashed border */}
            <div className="border-t border-dashed border-gray-400 mb-10"></div>

            <div className="space-y-8">

                {/* CARD 1 */}
                <div className="bg-white p-8 rounded-2xl shadow-sm flex flex-col md:flex-row items-center gap-6 border border-gray-100">
                    <img 
                        src={liveDelivery} 
                        alt="Live Tracking" 
                        className="w-40 md:w-48"
                    />

                    <div className="flex-1 text-center md:text-left">
                        <h3 className="text-xl font-semibold text-gray-900">Live Parcel Tracking</h3>
                        <p className="text-gray-600 mt-2 leading-relaxed">
                            Stay updated in real-time with our live parcel tracking feature. 
                            From pick-up to delivery, monitor your shipment’s journey and 
                            get instant updates for complete peace of mind.
                        </p>
                    </div>
                </div>

                {/* CARD 2 */}
                <div className="bg-white p-8 rounded-2xl shadow-sm flex flex-col md:flex-row items-center gap-6 border border-gray-100">
                    <img 
                        src={safeDelivery} 
                        alt="Safe Delivery" 
                        className="w-40 md:w-48"
                    />

                    <div className="flex-1 text-center md:text-left">
                        <h3 className="text-xl font-semibold text-gray-900">100% Safe Delivery</h3>
                        <p className="text-gray-600 mt-2 leading-relaxed">
                            We ensure your parcels are handled with utmost care and delivered 
                            securely to their destination. Our reliable process guarantees 
                            safe and damage-free delivery every time.
                        </p>
                    </div>
                </div>

                {/* CARD 3 */}
                <div className="bg-white p-8 rounded-2xl shadow-sm flex flex-col md:flex-row items-center gap-6 border border-gray-100">
                    <img 
                        src={safeDelivery} 
                        alt="Call Center Support" 
                        className="w-40 md:w-48"
                    />

                    <div className="flex-1 text-center md:text-left">
                        <h3 className="text-xl font-semibold text-gray-900">24/7 Call Center Support</h3>
                        <p className="text-gray-600 mt-2 leading-relaxed">
                            Our dedicated support team is available around the clock to assist 
                            you with any questions, updates, or delivery concerns—anytime you need us.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Features;
