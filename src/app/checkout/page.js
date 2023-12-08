"use client";

import { GlobalContext } from "@/context";
import { getAllAddresses } from "@/services/address";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Checkout() {
  const {
    cartItems,
    user,
    addresses,
    setAddresses,
    checkoutFormData,
    setCheckoutFormData,
  } = useContext(GlobalContext);

  const [selectedAddress, setSelectedAddress] = useState(null);

  const router = useRouter();

  async function getAddresses() {
    const response = await getAllAddresses(user?._id);

    if (response.success) {
      setAddresses(response.data);
    }
  }

  useEffect(() => {
    if (user !== null) getAddresses();
  }, [user]);

  function handleSelectedAddress(getAddress) {
    if (getAddress._id === selectedAddress) {
      setSelectedAddress(null);
      setCheckoutFormData({
        ...checkoutFormData,
        shippingAddress: {},
      });
      return;
    }

    setSelectedAddress(getAddress._id);

    setCheckoutFormData({
      ...checkoutFormData,
      shippingAddress: {
        ...checkoutFormData.shippingAddress,
        fullName: getAddress.fullName,
        address: getAddress.address,
        city: getAddress.city,
        country: getAddress.country,
        postalCode: getAddress.postalCode,
      },
    });
  }

  console.log(checkoutFormData, "CFD");

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4 sm:px-10 lg:px-20 xl:px-32">
      {/* Cart Summary */}
      <div className="px-4 pt-8 text-black">
        <p className="font-medium text-xl text-white">Cart Summary</p>
        <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-5">
          {cartItems && cartItems.length ? (
            cartItems.map((item) => (
              <div
                className="flex flex-col rounded-lg bg-white sm:flex-row"
                key={item._id}
              >
                <img
                  src={item && item.productID && item.productID.imageUrl}
                  alt="Cart Item"
                  className="m-2 h-24 w-24 rounded-md border object-cover object-center"
                />
                <div className="flex w-full flex-col px-4 py-4">
                  <span className="font-bold">
                    {item && item.productID && item.productID.productName}
                  </span>
                  <span className="font-semibold">
                    ${item && item.productID && item.productID.price}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div>Your cart is empty</div>
          )}
        </div>
      </div>

      {/* Shipping Address Details */}
      <div className="px-4 pt-8 text-black">
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium">Shipping Address Details</p>
          <p className="text-gray-400 font-bold">Select Address Below</p>
          <div className="w-full mt-6 mr-0 mb-0 ml-0 pb-3 space-y-6">
            {addresses && addresses.length ? (
              addresses.map((item) => (
                <div
                  onClick={() => handleSelectedAddress(item)}
                  key={item._id}
                  className={`border border-gray-400 p-6 ${
                    item._id === selectedAddress ? "border-gray-900" : ""
                  }`}
                >
                  <p>Name: {item.fullName}</p>
                  <p>Address: {item.address}</p>
                  <p>City: {item.city}</p>
                  <p>Country: {item.country}</p>
                  <p>Postal Code: {item.postalCode}</p>
                  <button className="text-white mt-1.5 mr-5 hover:bg-gray-800 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide">
                    {item._id === selectedAddress
                      ? "Selected Address"
                      : "Select Address"}
                  </button>
                </div>
              ))
            ) : (
              <p>No addresses added.</p>
            )}
          </div>
        </div>
        <button
          onClick={() => router.push("/account")}
          className="text-black mt-1.5 mr-5 hover:bg-gray-300 inline-block bg-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
        >
          Add New Address
        </button>
        <div className="mt-6 border-t border-b py-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-white">Subtotal</p>
            <p className="text-lg font-bold text-white">
              $
              {cartItems && cartItems.length
                ? cartItems.reduce(
                    (total, item) => item.productID.price + total,
                    0
                  )
                : "0"}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-white">Shipping</p>
            <p className="text-sm font-medium text-white">Free</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-lg font-medium text-white">Total</p>
            <p className="text-lg font-bold text-white">
              $
              {cartItems && cartItems.length
                ? cartItems.reduce(
                    (total, item) => item.productID.price + total,
                    0
                  )
                : "0"}
            </p>
          </div>
          {/* Checkout BTN */}
          <div className="pb-10">
            <button
              disabled={
                (cartItems && cartItems.length === 0) ||
                Object.keys(checkoutFormData.shippingAddress).length === 0
              }
              className="disabled:opacity-50 disabled:hover:bg-white text-black mt-1.5 mr-5 w-full hover:bg-gray-300 inline-block bg-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
