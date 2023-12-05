import dbConnection from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    await dbConnection();

    const isAuthUser = await AuthUser(request);

    if (isAuthUser) {
      const { searchParams } = new URL(request.url);
      const id = searchParams.get("id");

      if (!id) {
        return NextResponse.json({
          success: false,
          message: "Please Login",
        });
      }

      const extractAllCartItems = await Cart.find({ userID: id }).populate(
        "productID"
      );

      if (extractAllCartItems)
        return NextResponse.json({
          success: true,
          data: extractAllCartItems,
        });
    } else {
      return NextResponse.json({
        success: false,
        message: "No cart items found!",
        status: 204,
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
