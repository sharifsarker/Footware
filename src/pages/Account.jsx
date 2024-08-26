import React from "react";
import { FaHome } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Account = () => {
  const { handleLogout, loggedUser } = useAppContext();
  return (
    <>
      <div className="container max-w-7xl px-2 md:px-4 mx-auto py-4 flex items-center gap-3 pl-4">
        <FaHome />
        <span className="text-sm text-gray-400">
          <FaChevronRight />
        </span>
        <p className="text-gray-600 font-medium">My Account</p>
      </div>

      <div className="container max-w-7xl px-2 md:px-4 mx-auto grid md:grid-cols-12 items-start gap-6 pt-4 pb-14">
        <div className="md:col-span-3">
          <div className="px-4 py-3 shadow flex items-center gap-4">
            <div className="flex-grow">
              <p className="text-gray-600">Hello,</p>
              <h4 className="text-gray-800 font-medium">{loggedUser.name}</h4>
            </div>
          </div>
          <div className="mt-6 bg-white shadow rounded  p-4 divide-y divide-gray-200 space-y-4 text-gray-600">
            <div className="  space-y-1 pl-8">
              <Link
                to={`/order-list/${loggedUser._id}`}
                className="relative mt-6 hover:text-primaryColor block font-medium capitalize transition"
              >
                My order History
              </Link>
            </div>

            <div className="space-y-1 pl-8">
              <button
                onClick={handleLogout}
                className="relative hover:text-primaryColor mt-3 block font-medium capitalize transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="md:col-span-9">
          <div className="shadow rounded bg-white px-4 pt-6 pb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-gray-800 text-lg">Personal Profile</h3>
              <Link to={`/account/${loggedUser._id}`} className="text-primaryColor">
                Edit
              </Link>
            </div>
            <div className="space-x-1">
              <h4 className="text-gray-700 font-medium">{loggedUser.name}</h4>
              <p className="text-gray-800">{loggedUser.email}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
