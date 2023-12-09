import dbConnection from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Order from "@/models/order";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    await dbConnection();
    const isAuthUser = await AuthUser(request);

    if (isAuthUser) {
      const { searchParams } = new URL(request.url);
      const id = searchParams.get("id");

      const extractAllOrders = await Order.find({ user: id }).populate(
        "orderItems.product"
      );

      if (extractAllOrders) {
        return NextResponse.json({
          success: true,
          data: extractAllOrders,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to get all orders, please try again.",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authenticated.",
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
