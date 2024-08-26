import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useAppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";

const ProductDetails = () => {
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { setCart } = useAppContext();
  const [item, setItem] = useState({
    images: [],
    name: "",
    price: 0,
    oldPrice: 0,
    sizes: [],
    colors: [],
    brand: "",
    _id: null
  });
  const { id } = useParams();

  const handleImageClick = src => {
    setSelectedImage(src);
  };

  const handleSizeChange = size => {
    setSelectedSize(size);
  };

  const handleColorChange = color => {
    setSelectedColor(color);
  };

  const handleQuantityChange = change => {
    if (quantity + change > 0) {
      setQuantity(quantity + change);
    }
  };

  const handleCart = newItem => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select size and color.");
      return;
    }
    setCart(prev =>
      prev.concat({
        _id: newItem._id,
        name: newItem.name,
        price: newItem.price,
        brand: newItem.brand,
        image: selectedImage,
        color: selectedColor,
        size: selectedSize,
        quantity
      })
    );
    toast.success("Added Successfully!");
  };

  const getProduct = async () => {
    try {
      const res = await axios.get(`/products/${id}`);
      setItem(res.data);
      setSelectedImage(res.data.images[0]?.url || "");
      setLoading(false);
    } catch (error) {
      toast.error("Error fetching product details.");
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="container max-w-7xl px-2 md:px-4 mx-auto pb-6 pt-10 flex items-center gap-3 pl-4">
        <FaHome />
        <span className="text-sm text-gray-400">
          <FaChevronRight />
        </span>
        <p className="text-gray-600 text-2xl font-semibold">Product Details</p>
      </div>

      <div className="container max-w-7xl px-2 md:px-4 mx-auto grid grid-cols-2 gap-6 pb-12">
        <div>
          <img src={selectedImage} className="w-full max-h-[460px] object-cover" alt="Selected" />
          <div className="grid grid-cols-5 gap-4 mt-4">
            {item?.images?.map((image, i) => (
              <img
                key={i}
                src={image.url}
                alt="Thumbnail"
                className={`w-full cursor-pointer border ${
                  image.url === selectedImage ? "border-primaryColor" : ""
                }`}
                onClick={() => handleImageClick(image.url)}
              />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-medium uppercase mb-2">{item.name}</h2>

          <div className="space-y-2">
            <p className="space-x-2 text-gray-800 font-medium">
              <span>Availability:</span>
              <span className="text-green-600">In Stock</span>
            </p>
            <p className="space-x-2 ">
              <span className="text-gray-800 font-medium">Brand:</span>
              <span className="text-gray-600">{item.brand}</span>
            </p>
            <p className="space-x-2 ">
              <span className="text-gray-800 font-medium">Category:</span>
              <span className="text-gray-600">Footwear</span>
            </p>
          </div>
          <div className="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
            <p className="text-2xl text-primaryColor font-semibold">${item.price.toFixed(2)}</p>
            <p className="text-base text-gray-400 line-through">${item.oldPrice.toFixed(2)}</p>
          </div>
          <p className="text-gray-600 mt-4">
            Asperiores ullam culpa commodi est perferendis cupiditate in incidunt? Quasi
            exercitationem aliquid odit iusto, ea veniam optio veritatis dolores.
          </p>

          <div className="pt-4">
            <h3 className="text-sm text-gray-800 mb-1 uppercase font-medium">Size</h3>
            <div className="flex gap-2">
              {item?.sizes.map(size => (
                <label
                  key={size}
                  className={`border px-4 py-2 cursor-pointer ${
                    selectedSize === size ? "border-primaryColor" : "border-gray-300"
                  }`}
                  onClick={() => handleSizeChange(size)}
                >
                  {size}
                </label>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <h3 className="text-sm text-gray-800 mb-1 uppercase font-medium">Color</h3>
            <div className="flex gap-2">
              {item?.colors.map(color => (
                <span
                  key={color}
                  className={`w-6 h-6 cursor-pointer rounded-full border ${
                    selectedColor === color ? "border-primaryColor" : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorChange(color)}
                />
              ))}
            </div>
          </div>

          <div className="pt-4">
            <h3 className="text-sm text-gray-800 mb-1 uppercase font-medium">Quantity</h3>
            <div className="flex items-center space-x-2">
              <button className="px-2 py-1 bg-gray-300" onClick={() => handleQuantityChange(-1)}>
                -
              </button>
              <p>{quantity}</p>
              <button className="px-2 py-1 bg-gray-300" onClick={() => handleQuantityChange(1)}>
                +
              </button>
            </div>
          </div>

          <div className="pt-4">
            <button
              className="px-8 py-2 text-white bg-primaryColor uppercase font-medium rounded"
              onClick={() => handleCart(item)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
