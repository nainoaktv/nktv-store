"use client";

import { usePathname } from "next/navigation";

export default function ProductButton() {
  const pathName = usePathname();

  const isAdminView = pathName.includes("admin-view");

  return isAdminView ? (
    <>
      <button className="flex mt-1.5 justify-center px-5 py-3 bg-black text-xs font-medium uppercase text-white tracking-wide">
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
