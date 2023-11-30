import dbConnection from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    await dbConnection();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const getData = await Product.find({ category: id });

    if (getData) {
      return NextResponse.json({
        success: true,
        data: getData,
      });
    } else {
      return NextResponse.json({
        success: false,
        status: 204,
        message: "No Products found...",
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
