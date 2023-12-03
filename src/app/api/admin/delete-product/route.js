import dbConnection from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(request) {
  try {
    await dbConnection();

    const isAuthUser = await AuthUser(request);

    if (isAuthUser?.role === "admin") {
      const { searchParams } = new URL(request.url);
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
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not Authorized delete!",
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
