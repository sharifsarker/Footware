import React, { useState } from "react";
import { toast } from "react-toastify";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: ""
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
    if (!formData.message) {
      toast.error("Message is required");
      return false;
    }

    return true;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const valid = validateForm();
    console.log(valid);

    if (validateForm()) {
      toast.success("Thanks for contacting us!");
      setFormData({
        fullName: "",
        email: "",
        message: ""
      });
    }
  };
  return (
    <div className="container max-w-2xl mx-auto px-4 md:px-20 py-8 md:py-20">
      <h2 className="text-xl md:text-3xl text-center mb-8">Contact Us</h2>
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
            <textarea
              type="text"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primaryColor "
              placeholder="Enter your Password"
            ></textarea>
          </div>
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="block w-full py-2 text-center text-white bg-primaryColor border border-primaryColor rounded hover:bg-transparent hover:text-primaryColor transition uppercase font-roboto font-medium"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
