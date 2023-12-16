"use client";

import Notification from "@/components/Notification";
import { GlobalContext } from "@/context";
import { getAllOrdersForUser } from "@/services/order";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";

export default function Orders() {
  const {
    user,
    pageLevelLoader,
    setPageLevelLoader,
    allOrdersForUser,
    setAllOrdersForUser,
  } = useContext(GlobalContext);

  const router = useRouter();

  async function extractAllOrders() {
    setPageLevelLoader(true);
    const response = await getAllOrdersForUser(user?._id);

    if (response.success) {
      setPageLevelLoader(false);
      setAllOrdersForUser(response.data);
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

  console.log(allOrdersForUser);

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
    <section>
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-8 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div>
            <div className="px-4 py-6 sm:px-8 sm:py-10">
              <div className="flow-root">
                {allOrdersForUser && allOrdersForUser.length ? (
                  <ul className="flex flex-col gap-4">
                    {allOrdersForUser.map((order) => (
                      <li
                        key={order._id}
                        className="bg-white shadow p-5 flex flex-col space-y-3 py-6 text-left"
                      >
                        <div className="flex">
                          <h1 className="font-bold text-lg text-gray-500 mb-3 flex-1">
                            Order #: {order._id}
                          </h1>
                          <div className="flex items-center">
                            <p className="mr-3 text-sm font-medium text-gray-900">
                              Total Paid Amount:
                            </p>
                            <p className="mr-3 text-2xl font-semibold text-gray-900">
                              ${order.totalPrice}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {order.orderItems.map((orderItem, index) => (
                            <div key={index} className="shrink-0">
                              <img
                                className="h-24 w-24 max-w-full rounded-lg object-cover"
                                src={
                                  orderItem &&
                                  orderItem.product &&
                                  orderItem.product.imageUrl
                                }
                                alt="Order Item"
                              />
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-5">
                          <button className="text-white mt-1.5 mr-5 hover:bg-gray-800 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide">
                            {order.isProcessing
                              ? "Order is processing..."
                              : "Order is delivered!"}
                          </button>
                          <button
                            onClick={() => router.push("/orders")}
                            className="text-white mt-1.5 mr-5 hover:bg-gray-8 00 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide"
                          >
                            View Order Details
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Notification />
    </section>
  );
}
