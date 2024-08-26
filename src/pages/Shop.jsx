import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
import { GrView } from "react-icons/gr";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppContext } from "../context/AppContext";
import axios from "axios";
import Loader from "../components/Loader";

const Shop = () => {
  const { setCart } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    brands: {},
    minPrice: "",
    maxPrice: "",
    size: "",
    color: ""
  });
  const [shopItems, setShopItems] = useState([]);

  const getUniqueValues = (arr, key) => {
    return [...new Set(arr.flatMap(item => item[key]))];
  };

  const uniqueBrands = getUniqueValues(shopItems, "brand");
  const uniqueSizes = getUniqueValues(shopItems, "sizes");
  const uniqueColors = getUniqueValues(shopItems, "colors");

  const handleChangeFilter = e => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === "checkbox" ? { ...prev[name], [value]: checked } : value
    }));
  };

  const handleSearch = async () => {
    try {
      console.log(filters);

      const res = await axios.get("/products", {
        params: filters
      });
      setShopItems(res.data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

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
    setShopItems(res.data);
    setLoading(false);
  }
  useEffect(() => {
    getProducts();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="container px-2 md:px-4 mx-auto py-4 flex items-center gap-3 pl-4">
        <FaHome />
        <span className="text-sm text-gray-400">
          <FaChevronRight />
        </span>
        <p className="text-gray-600 font-medium text-2xl">Shop</p>
      </div>

      <div className="container px-2 md:px-4 mx-auto grid md:grid-cols-4 gap-6 pt-4 pb-16 items-start">
        <div className="md:col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hidden">
          <div className="divide-y divide-gray-200 space-y-5">
            <div className="pt-4">
              <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">Brands</h3>
              <div className="space-y-2">
                {uniqueBrands.map((brand, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`brand-${index}`}
                      name="brands"
                      value={brand}
                      onChange={handleChangeFilter}
                      className="text-primaryColor focus:ring-0 rounded-sm cursor-pointer"
                    />
                    <label
                      htmlFor={`brand-${index}`}
                      className="text-gray-600 ml-3 cursor-pointer"
                    >
                      {brand}
                    </label>
                    <div className="ml-auto text-gray-600 text-sm">
                      ({shopItems.filter(item => item.brand === brand).length})
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">Price</h3>
              <div className="mt-4 flex items-center">
                <input
                  type="text"
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleChangeFilter}
                  className="w-full border border-gray-300 focus:border-primaryColor focus:ring-0 px-3 py-1 text-gray-600 text-sm rounded"
                  placeholder="min"
                />
                <span className="mx-3 text-gray-500">-</span>
                <input
                  type="text"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleChangeFilter}
                  className="w-full border-gray-300 border focus:border-primaryColor focus:ring-0 px-3 py-1 text-gray-600 text-sm rounded"
                  placeholder="max"
                />
              </div>
            </div>

            <div className="pt-4">
              <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">Size</h3>
              <div className="flex gap-2">
                {uniqueSizes.map((size, index) => (
                  <div
                    className={
                      filters.size === size
                        ? "border border-primaryColor"
                        : "border border-transparent"
                    }
                    key={index}
                  >
                    <input
                      type="radio"
                      name="size"
                      id={`size-${size}`}
                      value={size}
                      onChange={handleChangeFilter}
                      className="hidden"
                    />
                    <label
                      htmlFor={`size-${size}`}
                      className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                    >
                      {size}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">Color</h3>
              <div className="flex items-center gap-2">
                {uniqueColors.map((color, index) => (
                  <div
                    className={
                      filters.color === color
                        ? "border border-primaryColor p-0.5"
                        : "border border-transparent p-0.5"
                    }
                    key={index}
                  >
                    <div style={{ backgroundColor: color }}>
                      <input
                        type="radio"
                        name="color"
                        id={`color-${color}`}
                        value={color}
                        onChange={handleChangeFilter}
                        className="hidden"
                      />
                      <label
                        htmlFor={`color-${color}`}
                        className="rounded-sm h-5 w-5 cursor-pointer shadow-sm block"
                      ></label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-4">
              <button
                onClick={handleSearch}
                className="w-full bg-primaryColor text-white py-2 px-4 rounded shadow-md text-sm uppercase font-medium"
              >
                Search
              </button>
              <button
                onClick={() =>
                  setFilters({
                    brands: {},
                    minPrice: "",
                    maxPrice: "",
                    size: "",
                    color: ""
                  })
                }
                className="w-full border border-primaryColor text-primaryColor py-2 px-4 rounded shadow-md text-sm uppercase font-medium mt-5"
              >
                Clear Search
              </button>
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="container px-2 md:px-4 mx-auto pb-16">
            <h2 className="text-2xl flex justify-center font-medium text-gray-800 uppercase mb-6">
              Top New Arrival
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {shopItems.map(item => {
                return (
                  <div className="bg-white shadow rounded overflow-hidden group" key={item._id}>
                    <div className="relative">
                      <img
                        src={item.images[0].url}
                        className="w-full max-h-[300px] object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 md:opacity-0 md:group-hover:opacity-100 transition flex items-center justify-center gap-2">
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

                      <div className="flex items-baseline mb-1 space-x-2">
                        <p className="text-xl text-primaryColor font-semibold">${item.price}</p>
                        <p className="text-sm text-gray-400 line-through">${item.oldPrice}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleCart(item)}
                      className="block w-full py-1 text-center text-white bg-primaryColor border border-primaryColor rounded-b hover:bg-transparent hover:text-primaryColor transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
