import dbConnection from "@/database";
import Product from "@/models/product";
import Joi from "joi";
import { NextResponse } from "next/server";

const addNewProductSchema = Joi.object({
  productName: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string().required(),
  sizes: Joi.array().required(),
  deliveryInfo: Joi.string().required(),
  onSale: Joi.string().required(),
  priceDrop: Joi.number().required(),
  imageUrl: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    await dbConnection();

    // ! User is hard-coded and will need to be changed later.
    // TODO: Change hard-coded user later.
    const user = "admin";

    if (user === "admin") {
      const extractData = await request.json();
      const {
        productName,
        description,
        price,
        category,
        sizes,
        deliveryInfo,
        onSale,
        priceDrop,
        imageUrl,
      } = extractData;

      const { error } = addNewProductSchema.validate({
        productName,
        description,
        price,
        category,
        sizes,
        deliveryInfo,
        onSale,
        priceDrop,
        imageUrl,
      });

      if (error) {
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
      }

      const newCreatedProduct = await Product.create(extractData);

      if (newCreatedProduct) {
        return NextResponse.json({
          success: true,
          message: "Product added successfully!",
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
