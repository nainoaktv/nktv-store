import dbConnection from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(request) {
  try {
    await dbConnection();

    const extractData = await request.json();

    const {
      _id,
      productName,
      price,
      description,
      category,
      sizes,
      deliveryInfo,
      priceDrop,
      onSale,
      imageUrl,
    } = extractData;

    const updatedProduct = await Product.findOneAndUpdate(
      {
        _id: _id,
      },
      {
        productName,
        price,
        description,
        category,
        sizes,
        deliveryInfo,
        priceDrop,
        onSale,
        imageUrl,
      },
      { new: true }
    );

    if (updatedProduct) {
      return NextResponse.json({
        success: true,
        message: "Product updated successfully!",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed to update product, please try again later.",
      });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again later.",
    });
  }
}
