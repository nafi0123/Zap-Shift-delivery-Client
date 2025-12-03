import React from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";
import Logo from "../../../components/Logo/Logo";
import useRole from "../../../hooks/useRole";

const NavBar = () => {
  const { user, logOut } = useAuth();
  const { role } = useRole();

  const handleLogOut = () => {
    logOut().catch();
  };

  const activeClass = "text-primary font-semibold border-b-2 border-primary";
  const baseClass = "hover:text-primary transition-all";

  const navClass = ({ isActive }) => (isActive ? activeClass : baseClass);

  const links = (
    <>
      <li>
        <NavLink to="/" className={navClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" className={navClass}>
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink to="/coverage" className={navClass}>
          Coverage
        </NavLink>
      </li>
      <li>
        <NavLink to="/send-parcel" className={navClass}>
          Send Parcel
        </NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink to="/dashboard/my-parcels" className={navClass}>
              My Parcels
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard" className={navClass}>
              Dashboard
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar   px-2 lg:px-6 ">
      {/* LEFT SECTION */}
      <div className="navbar-start flex items-center gap-2">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>

        {/* Logo */}
        <div to="/" className="flex items-center">
          <Logo />
        </div>
      </div>

      {/* CENTER LINKS (Desktop) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 flex items-center gap-2">
          {links}
        </ul>
      </div>

      {/* RIGHT SECTION BUTTONS */}
      <div className="navbar-end flex items-center gap-2">
        {user ? (
          <button onClick={handleLogOut} className="btn btn-sm btn-outline">
            Log Out
          </button>
        ) : (
          <Link className="btn btn-sm btn-outline" to="/login">
            Log In
          </Link>
        )}

        {/* Rider Button */}

        {role !== "rider" && (
          <Link className="btn btn-primary text-black btn-sm" to="/rider">
            Be a Rider
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
