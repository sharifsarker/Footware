import React, { useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { GrView } from "react-icons/gr";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const Recommended = () => {
  const { setCart } = useAppContext();
  const [recommendedItems, setRecommendedItems] = useState([]);

  function handleCart(newItem) {
    setCart(prev =>
      prev.concat({
        _id: newItem._id,
        name: newItem.name,
        price: newItem.price,
        brand: newItem.brand,
        image: newItem.images[0].url,
        color: newItem.colors[0],
        size: newItem.sizes[0],
        quantity: 1
      })
    );
    toast.success("Added Successfully!");
  }

  async function getProducts() {
    const res = await axios.get("/products");
    setRecommendedItems(res.data);
  }
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="container pb-16 px-4 mx-auto">
      <h2 className="text-2xl flex justify-center font-medium text-gray-800 uppercase mb-6">
        Recommend for you
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {recommendedItems.slice(0, 4).map(item => (
          <div key={item._id} className="bg-white shadow rounded overflow-hidden group">
            <div className="relative">
              <img
                src={item.images[0].url}
                className="w-full max-h-[280px] object-cover"
                alt={item.name}
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 md:opacity-0 md:group-hover:opacity-100 transition flex items-center justify-center gap-2 md:hidden">
                <Link
                  to={`/product-details/${item._id}`}
                  className="text-white text-lg w-20 h-20 rounded-full bg-primaryColor flex items-center justify-center hover:bg-gray-800 transition text-center"
                >
                  <GrView />
                </Link>
              </div>
            </div>
            <div className="pt-4 pb-3 px-4">
              <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primaryColor transition">
                {item.name}
              </h4>

              <div className="flex items-baseline mb-1 space-x-2 font-roboto">
                <p className="text-xl text-primaryColor font-semibold ">
                  ${item.price.toFixed(2)}
                </p>
                <p className="text-sm text-gray-400 line-through">${item.oldPrice.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => handleCart(item)}
                className="block w-full py-1 text-center text-white bg-primaryColor border-primaryColor rounded-b hover:bg-transparent hover:text-primaryColor transition"
              >
                Add to cart
              </button>
              <Link
                to={`/product-details/${item._id}`}
                className="hidden md:block w-full py-1 text-center text-white bg-primaryColor border-primaryColor rounded-b hover:bg-transparent hover:text-primaryColor transition"
              >
                View Product
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommended;
