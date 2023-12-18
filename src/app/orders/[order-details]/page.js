// OrderDetails.js

"use client";

import { GlobalContext } from "@/context";
import { getOrderDetails } from "@/services/order";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { PulseLoader } from "react-spinners";

export default function OrderDetails() {
  const {
    pageLevelLoader,
    setPageLevelLoader,
    orderDetails,
    setOrderDetails,
    user,
  } = useContext(GlobalContext);

  const params = useParams();
  const router = useRouter();

  async function extractOrderDetails() {
    setPageLevelLoader(true);

    const response = await getOrderDetails(params["order-details"]);

    if (response.success) {
      setPageLevelLoader(false);
      setOrderDetails(response.data);
    } else {
      setPageLevelLoader(false);
    }
  }

  useEffect(() => {
    extractOrderDetails();
  }, []);

  if (pageLevelLoader) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <PulseLoader
          color={"#ffffff"}
          loading={pageLevelLoader}
          size={30}
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <div className="py-14 px-4 md:px-6 flex flex-col md:flex-row">
      <div className="md:w-3/4">
        <div className="flex justify-start items-start space-y-2 flex-col">
          <h1 className="text-3xl lg:text-4xl font-bold leading-7 lg:leading-9 text-white">
            Order #{orderDetails && orderDetails._id}
          </h1>
          <p className="text-base font-medium leading-6 text-white">
            Date & Time:{" "}
            {orderDetails &&
              orderDetails.createdAt &&
              orderDetails.createdAt.split("T")[0]}{" "}
            |{" "}
            {orderDetails &&
              orderDetails.createdAt &&
              orderDetails.createdAt.split("T")[1].split(".")[0]}
          </p>
        </div>
        <div className="mt-10 space-y-6">
          <h2 className="text-xl font-semibold leading-6 text-white">
            Your order summary:
          </h2>
          {orderDetails &&
          orderDetails.orderItems &&
          orderDetails.orderItems.length
            ? orderDetails.orderItems.map((item) => (
                <div
                  key={item._id}
                  className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full"
                >
                  <div className="pb-4 md:pb-8 w-full md:w-40">
                    <img
                      src={item && item.product && item.product.imageUrl}
                      className="w-full hidden md:block"
                    />
                  </div>
                  <div className="border-b border-gray-300 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                    <div className="w-full flex flex-col justify-start items-start space-y-8">
                      <h3 className="text-xl font-semibold leading-6 text-white">
                        {item && item.product && item.product.productName}
                      </h3>
                    </div>
                    <div className="w-full flex justify-between items-start space-x-8">
                      <h3 className="text-xl font-semibold leading-6 text-white">
                        ${item && item.product && item.product.price}
                      </h3>
                    </div>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
      <div className="md:w-1/4 md:ml-6">
        {/* Customer Details */}
        <div className="bg-gray-50 p-6 mb-6">
          <h3 className="text-xl font-semibold leading-6 text-gray-900 mb-4">
            Customer Details
          </h3>
          <p className="text-base font-semibold leading-4 text-left text-gray-950">
            Name: {user?.name}
          </p>
          <p className="text-base font-semibold leading-4 text-left text-gray-950">
            Email: {user?.email}
          </p>
        </div>
        {/* Shipping Information */}
        <div className="bg-gray-50 p-6 text-black">
          <h3 className="text-xl font-semibold leading-6 text-gray-900 mb-4">
            Shipping Information
          </h3>
          <p>Name: {orderDetails && orderDetails.shippingAddress.fullName}</p>
          <p>Address: {orderDetails && orderDetails.shippingAddress.address}</p>
          <p>City: {orderDetails && orderDetails.shippingAddress.city}</p>
          <p>Country: {orderDetails && orderDetails.shippingAddress.country}</p>
          <p>
            Postal Code:{" "}
            {orderDetails && orderDetails.shippingAddress.postalCode}
          </p>
        </div>
        <button
          onClick={() => router.push("/")}
          className="mt-5 bg-white text-black px-5 py-3 text-xs font-medium uppercase tracking-wide"
        >
          Shop Again
        </button>
      </div>
    </div>
  );
}
