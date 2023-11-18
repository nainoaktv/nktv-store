import dbConnection from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    await dbConnection();

    const user = "admin";

    if (user === "admin") {
      const extractAllProducts = await Product.find({});

      if (extractAllProducts) {
        return NextResponse.json({
          success: true,
          data: extractAllProducts,
        });
      } else {
        return NextResponse.json({
          success: false,
          status: 204,
          message: "No products found.",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authorized.",
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
