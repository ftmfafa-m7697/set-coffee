import connectToDB from "@/configs/db";
import SubDepartmentModel from "@/models/SubDepartment";

export async function POST(req) {
  try {
    await connectToDB();
    const body = await req.json();
    const { title, department } = body;

    // Valid Title ✅

    await SubDepartmentModel.create({ title, department });

    return Response.json(
      { message: "SubDepartment created successfully :))" },
      { status: 200 }
    );
  } catch (err) {
    return Response.json({ message: err.toString() }, { status: 500 });
  }
}
