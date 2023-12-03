import dbConnection from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";

export const dynamic = "force-dynamic";

export async function DELETE(request) {
  try {
    await dbConnection();
    const isAuthUser = await AuthUser(request);

    if (isAuthUser) {
      const { searchParams } = new URL(request.url);
      const id = searchParams.get("id");

      if (!id) {
        return NextResponse.json({
          success: false,
          message: "Cart Item ID is required.",
        });
      }

      const deleteCartItem = await Cart.findByIdAndDelete(id);

      if (deleteCartItem) {
        return NextResponse.json({
          success: true,
          message: "Product removed from cart.",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to remove ffrom cart!",
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
