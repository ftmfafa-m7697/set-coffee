import connectToDb from "@/configs/db";
import { authUser } from "@/utils/checkCookie";
import wishlistModel from "@/models/Wishlist";

export async function DELETE(req, { params }) {
    try {
        await connectToDb();
        const user = await authUser();

        if (!user) {
            return Response.json(
                { message: "لطفا اول لاگین کنید" },
                { status: 401 }
            );
        }

        const productID =await params.id;

        await wishlistModel.findOneAndDelete({
            user: user._id,
            product: productID
        });

        return Response.json({ message: "محصول با موفقیت حذف شد" });

    } catch (error) {
        return Response.json(
            { message: error.toString() },
            { status: 500 }
        );
    }
}
