import wishlistModel from "@/models/Wishlist";
import connectToDb from "@/configs/db";


export async function POST(req) {


    try {

        await connectToDb()
        const body = await req.json();

        const {user, product} = body;

        const wish = await wishlistModel.findOne({user, product})

        if (!wish) {
            await wishlistModel.create({user, product})
        }

        return Response.json(
            {message: "Wishlist created successfully."},
            {status: 201}
        );

    } catch (err) {
        return Response.json(
            {massage: err.toString()},
            {status: 500}
        );
    }

}


export async function GET() {


    try {
        await connectToDb()
        const wishlist = await wishlistModel.findOne({}, '-__v')
        return Response.json(
            {wishlist}
        );

    } catch (err) {
        return Response.json(
            {massage: err.toString()},
            {status: 500}
        );
    }

}


