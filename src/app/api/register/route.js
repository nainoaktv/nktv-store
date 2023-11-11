import dbConnection from "@/database";
import User from "@/models/user";
import Joi from "joi";
import { NextResponse } from "next/server";

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  await dbConnection();

  const { name, email, password, role } = await req.json();

  const { error } = schema.validate({ name, email, password, role });

  if (error) {
    return NextResponse.json({
      success: false,
      message: email.details[0],
    });
  }

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return NextResponse.json({
        success: false,
        message: "User already exists! Please use another email.",
      });
    } else {
      const hashPassword = await hash(password, 12);

      const newCreatedUser = await User.create({
        name,
        email,
        password: hashPassword,
        role,
      });
      if (newCreatedUser) {
        return NextResponse.json({
          success: true,
          message: "Account Created Successfully!",
        });
      }
    }
  } catch (error) {
    console.error("Error in new user registration");
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again later.",
    });
  }
}
