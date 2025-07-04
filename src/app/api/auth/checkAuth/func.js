import {cookies} from "next/headers";
import {verifyAccessToken} from "@/utils/auth";
import UserModel from "@/models/User";

export const checkToken = async () => {
    const token = cookies().get("token")?.value;


    if (token) {

        try {
            const payload = await verifyAccessToken(token);

            if (!payload) {
                return Response.json({message: "Invalid token", user: null}, {status: 200});
            }

            const user = await UserModel.findOne({email: payload.email}, "-password -refreshToken -__v")

            if (!user) {
                return Response.json({message: "User not found", user: null}, {status: 200});
            }

            return Response.json({user}, {status: 200});

        } catch (err) {
            console.error("Token verification error:", err);
            return Response.json({message: "Error verifying token", user: null}, {status: 500});
        }

    } else {
        return Response.json(
            {
                data: null,
                message: "Not access !!",
            },
            {status: 401}
        );
    }
}


