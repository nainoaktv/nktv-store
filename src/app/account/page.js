"use client";

import InputComponent from "@/components/FormElements/InputComponent";
import Notification from "@/components/Notification";
import { GlobalContext } from "@/context";
import { addNewAddress } from "@/services/address";
import { addNewAddressFormControls } from "@/utils";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

// TODO: Render random user image. Line 11.

export default function Account() {
  const { user, addresses, setAddresses, addressFormData, setAddressFormData } =
    useContext(GlobalContext);

  const [showAddressForm, setShowAddressForm] = useState(false);

  async function handleAddOrUpdateAddress() {
    const response = await addNewAddress({
      ...addressFormData,
      userID: user?._id,
    });

    console.log(response);

    if (response.success) {
      toast.success(response.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setAddressFormData({
        fullName: "",
        city: "",
        country: "",
        postalCode: "",
        address: "",
      });
    } else {
      toast.error(response.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setAddressFormData({
        fullName: "",
        city: "",
        country: "",
        postalCode: "",
        address: "",
      });
    }
  }

  return (
    <section>
      <div className="mx-auto bg-gray-100 px-4 sm:px-6 lg:px-8 text-black">
        <div className="bg-white shadow">
          <div className="p-6 sm:p-12">
            <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
              {/* TODO: Render random user image here */}
            </div>
            <div className="flex flex-col flex-1">
              <h4 className="text-lg font-semibold text-center md:text-left">
                {user?.name}
              </h4>
              <p>{user?.email}</p>
              <p>{user?.role}</p>
            </div>
            <button className="text-white mt-1.5 hover:bg-gray-800 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide">
              View Your Orders
            </button>
            <div className="mt-6">
              <h1 className="font-bold uppercase tracking-wide">
                Your Addresses:
              </h1>
              <div className="mt-4">
                {addresses && addresses.length ? (
                  addresses.map((item) => (
                    <div className="border p-6" key={item._id}>
                      <p>Name: {item.fullName}</p>
                      <p>Address: {item.address}</p>
                      <p>City: {item.city}</p>
                      <p>Country: {item.country}</p>
                      <p>Postal Code: {item.postalCode}</p>
                      <button className="text-white mt-1.5 hover:bg-gray-800 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide">
                        Update
                      </button>
                      <button className="text-white mt-1.5 hover:bg-gray-800 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide">
                        Delete
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No addresses found. Please add a new address below.</p>
                )}
              </div>
            </div>
            <div className="mt-4">
              <button
                onClick={() => setShowAddressForm(!showAddressForm)}
                className="text-white mt-5 hover:bg-gray-800 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide"
              >
                {showAddressForm ? "Hide Address Form" : "Add New Address"}
              </button>
            </div>
            {showAddressForm ? (
              <div className="flex flex-col mt-5 justify-center pt-4 items-center">
                <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-8">
                  {addNewAddressFormControls.map((controlItem) => (
                    <InputComponent
                      type={controlItem.type}
                      placeholder={controlItem.placeholder}
                      label={controlItem.label}
                      value={addressFormData[controlItem.id]}
                      onChange={(e) =>
                        setAddressFormData({
                          ...addressFormData,
                          [controlItem.id]: e.target.value,
                        })
                      }
                    />
                  ))}
                </div>
                <button
                  onClick={handleAddOrUpdateAddress}
                  className="text-white mt-5 hover:bg-gray-800 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide"
                >
                  Save
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <Notification />
    </section>
  );
}
