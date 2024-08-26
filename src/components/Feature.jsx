import React from "react";

const Feature = () => {
  return (
    <div className="container px-4 mx-auto py-16">
      <div className="w-10/12 grid md:grid-cols-3 gap-6 mx-auto justify-center">
        <div className="border border-primaryColor rounded-sm px-3 py-6 flex justify-center items-center gap-5">
          <img src="/images/delivery.svg" className="w-12 h-12 object-contain " />
          <div>
            <h4 className="font-medium text-lg capitalize">Free Shipping </h4>
            <p className="text-gray-500 text-sm">Oder over $200</p>
          </div>
        </div>

        <div className="border border-primaryColor rounded-sm px-3 py-6 flex justify-center items-center gap-5">
          <img src="/images/money-back.svg" className="w-12 h-12 object-contain " />
          <div>
            <h4 className="font-medium text-lg capitalize">Free Shipping </h4>
            <p className="text-gray-500 text-sm">30 Days Money Return</p>
          </div>
        </div>

        <div className="border border-primaryColor rounded-sm px-3 py-6 flex justify-center items-center gap-5">
          <img src="/images/service-hours.svg" className="w-12 h-12 object-contain " />
          <div>
            <h4 className="font-medium text-lg capitalize">Free Shipping </h4>
            <p className="text-gray-500 text-sm">Customer Support</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;
