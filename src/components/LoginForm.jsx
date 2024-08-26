import { useState } from "react";
import { useAppContext } from "../context/AppContext";

function LoginForm({ setLoginState }) {
  const { handleLogin } = useAppContext();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validate = () => {
    let tempErrors = {};
    tempErrors.email = formData.email ? "" : "Email is required";
    tempErrors.email = /\S+@\S+\.\S+/.test(formData.email) ? "" : "Email is not valid";
    tempErrors.password = formData.password ? "" : "Password is required";
    setErrors(tempErrors);
    return Object.values(tempErrors).every(error => error === "");
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (validate()) {
      try {
        await handleLogin(formData.email, formData.password);
      } catch (error) {
        console.error("Login failed:", error);
      }
    }
  };

  return (
    <>
      <h2 className="text-2xl uppercase font-medium mb-1">Login</h2>
      <p className="text-gray-600 mb-6 text-sm">Login if you are a returning customer</p>
      <form action="" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="text-gray-600 mb-2 block">
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primaryColor ${
                errors.email ? "border-red-500" : ""
              }`}
              placeholder="Enter your email address"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="Password" className="text-gray-600 mb-2 block">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primaryColor ${
                errors.password ? "border-red-500" : ""
              }`}
              placeholder="Enter your Password"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="block w-full py-2 text-center text-white bg-primaryColor border border-primaryColor rounded hover:bg-transparent hover:text-primaryColor transition uppercase font-roboto font-medium"
          >
            login
          </button>
        </div>
      </form>
      <p className="mt-4 text-gray-600 text-center">
        Don't have an account?{" "}
        <span
          onClick={() => setLoginState(false)}
          className="text-primaryColor hover:cursor-pointer"
        >
          Register now
        </span>
      </p>
    </>
  );
}

export default LoginForm;
