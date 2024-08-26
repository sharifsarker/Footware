import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

function Navbar() {
  const { loggedUser, handleLogout } = useAppContext();
  return (
    <nav className="bg-gray-800">
      <div className="container flex mx-auto px-4">
        <div className="flex items-center justify-between flex-grow py-4">
          <div className="flex items-center space-x-2 md:space-x-6 capitalize">
            <Link
              to="/"
              href="index.html"
              className="text-gray-200 hover:text-white transition text-sm md:text-base"
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="text-gray-200 hover:text-white transition text-sm md:text-base"
            >
              Shop
            </Link>
            {loggedUser.userRole === "admin" ? (
              <>
                <Link
                  to="/add-product"
                  className="text-gray-200 hover:text-white transition text-sm md:text-base"
                >
                  Add Product
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/contact-us"
                  className="text-gray-200 hover:text-white transition text-sm md:text-base"
                >
                  Contact
                </Link>
                <Link
                  to="/about-us"
                  className="text-gray-200 hover:text-white transition text-sm md:text-base"
                >
                  About Us
                </Link>
              </>
            )}
          </div>
          <div>
            {loggedUser.email ? (
              <button
                onClick={handleLogout}
                className="text-gray-200 hover:text-white transition text-sm md:text-base"
              >
                Logout
              </button>
            ) : (
              <Link
                to="login"
                className="text-gray-200 hover:text-white transition text-sm md:text-base"
              >
                Login/Register
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
