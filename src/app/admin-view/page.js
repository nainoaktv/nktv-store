"use client";

import ComponentLevelLoader from "@/components/Loader/componentlevel";
import { GlobalContext } from "@/context";
import { getAllOrdersForAdmin, updateOrderStatus } from "@/services/order";
import { useContext, useEffect } from "react";
import { PulseLoader } from "react-spinners";

export default function AdminView() {
  const {
    allOrdersForAdmin,
    setAllOrdersForAdmin,
    user,
    pageLevelLoader,
    setPageLevelLoader,
    componentLevelLoader,
    setComponentLevelLoader,
  } = useContext(GlobalContext);

  async function extractAllOrdersForAdmin() {
    setPageLevelLoader(true);
    const response = await getAllOrdersForAdmin();

    console.log(response);

    if (response.success) {
      setPageLevelLoader(false);
      setAllOrdersForAdmin(
        response.data && response.data.length
          ? response.data.filter((item) => item.user._id !== user._id)
          : []
      );
    } else {
      setPageLevelLoader(false);
    }
  }

  async function handleUpdateOrderStatus(getItem) {
    setComponentLevelLoader({ loading: true, id: getItem._id });
    const response = await updateOrderStatus({
      ...getItem,
      isProcessing: false,
    });

    if (response.success) {
      setComponentLevelLoader({ loading: false, id: "" });

      extractAllOrdersForAdmin();
    } else {
      setComponentLevelLoader({ loading: false, id: "" });
    }
  }

  useEffect(() => {
    if (user !== null) extractAllOrdersForAdmin();
  }, [user]);

  console.log(allOrdersForAdmin);

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
        <div>
          <div className="px-4 py-6 sm:px-8 sm:py-10">
            <div className="flow-root">
              {allOrdersForAdmin && allOrdersForAdmin.length ? (
                <ul className="flex flex-col gap-4">
                  {allOrdersForAdmin.map((order) => (
                    <li
                      key={order._id}
                      className="bg-white shadow p-5 flex flex-col space-y-3 py-6 text-left"
                    >
                      <div className="flex">
                        <h1 className="font-bold text-lg text-gray-500 mb-3 flex-1">
                          Order #: {order._id}
                        </h1>
                        <div className="flex flex-col gap-2">
                          <div className="flex gap-3 items-center">
                            <p className="mr-3 text-sm font-medium text-gray-900">
                              User Name:
                            </p>
                            <p className="text-sm font-semibold text-gray-900">
                              {order?.user?.name}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <p className="mr-3 text-sm font-medium text-gray-900">
                              User Email:
                            </p>
                            <p className="text-sm font-semibold text-gray-900">
                              {order?.user?.email}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <p className="mr-3 text-sm font-medium text-gray-900">
                              Total Paid:
                            </p>
                            <p className="text-sm font-semibold text-gray-900">
                              ${order?.totalPrice}
                            </p>
                          </div>
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
                          onClick={() => handleUpdateOrderStatus(order)}
                          disabled={!order.isProcessing}
                          className="disabled:opacity-50 text-white mt-1.5 mr-5 hover:bg-gray-8 00 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide"
                        >
                          {componentLevelLoader &&
                          componentLevelLoader.loading &&
                          componentLevelLoader.id === order._id ? (
                            <ComponentLevelLoader
                              text={"Updating Status"}
                              color={"#ffffff"}
                              loading={
                                componentLevelLoader &&
                                componentLevelLoader.loading
                              }
                            />
                          ) : (
                            "Update Order Status"
                          )}
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
    </section>
  );
}
