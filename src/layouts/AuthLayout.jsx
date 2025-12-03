import React from 'react';
import authImage from '../assets/authImage.png';
import Logo from '../components/Logo/Logo';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className="max-w-7xl mx-auto min-h-screen flex flex-col gap-10 py-10">
            
            {/* Logo */}
            <div className="mb-4">
                <Logo />
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 bg-base-100 shadow-xl rounded-xl overflow-hidden">

                {/* Left Form Section */}
                <div className="p-10 flex items-center justify-center bg-white">
                    <div className="w-full max-w-md">
                        <Outlet />
                    </div>
                </div>

                {/* Right Image Section */}
                <div className="bg-[#FAFDF5] flex items-center justify-center p-6">
                    <img src={authImage} alt="Auth" className="w-4/5" />
                </div>

            </div>

        </div>
    );
};

export default AuthLayout;
