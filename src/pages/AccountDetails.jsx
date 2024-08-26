import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
import { useAppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const AccountDetails = () => {
  const navigate = useNavigate();
  const { loggedUser } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    county: "",
    streetAddress: "",
    townCity: "",
    zipCode: "",
    phoneNumber: "",
    email: ""
  });

  const [formErrors, setFormErrors] = useState([]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    let errors = [];
    Object.keys(formData).forEach(field => {
      if (!formData[field]) {
        errors.push(field);
      }
    });

    if (errors.length > 0) {
      setFormErrors(errors);
    } else {
      setFormErrors([]);
      console.log("Form submitted successfully:", formData);

      try {
        const res = await axios.post("/user-details", { userId: loggedUser._id, ...formData });
        if (res.data) {
          toast.success(res.data.message);
          navigate("/account");
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  async function getUserDetails(userId) {
    try {
      const res = await axios.get(`/user-details/${userId}`);
      if (res.data) {
        const {
          firstName,
          lastName,
          county,
          streetAddress,
          townCity,
          zipCode,
          phoneNumber,
          email
        } = res.data;
        setFormData({
          firstName,
          lastName,
          county,
          streetAddress,
          townCity,
          zipCode,
          phoneNumber,
          email
        });
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  }

  useEffect(() => {
    getUserDetails(loggedUser._id);
  }, []);

  if (loading) {
    return <Loader />;
  }

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
              <h4 className="text-gray-800 font-medium">{loggedUser?.name}</h4>
            </div>
          </div>
        </div>

        <div className="md:col-span-9 shadow rounded px-6 pt-5 pb-7">
          <h4 className="text-lg font-medium capitalize mb-4">Profile Information</h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-600 mb-2 block">
                  First Name <span className="text-primaryColor">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`block w-full border ${
                    formErrors.includes("firstName") ? "border-red-500" : "border-gray-300"
                  } px-4 py-3 text-gray-600 text-sm rounded placeholder-gray-400 focus:border-primaryColor focus:ring-0`}
                />
              </div>
              <div>
                <label className="text-gray-600 mb-2 block">
                  Last Name <span className="text-primaryColor">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`block w-full border ${
                    formErrors.includes("lastName") ? "border-red-500" : "border-gray-300"
                  } px-4 py-3 text-gray-600 text-sm rounded placeholder-gray-400 focus:border-primaryColor focus:ring-0`}
                />
              </div>
            </div>

            <div>
              <label className="text-gray-600 mb-2 block">
                County/Region<span className="text-primaryColor">*</span>
              </label>
              <input
                type="text"
                name="county"
                value={formData.county}
                onChange={handleChange}
                className={`block w-full border ${
                  formErrors.includes("county") ? "border-red-500" : "border-gray-300"
                } px-4 py-3 text-gray-600 text-sm rounded placeholder-gray-400 focus:border-primaryColor focus:ring-0`}
              />
            </div>
            <div>
              <label className="text-gray-600 mb-2 block">
                Street Address <span className="text-primaryColor">*</span>
              </label>
              <input
                type="text"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleChange}
                className={`block w-full border ${
                  formErrors.includes("streetAddress") ? "border-red-500" : "border-gray-300"
                } px-4 py-3 text-gray-600 text-sm rounded placeholder-gray-400 focus:border-primaryColor focus:ring-0`}
              />
            </div>
            <div>
              <label className="text-gray-600 mb-2 block">
                Town/City <span className="text-primaryColor">*</span>
              </label>
              <input
                type="text"
                name="townCity"
                value={formData.townCity}
                onChange={handleChange}
                className={`block w-full border ${
                  formErrors.includes("townCity") ? "border-red-500" : "border-gray-300"
                } px-4 py-3 text-gray-600 text-sm rounded placeholder-gray-400 focus:border-primaryColor focus:ring-0`}
              />
            </div>
            <div>
              <label className="text-gray-600 mb-2 block">
                Zip Code <span className="text-primaryColor">*</span>
              </label>
              <input
                type="number"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className={`block w-full border ${
                  formErrors.includes("zipCode") ? "border-red-500" : "border-gray-300"
                } px-4 py-3 text-gray-600 text-sm rounded placeholder-gray-400 focus:border-primaryColor focus:ring-0`}
              />
            </div>
            <div>
              <label className="text-gray-600 mb-2 block">
                Phone Number <span className="text-primaryColor">*</span>
              </label>
              <input
                type="number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`block w-full border ${
                  formErrors.includes("phoneNumber") ? "border-red-500" : "border-gray-300"
                } px-4 py-3 text-gray-600 text-sm rounded placeholder-gray-400 focus:border-primaryColor focus:ring-0`}
              />
            </div>
            <div>
              <label className="text-gray-600 mb-2 block">
                Email Address<span className="text-primaryColor">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`block w-full border ${
                  formErrors.includes("email") ? "border-red-500" : "border-gray-300"
                } px-4 py-3 text-gray-600 text-sm rounded placeholder-gray-400 focus:border-primaryColor focus:ring-0`}
              />
            </div>

            {formErrors.length > 0 && (
              <div className="text-red-500 text-sm">Please fill in all required fields.</div>
            )}
            <button
              type="submit"
              className="w-full block text-center bg-primaryColor border-primaryColor text-white px-4 py-3 font-medium rounded-md hover:bg-transparent hover:text-primaryColor hover:border hover:border-primaryColor transition"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AccountDetails;
