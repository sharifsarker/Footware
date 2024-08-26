import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="bg-slate-200">
      <div className="container px-4 mx-auto relative z-10">
        <div className="flex items-center flex-col lg:flex-row">
          <div className="lg:w-1/2 py-12 lg:py-40">
            <h1 className="text-4xl md:text-6xl font-medium mb-4 text-white-800 capitalize">
              Best collection For <br /> Shoe Lovers
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, beatae ullam <br />{" "}
              obcaecati eveniet nulla sofficiis qui consequatur deserunt nostrum, <br /> atque
              quaerat similique blanditiis minus sit ad accusamus!
            </p>
            <div className="mt-12">
              <Link
                to="/shop"
                className="bg-primaryColor border border-primaryColor text-white px-8 py-3 font-medium rounded-md hover:bg-transparent hover:text-primaryColor transition"
              >
                Shop Now
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2">
            <img src="/images/hero.png" alt="Hero" className="w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
