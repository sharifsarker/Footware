import React, { useState } from "react";
import axios from "axios";
import ImageUploader from "../components/ImageUploader";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const AddProduct = () => {
  const { loggedUser } = useAppContext();
  const [formData, setFormData] = useState({
    images: [],
    name: "",
    price: "",
    oldPrice: "",
    sizes: [],
    colors: [],
    brand: ""
  });

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (event, arrayName) => {
    setFormData({
      ...formData,
      [arrayName]: event.target.value.split(",").map(item => item.trim())
    });
  };

  const handleImageUpload = uploadedImages => {
    setFormData({ ...formData, images: uploadedImages });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    console.log(formData);

    try {
      const res = await axios.post("/products/add", {
        ...formData,
        userId: loggedUser._id
      });
      console.log(res.data);
      if (res.data) {
        toast.success("Product added successfully");
        setFormData({
          images: [],
          name: "",
          price: "",
          oldPrice: "",
          sizes: [],
          colors: [],
          brand: ""
        });
      }
    } catch (error) {
      console.error("Error adding product: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl px-4 my-12 mx-auto">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primaryColor"
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        required
        className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primaryColor"
      />
      <input
        type="number"
        name="oldPrice"
        placeholder="Old Price"
        value={formData.oldPrice}
        onChange={handleChange}
        required
        className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primaryColor"
      />
      <input
        type="text"
        name="sizes"
        placeholder="Sizes (comma separated)"
        value={formData.sizes.join(", ")}
        onChange={e => handleArrayChange(e, "sizes")}
        required
        className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primaryColor"
      />
      <input
        type="text"
        name="colors"
        placeholder="Colors (comma separated)"
        value={formData.colors.join(", ")}
        onChange={e => handleArrayChange(e, "colors")}
        required
        className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primaryColor"
      />
      <input
        type="text"
        name="brand"
        placeholder="Brand"
        value={formData.brand}
        onChange={handleChange}
        required
        className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primaryColor"
      />
      <ImageUploader onImageUpload={handleImageUpload} />
      <button
        type="submit"
        className="block w-full py-2 text-center text-white bg-primaryColor border border-primaryColor rounded hover:bg-transparent hover:text-primaryColor transition uppercase font-roboto font-medium"
      >
        Add Product
      </button>
    </form>
  );
};

export default AddProduct;
