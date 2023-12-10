"use client";

import { GlobalContext } from "@/context";
import { getAllOrdersForUser } from "@/services/order";
import { useContext, useEffect } from "react";
import { toast } from "react-toastify";

export default function Orders() {
  const { user, pageLevelLoader, setPageLevelLoader } =
    useContext(GlobalContext);

  async function extractAllOrders() {
    setPageLevelLoader(true);
    const response = await getAllOrdersForUser(user?._id);

    if (response.success) {
      setPageLevelLoader(false);
      toast.success(response.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      setPageLevelLoader(false);
      toast.error(response.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  useEffect(() => {
    if (user !== null) extractAllOrders();
  }, [user]);

  return <section>All your orders</section>;
}
