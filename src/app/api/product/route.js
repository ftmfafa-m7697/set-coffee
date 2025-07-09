import connectToDb from "@/configs/db";
import productModel from "/models/Product";

export async function POST(req) {


    try {
        await connectToDb()
        const body = await req.json();

        const {
            name, price, shortDescription, longDescription, weight,
            suitableFor, smell, tags, comment
        } = body;


        const product = await productModel.create({
            name, price, shortDescription, longDescription, weight,
            suitableFor, smell, tags, comment
        })


        return Response.json(
            {
                message: "product created successfully.",
                data: product
            },
            {status: 201},
        )

    } catch (err) {
        return Response.json(
            {message: err.toString()},
            {status: 500},
        )
    }

}


export async function GET() {

    try {
        await connectToDb()
        const products = await productModel.findOne({}, '-__v').populate("comments")
        return Response.json(products)

    } catch (err) {
        return Response.json(
            {message: err.toString()},
            {status: 500},
        )
    }

}