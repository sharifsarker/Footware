import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAppContext } from "../context/AppContext";

const RegistrationForm = ({ setLoginState }) => {
  const { handleRegistration } = useAppContext();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    if (!formData.fullName) {
      toast.error("Full Name is required");
      return false;
    }
    if (!formData.email) {
      toast.error("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Email address is invalid");
      return false;
    }
    if (!formData.password) {
      toast.error("Password is required");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Password and Confirm Password do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const valid = validateForm();
    console.log(valid);

    if (validateForm()) {
      const res = await handleRegistration(formData.fullName, formData.email, formData.password);
      console.log(res);
      if (res) {
        toast.success("Registration Successful!");
      }
    }
  };

  return (
    <>
      <h2 className="text-2xl uppercase font-medium mb-1">Create an account</h2>
      <p className="text-gray-600 mb-6 text-sm">Register here if you don't have an account</p>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="text-gray-600 mb-2 block">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primaryColor "
              placeholder="Enter your Full Name"
            />
          </div>
          <div>
            <label className="text-gray-600 mb-2 block">Email address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primaryColor "
              placeholder="Enter your email address"
            />
          </div>
          <div>
            <label className="text-gray-600 mb-2 block">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primaryColor "
              placeholder="Enter your Password"
            />
          </div>
          <div>
            <label className="text-gray-600 mb-2 block">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primaryColor "
              placeholder="Confirm your password"
            />
          </div>
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="block w-full py-2 text-center text-white bg-primaryColor border border-primaryColor rounded hover:bg-transparent hover:text-primaryColor transition uppercase font-roboto font-medium"
          >
            Create account
          </button>
        </div>
      </form>

      <p className="mt-4 text-gray-600 text-center">
        Already have an account?{" "}
        <span
          onClick={() => setLoginState(true)}
          className="text-primaryColor hover:cursor-pointer"
        >
          Login Now
        </span>
      </p>
    </>
  );
};

export default RegistrationForm;
