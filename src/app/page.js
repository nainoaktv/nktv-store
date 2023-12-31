"use client";

import { GlobalContext } from "@/context";
import { getAllAdminProducts } from "@/services/product";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section>
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
              Anime & Fitness
            </h1>
            <p className="max-w-2xl mb-6 font-thin lg:mb-8 md:text-lg lg:text-xl">
              Step into the Anime Realm of Style: Where Fashion Meets Fantasy,
              and Every Fit Gives You That Power-Up.
            </p>
            <button
              type="button"
              onClick={() => router.push("/product/listing/all-products")}
              className="mt-1.5 inline-block bg-white hover:bg-gray-400 text-black px-5 py-3 text-xs font-medium uppercase tracking-wide"
            >
              View Collection
            </button>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img
              src="https://ae01.alicdn.com/kf/S0701469284a843599513547b698ce5acT.jpg_640x640Q90.jpg_.webp"
              alt="View Collection"
            />
          </div>
        </div>
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
            <div className="grid p-6 bg-gray-100 rounded place-content-center sm:p-8">
              <div className="max-w-md mx-auto text-center lg:text-left">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
                    Winter Sale Collection
                  </h2>
                </div>
                <button
                  onClick={() => router.push("/product/listing/all-products")}
                  className="mt-1.5 inline-block bg-black hover:bg-gray-800 text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
                >
                  Shop All
                </button>
              </div>
            </div>
            <div className="lg:col-span-2 lg:py-8">
              <ul className="grid grid-cols-2 gap-4">
                {products && products.length
                  ? products
                      .filter((item) => item.onSale === "yes")
                      .splice(0, 2)
                      .map((productItem) => (
                        <li
                          onClick={() =>
                            router.push(`/product/${productItem._id}`)
                          }
                          className="cursor-pointer"
                          key={productItem._id}
                        >
                          <div>
                            <img
                              src={productItem.imageUrl}
                              alt="Sale Product Item"
                              className="object-cover w-full rounded aspect-square"
                            />
                          </div>
                          <div className="mt-3">
                            <h3 className="font-medium">
                              {productItem.productName}
                            </h3>
                            <p className="mt-1 text-sm">
                              ${productItem.price}{" "}
                              <span>{`(-${productItem.priceDrop}%) Off`}</span>
                            </p>
                          </div>
                        </li>
                      ))
                  : null}
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
          <div className="text-center">
            <h2 className="text-xl text-white sm:text-3xl uppercase font-thin mb-4 pb-2 border-b border-white">
              Shop By Category
            </h2>
          </div>
          <ul className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <li>
              <div className="relative block group">
                <img
                  src="https://lzd-img-global.slatic.net/g/p/67de87f87faa3750f390e2bd579784d5.jpg_720x720q80.jpg"
                  className="object-cover w-full aspect-square"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-bold">KIDS</h3>
                  <button
                    onClick={() => router.push("/product/listing/kids")}
                    className="mt-1.5 inline-block bg-black hover:bg-gray-800 text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </li>
            <li>
              <div className="relative block group">
                <img
                  src="https://i.etsystatic.com/17820519/r/il/b82106/5291409104/il_570xN.5291409104_8egs.jpg"
                  className="object-cover w-full aspect-square"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-bold">WOMEN</h3>
                  <button
                    onClick={() => router.push("/product/listing/women")}
                    className="mt-1.5 inline-block bg-white hover:bg-gray-400 text-black px-5 py-3 text-xs font-medium uppercase tracking-wide"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </li>
            <li className="lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
              <div className="relative block group">
                <img
                  src="https://i.etsystatic.com/38844348/r/il/514eb8/4376443559/il_fullxfull.4376443559_fspy.jpg"
                  className="object-cover w-full aspect-square"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-black text-xl font-bold">MEN</h3>
                  <button
                    onClick={() => router.push("/product/listing/men")}
                    className="mt-1.5 inline-block bg-black hover:bg-gray-800 text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
