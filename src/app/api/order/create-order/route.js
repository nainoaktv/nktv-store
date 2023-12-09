import dbConnection from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";
import Order from "@/models/order";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    await dbConnection();
    const isAuthUser = await AuthUser(request);

    if (isAuthUser) {
      const data = await request.json();
      const { user } = data;

      const saveNewOrder = await Order.create(data);

      if (saveNewOrder) {
        await Cart.deleteMany({ userID: user });

        return NextResponse.json({
          success: true,
          message: "Products are on the way!",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed to create order, please try again.",
      });
    }
  } catch (err) {
    console.log(err, "create order err");
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again later.",
    });
  }
}
