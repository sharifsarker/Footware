import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
import { useAppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import Payment from "../stripe/Payment";
import { Link } from "react-router-dom";

const Checkout = () => {
  const { cart, loggedUser } = useAppContext();
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
  const [showModal, setShowModal] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const validateForm = async () => {
    console.log(formData);

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
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
    console.log(errors);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    validateForm();
  };

  function handleOrderSubmit() {
    validateForm();
    if (formErrors.length === 0) {
      setShowModal(true);
    }
  }

  const calculateSubtotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const subtotal = calculateSubtotal();
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

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
        console.log(
          firstName,
          lastName,
          county,
          streetAddress,
          townCity,
          zipCode,
          phoneNumber,
          email
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getUserDetails(loggedUser._id);
  }, []);

  return (
    <>
      <div className="container max-w-7xl px-2 md:px-4 mx-auto py-4 flex items-center gap-3 pl-4">
        <FaHome />
        <span className="text-sm text-gray-400">
          <FaChevronRight />
        </span>
        <p className="text-gray-600 font-medium">Checkout</p>
      </div>

      <div className="container max-w-7xl px-2 md:px-4 mx-auto gap-6 grid md:grid-cols-12 items-start pb-16 pt-4">
        <div className="md:col-span-7 border border-gray shadow-sm p-4 rounded max-md:order-1">
          <h3 className="text-lg font-medium capitalize mb-4">Checkout</h3>
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
        {cart.length > 0 ? (
          <div className="md:col-span-5 border border-gray-200 p-4 rounded">
            <h4 className="text-gray-800 text-lg mb-4 font-medium uppercase">Order Summary</h4>

            {cart.map((item, index) => (
              <div key={index} className="flex justify-between mb-4">
                <div>
                  <h5 className="text-gray-800 font-medium">{item.name}</h5>
                  <p className="text-sm text-gray-600">Size: {item.size}</p>
                </div>
                <p className="text-gray-600">x{item.quantity}</p>
                <p className="text-gray-800 font-medium">${item.price}</p>
              </div>
            ))}

            <div className="flex justify-between border-b border-gray-200 text-gray-800 font-medium py-3 uppercase">
              <p>Subtotal</p>
              <p>${subtotal}</p>
            </div>
            <div className="flex justify-between border-b border-gray-200 text-gray-800 font-medium py-3 uppercase">
              <p>Shipping</p>
              <p>Free</p>
            </div>
            <div className="flex justify-between border-b border-gray-200 text-gray-800 font-medium py-3 uppercase">
              <p>Total</p>
              <p>${total}</p>
            </div>
            <div className="py-3">
              <button
                type="button"
                onClick={handleOrderSubmit}
                className="w-full block text-center bg-primaryColor border border-primaryColor text-white px-4 py-3 font-medium rounded-md hover:bg-transparent hover:text-primaryColor hover:border hover:border-primaryColor transition"
              >
                Place Order
              </button>
            </div>

            <div
              className={`py-3 fixed inset-0 bg-slate-700 bg-opacity-90 items-center justify-center ${
                showModal ? "flex" : "hidden"
              }`}
            >
              <div className="bg-white max-w-sm rounded w-full">
                <Payment
                  setShowModal={setShowModal}
                  price={total}
                  username={loggedUser.name}
                  shippingAddress={formData}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="md:col-span-5 border border-gray-200 p-4 rounded">
            <p className="text-sm md:text-base mb-5">No items in the cart.</p>
            <Link to={"/shop"}>
              <button className="w-full block text-center bg-primaryColor border border-primaryColor text-white px-4 py-3 font-medium rounded-md hover:bg-transparent hover:text-primaryColor hover:border hover:border-primaryColor transition">
                Continue Shopping
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Checkout;
