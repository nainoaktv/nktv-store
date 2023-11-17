"use client";

import ProductButton from "./ProductButtons";
import ProductTile from "./ProductTile";

const dummyData = [
  {
    _id: "6554678ab7697b249adba243",
    productName: "Women's Sports Bra and Shorts",
    description: "Blue training top and matching bottom.",
    price: 120,
    category: "women",
    sizes: [
      {
        id: "s",
        label: "S",
      },
    ],
    deliveryInfo: "Free Delivery",
    onSale: "yes",
    priceDrop: 10,
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/nktv-store.appspot.com/o/nktv-store%2FwomensBlueGymFit.jpg-1700029623877-gxrdfstifb?alt=media&token=10c67c2e-10bb-491b-a102-c0802a512ddd",
  },
];

export default function CommonListing() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-16">
          {dummyData && dummyData.length
            ? dummyData.map((item) => (
                <article key={item._id}>
                  <ProductTile item={item} />
                  <ProductButton item={item} />
                </article>
              ))
            : null}
        </div>
      </div>
    </section>
  );
}
