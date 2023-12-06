"use client";

import { GlobalContext } from "@/context";
import { useContext } from "react";

export default function Checkout() {
  const { cartItems, user } = useContext(GlobalContext);

  console.log(cartItems);

  return <div></div>;
}
