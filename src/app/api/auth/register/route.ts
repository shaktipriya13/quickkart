import { NextRequest, NextResponse } from "next/server.js";
import connectDB from "../../../../lib/db.js";
import User from "../../../../models/user.model.js";

export async function POST(req: NextRequest) {
  try {
    await connectDB(); //this fxn has to be called inside every api to connect to the db
    const { name, email, password } = await req.json();
    const existUser = await User.findOne({ email });
    if (existUser) {
      return NextResponse.json(
        { message: "email already exists!" },
        { status: 400 }
      );
    }
    if (password.length < 6) {
      return NextResponse.json(
        {
          message: "password must atleast be 6 characters long.",
        },
        { status: 400 }
      );
    }
    const hashedPassword=await bcrypt.hash()
  } catch (err) {}
}
