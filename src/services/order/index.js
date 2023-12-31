import Cookies from "js-cookie";

export const createNewOrder = async (formData) => {
  try {
    const response = await fetch("/api/order/create-order", {
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

export const getAllOrdersForUser = async (id) => {
  try {
    const response = await fetch(`/api/order/get-all-orders?id=${id}`, {
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

export const getOrderDetails = async (id) => {
  try {
    const response = await fetch(`/api/order/order-details?id=${id}`, {
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

export const getAllOrdersForAdmin = async () => {
  try {
    const response = await fetch(`/api/admin/orders/get-all-orders`, {
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

export const updateOrderStatus = async (formData) => {
  try {
    const response = await fetch(`/api/admin/orders/update-order`, {
      method: "PUT",
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
