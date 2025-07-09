import {
    generateAccessToken, generateRefreshToken,
    validateEmail, validatePassword,
    verifyPassword
} from "@/utils/auth";
import UserModel from "/models/User";
import connectToDb from "@/configs/db";
import {cookies} from "next/headers";


export async function POST(req) {

    await connectToDb();

    try {
        const body = await req.json();
        const {email, password} = body;

        // Validation
        const isValidEmail = validateEmail(email);
        const isValidPassword = validatePassword(password);

        if (!isValidEmail || !isValidPassword) {
            return Response.json(
                {message: "email or password is invalid"},
                {status: 419}
            );
        }

        const user = await UserModel.findOne({email});

        if (!user) {
            return Response.json({message: "User not found"}, {status: 422});
        }

        const isCorrectPasswordWithHash = verifyPassword(password, user.password);

        if (!isCorrectPasswordWithHash) {
            return Response.json(
                {message: "Email or password is not correct"},
                {status: 401}
            );
        }

        const accessToken = await generateAccessToken({email});
        const refreshToken = await generateRefreshToken({email});
        //حتما از await استفاده شود در غیراینصورت 500

        await UserModel.findOneAndUpdate(
            {email},
            {
                $set: {
                    refreshToken,
                },
            }
        );

        const cookieStore = cookies();
        cookieStore.set("token", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 7 روز
        });


        return Response.json(
            {message: "User logged in successfully :))"},
            {
                status: 200,
                headers: {
                    "Set-Cookie": `token=${accessToken};path=/;httpOnly=true;`,
                },
            }
        )
    } catch (err) {

        return Response.json(
            {message: err},
            {
                status: 500,
            }
        );
    }
}
