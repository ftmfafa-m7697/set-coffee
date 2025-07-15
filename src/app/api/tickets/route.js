import connectToDb from "@/configs/db";
import {authUser} from "@/utils/checkCookie";
import ticketModel from "@/models/Ticket";

export async function POST(req) {

    try {
        await connectToDb()
        const user = await authUser()
        const reqBody = await req.json();
        const {title, body, department, subDepartment, priority} = reqBody;

        //VALIDATION

        await ticketModel.create({
            title,
            body,
            department,
            subDepartment,
            priority,
            user: user._id,
        })

        return Response.json(
            {message: "ticket saved successfully"},
            {status: 201}
        )

    } catch (err) {
        return Response.json({MESSAGE: err.toString()}, {status: 500})
    }

}