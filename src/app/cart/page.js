"use client";

import CommonCart from "@/components/CommonCart";
import { GlobalContext } from "@/context";
import { deleteCartItem, getAllCartItems } from "@/services/cart";
import { useContext, useEffect } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";

export default function Cart() {
  const {
    user,
    setCartItems,
    cartItems,
    pageLevelLoader,
    setPageLevelLoader,
    setComponentLevelLoader,
    componentLevelLoader,
  } = useContext(GlobalContext);

  async function extractAllCartItems() {
    setPageLevelLoader(true);
    const response = await getAllCartItems(user?._id);

    if (response.success) {
      const updatedData =
        response.data && response.data.length
          ? response.data.map((item) => ({
              ...item,
              productID: {
                ...item.productID,
                price:
                  item.productID.onSale === "yes"
                    ? parseInt(
                        (
                          item.productID.price -
                          item.productID.price *
                            (item.productID.priceDrop / 100)
                        ).toFixed(2)
                      )
                    : item.productID.price,
              },
            }))
          : [];
      setCartItems(updatedData);
      setPageLevelLoader(false);
      localStorage.setItem("cartItems", JSON.stringify(response.data));
    }

    console.log(response);
  }

  useEffect(() => {
    if (user !== null) extractAllCartItems();
  }, [user]);

  async function handleDeleteCartItem(getCartItemID) {
    setComponentLevelLoader({ loading: true, id: getCartItemID });
    const response = await deleteCartItem(getCartItemID);

    if (response.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.success(response.message, {
        position: toast.POSITION.TOP_RIGHT,
      });

      extractAllCartItems();
    } else {
      setComponentLevelLoader({ loading: false, id: getCartItemID });
      toast.error(response.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  if (pageLevelLoader) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <PulseLoader
          color={"#ffffff"}
          loading={pageLevelLoader}
          size={50}
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <CommonCart
      componentLevelLoader={componentLevelLoader}
      handleDeleteCartItem={handleDeleteCartItem}
      cartItems={cartItems}
    />
  );
}
