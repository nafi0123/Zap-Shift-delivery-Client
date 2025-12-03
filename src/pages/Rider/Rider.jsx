import React from "react";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";

const Rider = () => {
  const { register, handleSubmit, control, formState: { errors }, reset } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const serviceCenters = useLoaderData();
  const navigate = useNavigate();

  const regions = [...new Set(serviceCenters.map(c => c.region))];
  const riderRegion = useWatch({ control, name: "region" });

  const districtsByRegion = (region) =>
    serviceCenters.filter(c => c.region === region).map(d => d.district);

  const handleRiderApplication = (data) => {
    Swal.fire({
      title: "Submit Application?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, submit",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post("/riders", data).then(res => {
          if (res.data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your application has been submitted.",
              showConfirmButton: false,
              timer: 2000,
            });
            reset();
            navigate("/");
          }
        });
      }
    });
  };

  return (
    <div className="py-16 px-6 lg:px-20">
      <div className="bg-white shadow-xl rounded-2xl p-10 border border-gray-200">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">Be a Rider</h2>
        <p className="text-gray-500 mb-8 max-w-xl">
          Join our fast, reliable delivery service. Fill out your details below.
        </p>

        <form onSubmit={handleSubmit(handleRiderApplication)} className="space-y-8">

          <div className="grid md:grid-cols-2 gap-6">

            {/* Rider Details */}
            <div className="bg-gray-50 p-6 rounded-xl shadow-md border space-y-4">
              <h3 className="text-2xl font-semibold text-secondary mb-4">Rider Details</h3>

              <div>
                <label className="font-semibold">Rider Name</label>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  defaultValue={user?.displayName}
                  className="input input-bordered w-full mt-1"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>

              <div>
                <label className="font-semibold">Email</label>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  defaultValue={user?.email}
                  className="input input-bordered w-full mt-1"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>

              <div>
                <label className="font-semibold">Region</label>
                <select
                  {...register("region", { required: "Region is required" })}
                  className="select select-bordered w-full mt-1"
                >
                  <option value="">Select Region</option>
                  {regions.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
                {errors.region && <p className="text-red-500 text-sm">{errors.region.message}</p>}
              </div>

              <div>
                <label className="font-semibold">District</label>
                <select
                  {...register("district", { required: "District is required" })}
                  className="select select-bordered w-full mt-1"
                >
                  <option value="">Select District</option>
                  {districtsByRegion(riderRegion)?.map(d => <option key={d}>{d}</option>)}
                </select>
                {errors.district && <p className="text-red-500 text-sm">{errors.district.message}</p>}
              </div>

              <div>
                <label className="font-semibold">Address</label>
                <input
                  type="text"
                  {...register("address", { required: "Address is required" })}
                  className="input input-bordered w-full mt-1"
                />
                {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
              </div>
            </div>

            {/* More Details */}
            <div className="bg-gray-50 p-6 rounded-xl shadow-md border space-y-4">
              <h3 className="text-2xl font-semibold text-secondary mb-4">More Details</h3>

              <div>
                <label className="font-semibold">Driving License</label>
                <input
                  type="text"
                  {...register("license", { required: "License is required" })}
                  className="input input-bordered w-full mt-1"
                />
                {errors.license && <p className="text-red-500 text-sm">{errors.license.message}</p>}
              </div>

              <div>
                <label className="font-semibold">NID</label>
                <input
                  type="text"
                  {...register("nid", { required: "NID is required" })}
                  className="input input-bordered w-full mt-1"
                />
                {errors.nid && <p className="text-red-500 text-sm">{errors.nid.message}</p>}
              </div>

              <div>
                <label className="font-semibold">Bike</label>
                <input
                  type="text"
                  {...register("bike", { required: "Bike info is required" })}
                  className="input input-bordered w-full mt-1"
                />
                {errors.bike && <p className="text-red-500 text-sm">{errors.bike.message}</p>}
              </div>
            </div>

          </div>

          <button
            type="submit"
            className="btn btn-primary text-black text-lg shadow-md mt-4"
          >
            Apply as a Rider
          </button>

        </form>
      </div>
    </div>
  );
};

export default Rider;
