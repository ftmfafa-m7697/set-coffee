import BanModel from "@/models/Ban";
import connectToDb from "@/configs/db";

export async function POST(req) {
  try {
    await connectToDb()
    const body = await req.json();
    const { email, phone } = body;

    // Validation (You) ✅

    await BanModel.create({ email, phone });

    return Response.json({ message: "User banned successfully :))" });
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
