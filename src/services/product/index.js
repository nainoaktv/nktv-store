import Cookies from "js-cookie";

export const addNewProduct = async (formData) => {
  try {
    const response = await fetch("/api/admin-view/add-product", {
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
