import dbConnection from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";
import Joi from "joi";
import { NextResponse } from "next/server";

const AddToCart = Joi.object({
  userId: Joi.string().required(),
  productId: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    await dbConnection();
    const isAuthUser = await AuthUser(request);

    if (isAuthUser) {
      const data = await request.json();
      const { productId, userId } = data;

      const { error } = AddToCart.validate({ userId, productId });

      if (error) {
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
      }

      const cartItemExists = await Cart.find({
        productId: productId,
        userId: userId,
      });

      if (cartItemExists) {
        return NextResponse.json({
          success: false,
          message: "Product already in cart.",
        });
      }

      const saveProductToCart = await Cart.create(data);

      if (saveProductToCart) {
        return NextResponse.json({
          success: true,
          message: "Product is added to cart!",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to add product, please try again.",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authenticated!",
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
