import dbConnection from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Address from "@/models/address";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    await dbConnection();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({
        success: false,
        message: "You are not logged in.",
      });
    }

    const isAuthUser = await AuthUser(request);

    if (isAuthUser) {
      const getAllAddresses = await Address.find({ userID: id });

      if (getAllAddresses) {
        return NextResponse.json({
          success: true,
          data: getAllAddresses,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to get addresses, please try again.",
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
