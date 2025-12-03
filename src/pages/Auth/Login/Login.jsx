import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import SocialLogin from '../SocialLogin/SocialLogin';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signInUser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = (data) => {
        signInUser(data.email, data.password)
            .then(() => navigate(location?.state || '/'))
            .catch();
    };

    return (
        <div className="w-full">
            <h2 className="text-4xl font-bold mb-2">Welcome Back</h2>
            <p className="mb-6 text-gray-600">Login with ZapShift</p>

            <form onSubmit={handleSubmit(handleLogin)} className="space-y-3">

                <div>
                    <label className="font-semibold">Email</label>
                    <input
                        type="email"
                        {...register('email', { required: true })}
                        className="input input-bordered w-full mt-1"
                        placeholder="Email"
                    />
                    {errors.email && <p className="text-red-500 text-sm">Email is required</p>}
                </div>

                <div>
                    <label className="font-semibold">Password</label>
                    <input
                        type="password"
                        {...register('password', { required: true, minLength: 6 })}
                        className="input input-bordered w-full mt-1"
                        placeholder="Password"
                    />
                    {errors.password?.type === 'minLength' &&
                        <p className="text-red-500 text-sm">Password must be 6+ characters</p>}
                </div>

                <div className="text-right -mt-2">
                    <a className="text-sm text-blue-500 cursor-pointer">Forgot Password?</a>
                </div>

                <button className="btn text-black btn-primary w-full mt-2">
                    Login
                </button>

                <p className="text-sm text-center">
                    Don't have an account? 
                    <Link to="/register" state={location.state} className="text-blue-500 ml-1">Register</Link>
                </p>
            </form>

            <SocialLogin />
        </div>
    );
};

export default Login;
