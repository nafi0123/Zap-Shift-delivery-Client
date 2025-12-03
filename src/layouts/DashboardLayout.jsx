import React from "react";
import { NavLink, Outlet, useLocation } from "react-router";
import Logo from "../components/Logo/Logo";
import { CiDeliveryTruck, CiWallet } from "react-icons/ci";
import { FaUsers, FaMotorcycle, FaCheckCircle } from "react-icons/fa";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {
  const { role } = useRole();
  const location = useLocation();

  const activeClass = "bg-primary text-secondary font-semibold rounded-lg shadow-sm";
  const baseClass =
    "w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-primary/20 transition-all";

  // Custom function for NavLink class
  const navClass = (to) => {
    // For "user" role, default /dashboard/payment-history active if path is "/dashboard"
    if (role === "user" && location.pathname === "/dashboard") {
      return to === "/dashboard/payment-history"
        ? `${baseClass} ${activeClass}`
        : baseClass;
    }
    // Normal active state for all other roles
    return location.pathname === to ? `${baseClass} ${activeClass}` : baseClass;
  };

  return (
    <div className="drawer lg:drawer-open max-w-7xl mx-auto">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Drawer Content */}
      <div className="drawer-content flex flex-col">
        <nav className="navbar w-full bg-base-100 shadow-sm">
          {/* Mobile Menu */}
          <label htmlFor="dashboard-drawer" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>

          <div className="px-4 flex items-center gap-2">
            <Logo />
          </div>
        </nav>

        <div className="p-5">
          <Outlet />
        </div>
      </div>

      {/* Drawer Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <aside className="w-64 min-h-full bg-base-100 border-r p-4">
          <ul className="menu flex flex-col gap-2">
            {(role === "admin" || role === "rider") && (
              <li>
                <NavLink to="/dashboard" className={() => navClass("/dashboard")} end>
                  <CiDeliveryTruck className="text-xl" />
                  <span>Homepage</span>
                </NavLink>
              </li>
            )}

            <li>
              <NavLink
                to="/dashboard/payment-history"
                className={() => navClass("/dashboard/payment-history")}
              >
                <CiWallet className="text-xl" />
                <span>Payment History</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/my-parcels"
                className={() => navClass("/dashboard/my-parcels")}
              >
                <FaMotorcycle className="text-xl" />
                <span>My Parcels</span>
              </NavLink>
            </li>

            {role === "admin" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/users-management"
                    className={() => navClass("/dashboard/users-management")}
                  >
                    <FaUsers className="text-xl" />
                    <span>Users Management</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/assign-riders"
                    className={() => navClass("/dashboard/assign-riders")}
                  >
                    <FaMotorcycle className="text-xl" />
                    <span>Assign Riders</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/approve-riders"
                    className={() => navClass("/dashboard/approve-riders")}
                  >
                    <FaCheckCircle className="text-xl" />
                    <span>Approve Riders</span>
                  </NavLink>
                </li>
              </>
            )}

            {role === "rider" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/completed-deliveries"
                    className={() => navClass("/dashboard/completed-deliveries")}
                  >
                    <FaCheckCircle className="text-xl" />
                    <span>Completed Deliveries</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/assigned-deliveries"
                    className={() => navClass("/dashboard/assigned-deliveries")}
                  >
                    <FaMotorcycle className="text-xl" />
                    <span>Assigned Deliveries</span>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
