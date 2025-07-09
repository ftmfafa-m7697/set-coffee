import connectToDb from "@/configs/db";
import userModel from "/models/User"
import {generateAccessToken, hashPassword} from "@/utils/auth";
import {roles} from "@/utils/constants";


export async function POST(req) {

    await connectToDb();

    const body = await req.json()

    const {name, phone, email, password} = body


    //validation


    // const isUserExist = await userModel.findOne({
    //     $or: [{name}, {phone},{email}],
    // })
    //
    // console.log(isUserExist)
    //
    // if (isUserExist) {
    //     return Response.json(
    //     {message: "Username or password already exists !!" },
    //     {status: 422})
    //
    // }

//برای ثبت نام های دیگر مشکل درست میکند زیرا ایمیل اختیاری و وارد نکردنش اندیفایند برمیگرداند

    const authConditions = [];

    if (name !== undefined) authConditions.push({name});
    if (phone !== undefined) authConditions.push({phone});
    if (email !== undefined) authConditions.push({email});

    if (authConditions.length > 0) {

        const isUserExist = await userModel.findOne({$or: authConditions});

        if (isUserExist) {
            return Response.json(
                {message: "Username or password already exists !!"},
                {status: 422});
        }
    }

// ai way


    const hashedPassword = await hashPassword(password)
    const accessToken = generateAccessToken({name})

    const users = await userModel.find({});

    await userModel.create({
        name,
        phone,
        email,
        password: hashedPassword,
        role: users.length > 0 ? roles.USER : roles.ADMIN
    })

    return Response.json(
        {
            message: "User successfully registered. :) "
        },
        {
            status: 201,
            headers: {
                "Set-Cookie": `token=${accessToken}; path=/; httpOnly=true`
            }
        }
    )

}





