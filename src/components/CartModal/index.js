"use client";

import { Fragment, useContext } from "react";
import CommonModal from "../CommonModal";
import { GlobalContext } from "@/context";

export default function CartModal() {
  const { showCartModal, setShowCartModal } = useContext(GlobalContext);

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
