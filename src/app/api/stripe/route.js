import AuthUser from "@/middleware/AuthUser";
import { NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const isAuthUser = await AuthUser(request);
    if (isAuthUser) {
      const response = await request.json();

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: response,
        mode: "payment",
        success_url: "http://localhost:3000/checkout" + "?status=success",
        cancel_url: "http://localhost:3000/checkout" + "?status=cancel",
      });

      return NextResponse.json({
        success: true,
        id: session.id,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authenticated!",
      });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Something went wrong! Please try again later.",
    });
  }
}
