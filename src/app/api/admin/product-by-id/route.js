import dbConnection from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    await dbConnection();
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("id");

    if (!productId) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: "Product ID is required",
      });
    }

    const getData = await Product.find({ _id: productId });

    if (getData && getData.length) {
      return NextResponse.json({
        success: true,
        data: getData[0],
      });
    } else {
      return NextResponse.json({
        success: false,
        status: 204,
        message: "No product found!",
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
