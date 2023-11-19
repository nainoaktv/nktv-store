"use client";

import { GlobalContext } from "@/context";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";

export default function ProductButton({ item }) {
  const { setCurrentUpdatedProduct } = useContext(GlobalContext);

  const pathName = usePathname();
  const router = useRouter();

  const isAdminView = pathName.includes("admin-view");

  return isAdminView ? (
    <>
      <button
        className="flex mt-1.5 justify-center px-5 py-3 bg-black text-xs font-medium uppercase text-white tracking-wide"
        onClick={() => {
          setCurrentUpdatedProduct(item);
          router.push("/admin-view/add-product");
        }}
      >
        Update
      </button>
      <button className="flex mt-1.5 justify-center px-5 py-3 bg-black text-xs font-medium uppercase text-white tracking-wide">
        Delete
      </button>
    </>
  ) : (
    <>
      <button className="flex mt-1.5 justify-center px-5 py-3 bg-black text-xs font-medium uppercase text-white tracking-wide">
        Add to Cart
      </button>
    </>
  );
}
