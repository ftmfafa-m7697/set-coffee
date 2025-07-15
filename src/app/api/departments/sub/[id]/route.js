import connectToDB from "@/configs/db";
import {isValidObjectId} from "mongoose";
import subDepartmentModel from "@/models/SubDepartment";

export async function GET(req, {params}) {
    try {
        await connectToDB();
        const id = await params.id

        if (!isValidObjectId(id)) {
            return Response.json({message: "ID is not valid !!"}, {status: 422});
        }

        const subDepartments = await subDepartmentModel.find({department: id});

        return Response.json(subDepartments, {status: 200});

    } catch (err) {
        return Response.json({message: err.toString()}, {status: 500});
    }
}
