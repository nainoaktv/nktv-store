import Cookies from "js-cookie";

export const addNewProduct = async (formData) => {
  try {
    const response = await fetch("/api/admin/add-product", {
      method: "POST",
      headers: {
        "content-type": "application/json",
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

export const getAllAdminProducts = async () => {
  try {
    const response = await fetch(
      "http://localhost:3000/api/admin/all-products",
      {
        method: "GET",
        cache: "no-cache",
      }
    );

    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const updateProduct = async (formData) => {
  try {
    const response = await fetch("/api/admin/update-product", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
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

export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`/api/admin/delete-product?id=${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
