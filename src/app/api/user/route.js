import connectToDb from "@/configs/db";
import UserModel from "@/models/User";
import {authUser} from "@/utils/checkCookie";

export async function POST(req) {

    try {
        await connectToDb()
        const user = await authUser();
        const body = await req.json();
        const {name, email, phone} = body;

        // Validation

        await UserModel.findOneAndUpdate(
            {_id: user._id},
            {
                $set: {
                    name,
                    email,
                    phone,
                },
            }
        );

        return Response.json(
            {message: "User updated successfully :))"},
            {status: 200}
        );

    } catch (err) {
        return Response.json({message: err.toString()}, {status: 500});
    }


}

export async function DELETE(req) {
    try {
        await connectToDb()
        const body = await req.json();
        const { id } = body;
        // Validation (You)

        await UserModel.findOneAndDelete({ _id: id });
        return Response.json({ message: "User removed successfully :))" });
    } catch (err) {
        return Response.json({ message: err }, { status: 500 });
    }
}