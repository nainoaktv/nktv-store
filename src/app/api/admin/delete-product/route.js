import dbConnection from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(requset) {
  try {
    await dbConnection();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({
        success: false,
        message: "Product ID is required",
      });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (deletedProduct) {
      return NextResponse.json({
        success: true,
        message: "Product deleted successfully!",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed to delete product, please try again.",
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
