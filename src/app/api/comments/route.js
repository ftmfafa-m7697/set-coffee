import connectToDb from "@/configs/db";
import commentModel from "@/models/Comment";
import productModel from "@/models/Product";

export async function POST(req) {


    try {
        await connectToDb()
        const reqBody = await req.json();

        const {username, body, email, score, date, productID} = reqBody;


        const comment = await commentModel.create({
            username, body, email, score, date, productID
        })


        const updatedProduct = await productModel.findOneAndUpdate(
            {_id: productID}, {
                $push: {
                    comments: comment._id
                }
            })


        return Response.json(
            {
                message: "comment created successfully.",
                data: comment
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

        await commentModel.findOneAndUpdate({},{
            isAccept: true,
        })

        const comments = await commentModel.findOne({}, '-__v')
        return Response.json(comments)

    } catch (err) {
        return Response.json(
            {message: err.toString()},
            {status: 500},
        )
    }

}