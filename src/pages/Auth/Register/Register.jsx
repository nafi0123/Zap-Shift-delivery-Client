import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registerUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleRegistration = (data) => {
    const profileImg = data.photo[0];

    registerUser(data.email, data.password)
      .then(() => {
        const formData = new FormData();
        formData.append("image", profileImg);

        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;
        axios
          .post(image_API_URL, formData)
          .then((res) => {
            const photoURL = res.data.data.url;
            const userInfo = {
              email: data.email,
              displayName: data.name,
              photoURL: photoURL,
            };
            axiosSecure.post("/users", userInfo).then((res) => {
              if(res.data.insertedId){
                console.log(res.data.insertedId)
              }
            });
            const userProfile = {
              displayName: data.name,
              photoURL: photoURL,
            };
            updateUserProfile(userProfile)
              .then(() => navigate(location.state || "/"))
              .catch();
          })
          .catch();
      })
      .catch();
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-4xl font-bold mb-2 text-center">
        Welcome to Zap Shift
      </h2>
      <p className="mb-6 text-gray-600 text-center">Please Register</p>

      <form onSubmit={handleSubmit(handleRegistration)} className="space-y-3">
        {/* Name */}
        <div>
          <label className="font-semibold">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input input-bordered w-full mt-1"
            placeholder="Your Name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">Name is required</p>
          )}
        </div>

        {/* Photo */}
        <div>
          <label className="font-semibold">Photo</label>
          <input
            type="file"
            {...register("photo", { required: true })}
            className="file-input w-full mt-1"
          />
          {errors.photo && (
            <p className="text-red-500 text-sm">Photo is required</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="font-semibold">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input input-bordered w-full mt-1"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">Email is required</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="font-semibold">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
              pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
            })}
            className="input input-bordered w-full mt-1"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500 text-sm">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500 text-sm">
              Password must be 6+ characters
            </p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-red-500 text-sm">
              Password must include uppercase, lowercase, number, and special
              character
            </p>
          )}
        </div>

        <div className="text-right -mt-2">
          <a className="text-sm text-blue-500 cursor-pointer">
            Forgot Password?
          </a>
        </div>

        <button className="btn text-black btn-primary w-full mt-2">
          Register
        </button>

        <p className="text-sm text-center">
          Already have an account?
          <Link
            to="/login"
            state={location.state}
            className="text-blue-500 ml-1"
          >
            Login
          </Link>
        </p>
      </form>

      <SocialLogin />
    </div>
  );
};

export default Register;
