"use client";

import { GlobalContext } from "@/context";
import { getAllAdminProducts } from "@/services/product";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

// TODO: Add source image URL

export default function Home() {
  const { isAuthUser } = useContext(GlobalContext);

  const [products, setProducts] = useState([]);

  const router = useRouter();

  async function getListOfProducts() {
    const response = await getAllAdminProducts();

    if (response.success) {
      setProducts(response.data);
    }
  }

  useEffect(() => {
    getListOfProducts();
  }, []);

  console.log(products);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section>
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
              Anime & Fitness
            </h1>
            <p className="max-w-2xl mb-6 font-light lg:mb-8 md:text-lg lg:text-xl">
              Step into the Anime Realm of Style: Where Fashion Meets Fantasy,
              and Every Fit Gives You That Power-Up.
            </p>
            <button
              type="button"
              onClick={() => router.push("/product/listing/all-products")}
              className="mt-1.5 inline-block bg-white text-black px-5 py-3 text-xs font-medium uppercase tracking-wide"
            >
              View Collection
            </button>
            <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
              {/* ADD IMAGE SOURCE */}
              <img alt="View Collection" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
