import Cookies from "js-cookie";

export const addNewAddress = async (formData) => {
  try {
    const response = await fetch("/api/address/add-new-address", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getAllAddresses = async (id) => {
  try {
    const response = await fetch(`/api/address/get-all-address?id=${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const updateAddress = async (formData) => {
  try {
    const response = await fetch("/api/address/update-address", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    });

    const data = response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteAddress = async (id) => {
  try {
    const response = await fetch(`/api/address/delete-address?id=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    const data = response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
