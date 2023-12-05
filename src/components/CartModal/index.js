"use client";

import { Fragment, useContext, useEffect } from "react";
import CommonModal from "../CommonModal";
import { GlobalContext } from "@/context";
import { getAllCartItems } from "@/services/cart";

export default function CartModal() {
  const { showCartModal, setShowCartModal, user, cartItems, setCartItems } =
    useContext(GlobalContext);

  async function extractAllCartItems() {
    const response = await getAllCartItems(user?._id);

    if (response.success) {
      setCartItems(response.data);
      localStorage.setItem("cartItems", JSON.stringify(response.data));
    }

    console.log(response);
  }

  useEffect(() => {
    if (user !== null) extractAllCartItems();
  }, [user]);

  return (
    <CommonModal
      showButtons={true}
      show={showCartModal}
      setShow={setShowCartModal}
      mainContent={
        cartItems && cartItems.length ? (
          <ul role="list" className="-my-6 divide-y divide-gray-300">
            {cartItems.map((cartItem) => (
              <li key={cartItem.id} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={
                      cartItem &&
                      cartItem.productID &&
                      cartItem.productID.imageUrl
                    }
                    alt="Cart Item"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a>
                          {cartItem &&
                            cartItem.productID &&
                            cartItem.productID.productName}
                        </a>
                      </h3>
                    </div>

                    <p className="mt-1 text-sm text-gray-600">
                      $
                      {cartItem &&
                        cartItem.productID &&
                        cartItem.productID.price}
                    </p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <button
                      type="button"
                      className="font-medium text-red-400 sm:order-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : null
      }
      buttonComponent={
        <Fragment>
          <button
            type="button"
            className="text-white mt-1.5 w-full inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide"
          >
            Go To Cart
          </button>
          <button
            disabled={cartItems && cartItems.length === 0}
            type="button"
            className="text-white mt-1.5 w-full inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide disabled:opacity-50"
          >
            Checkout
          </button>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-600">
            <button type="button" className="font-medium text-gray">
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </button>
          </div>
        </Fragment>
      }
    />
  );
}
