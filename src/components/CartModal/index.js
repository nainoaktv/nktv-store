"use client";

import { Fragment, useContext, useEffect } from "react";
import CommonModal from "../CommonModal";
import { GlobalContext } from "@/context";
import { getAllCartItems } from "@/services/cart";

export default function CartModal() {
  const { showCartModal, setShowCartModal, user } = useContext(GlobalContext);

  async function extractAllCartItems() {
    const response = await getAllCartItems(user?._id);

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
      buttonComponent={
        <Fragment>
          <button className="text-black">Go To Cart</button>
          <button className="text-black">Checkout</button>
        </Fragment>
      }
    />
  );
}
