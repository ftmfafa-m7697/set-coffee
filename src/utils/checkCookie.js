import connectToDb from "@/configs/db";
import {cookies} from "next/headers";
import userModel from "@/models/User";
import {verifyAccessToken} from "@/utils/auth";

export const authUser = async () => {

    await connectToDb();
    const cook = await cookies();
    const token = cook.get("token");
    let user = null;

    if (token) {
        const tokenPayload = verifyAccessToken(token.value);

        if (tokenPayload) {
            user = await userModel.findOne({email: tokenPayload.email});
        }
    }

    return user
};