"use client";

export default function ProductTile({ item }) {
  return (
    <div>
      <div className="overflow-hidden aspect-w-1 aspect-h-1 h-52">
        <img
          src={item.imageUrl}
          alt="Product Image"
          className="h-full w-full object-cover transition-all duration-300 group-hover:scale-125"
        />
      </div>
      {item.onSale === "yes" ? (
        <div className="absolute top-0 m-2 rounded-full bg-black">
          <p className="rounded-full p-1 text-[8px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">
            Sale
          </p>
        </div>
      ) : null}
      <div className="flex mx-auto my-4 w-10/12 flex-col items-start justify-between">
        <div className="flex mb-2">
          <p className="text-sm text-black mr-3 font-semibold">{`$${item.price}`}</p>
        </div>
        <h3 className="md-2 text-gray-500 text-sm">{item.productName}</h3>
      </div>
    </div>
  );
}
