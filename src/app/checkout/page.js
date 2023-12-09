"use client";

import Notification from "@/components/Notification";
import { GlobalContext } from "@/context";
import { getAllAddresses } from "@/services/address";
import { createNewOrder } from "@/services/order";
import { callStripeSession } from "@/services/stripe";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";

require("dotenv").config();

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
  const [isOrderProcessing, setIsOrderProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const router = useRouter();
  const params = useSearchParams();

  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const stripePromise = loadStripe(publishableKey);

  async function getAddresses() {
    const response = await getAllAddresses(user?._id);

    if (response.success) {
      setAddresses(response.data);
    }
  }

  useEffect(() => {
    if (user !== null) getAddresses();
  }, [user]);

  useEffect(() => {
    async function createFinalOrder() {
      const isStripe = JSON.parse(localStorage.getItem("stripe"));

      if (
        isStripe &&
        params.get("status") === "success" &&
        cartItems &&
        cartItems.length > 0
      ) {
        setIsOrderProcessing(true);
        const getCheckoutFormData = JSON.parse(
          localStorage.getItem("checkoutFormData")
        );

        const createFinalCheckoutFormData = {
          user: user?._id,
          shippingAddress: getCheckoutFormData.shippingAddress,
          orderItems: cartItems.map((item) => ({
            qty: 1,
            product: item.productID,
          })),
          paymentMethod: "Stripe",
          totalPrice: cartItems.reduce(
            (total, item) => item.productID.price + total,
            0
          ),
          isPaid: true,
          isProcessing: true,
          paidAt: new Date(),
        };

        const response = await createNewOrder(createFinalCheckoutFormData);

        if (response.success) {
          setIsOrderProcessing(false);
          setOrderSuccess(true);
          toast.success(response.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          setIsOrderProcessing(false);
          setOrderSuccess(false);
          toast.error(response.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      }
    }

    createFinalOrder();
  }, [params.get("status"), cartItems]);

  // * handleSelectedAddress
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
        city: getAddress.city,
        country: getAddress.country,
        postalCode: getAddress.postalCode,
        address: getAddress.address,
      },
    });
  }

  // * handleCheckout
  async function handleCheckout() {
    const stripe = await stripePromise;

    const createLineItems = cartItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          images: [item.productID.imageUrl],
          name: item.productID.productName,
        },
        unit_amount: item.productID.price * 100,
      },
      quantity: 1,
    }));

    const response = await callStripeSession(createLineItems);
    setIsOrderProcessing(true);
    localStorage.setItem("stripe", true);
    localStorage.setItem("checkoutFormData", JSON.stringify(checkoutFormData));

    const { error } = await stripe.redirectToCheckout({
      sessionId: response.id,
    });

    console.log(error);
  }

  console.log(checkoutFormData, "CFD");

  useEffect(() => {
    if (orderSuccess) {
      setTimeout(() => {
        // setOrderSuccess(false);
        router.push("/orders");
      }, [2500]);
    }
  }, [orderSuccess]);

  // * orderSuccess
  if (orderSuccess) {
    return (
      <section className="h-screen bg-black">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mt-8 max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow">
              <div className="px-4 py-6 sm:px-8 sm:py-10 flex flex-col gap-5">
                <h1 className="font-bold text-lg uppercase text-black">
                  Your payment is successful and you will be redirected to
                  orders page in 3 seconds.
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // * isOrderProcessing
  if (isOrderProcessing) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <PulseLoader
          color={"#ffffff"}
          loading={isOrderProcessing}
          size={30}
          data-testid="loader"
        />
      </div>
    );
  }

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
              onClick={handleCheckout}
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
      <Notification />
    </div>
  );
}
