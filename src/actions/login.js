"use server";

import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
import {generateAccessToken, generateRefreshToken, verifyPassword,} from "@/utils/auth";
import { cookies } from "next/headers";

export const loginAction = async (formData) => {
    try {
        await connectToDB();

        const email = formData.get("email");
        const password = formData.get("password");

        const user = await UserModel.findOne({ email });

        if (!user) {
            return {
                success: false,
                message: "کاربری با این ایمیل پیدا نشد",
            };
        }

        const isCorrectPasswordWithHash = await verifyPassword(
            password,
            user.password
        );

        if (!isCorrectPasswordWithHash) {
            return {
                success: false,
                message: "ایمیل یا پسورد اشتباه است",
            };
        }

        // ساخت توکن‌ها
        const accessToken = await generateAccessToken({ email });
        const refreshToken = await generateRefreshToken({ email });

        // ذخیره RefreshToken در دیتابیس
        await UserModel.findOneAndUpdate(
            { email },
            { $set: { refreshToken } }
        );

        // ذخیره توکن‌ها در کوکی HttpOnly
        const cookieStore = cookies();

        cookieStore.set("token", accessToken, {
            httpOnly: true,
            secure: process.env.AccessTokenPrivateKey,
            path: "/",
            maxAge: 60 * 60 * 24, // 1 روز
        });

        cookieStore.set("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.RefreshTokenPrivateKey,
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 7 روز
        });

        return {
            success: true,
            message: "با موفقیت لاگین شدید",
            user: {
                id: user._id.toString(),
                email: user.email,
                name: user.name,
            },
        };
    } catch (err) {
        return {
            success: false,
            message: err.message || "مشکل داخلی سرور",
        };
    }
};
