import mongoose from "mongoose";
import connectToDb from "@/configs/db";
import {cookies} from "next/headers";
import UserModel from "@/models/User";
import {verify} from "jsonwebtoken";
import {generateAccessToken} from "@/utils/auth";

export async function post(req) {

    try {
        await connectToDb()
        const refreshToken = cookies().get("refresh-token").value

        if (!refreshToken) {
            return Response.json({message: "no have refresh Token :/"}, {status: 401});
        }

        const user = await UserModel.findOne({refreshToken});

        if (!user) {
            return Response.json({message: "no have refresh Token :/"}, {status: 401});
        }

        verify(refreshToken, process.env.RefreshTokenPrivateKey)
        const newAccessToken = await generateAccessToken({email: user.email});

        return Response.json(
            {message: "new access token generated successfully :))"},
            {status: 200}, {
                headers: {
                    "Set-Cookie": `token=${newAccessToken};path=/;httpOnly=true;`
                },
            })

    } catch (err) {
        return Response.json({message: err.message}, {status: 500});
    }

}