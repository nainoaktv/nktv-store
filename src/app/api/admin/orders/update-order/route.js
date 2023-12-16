import dbConnection from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Order from "@/models/order";

export const dynamic = "force-dynamic";

export async function PUT(request) {
  try {
    await dbConnection();
    const isAuthUser = await AuthUser(request);
    const data = await request.json();

    if (isAuthUser?.role === "admin") {
      const {
        _id,
        shippinAddress,
        orderItems,
        paymentMethod,
        isPaid,
        paidAt,
        isProcessing,
      } = data;

      const updateOrder = await Order.findOneAndUpdate(
        { _id: _id },
        {
          shippinAddress,
          orderItems,
          paymentMethod,
          isPaid,
          paidAt,
          isProcessing,
        },
        { new: true }
      );

      if (updateOrder) {
        return NextResponse.json({
          success: true,
          message: "Order status updated successfully!",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to update Order status!",
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
      message: "Something went wrong, please try again later.",
    });
  }
}
