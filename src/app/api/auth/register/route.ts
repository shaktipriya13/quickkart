import { NextRequest, NextResponse } from "next/server.js";
import connectDB from "../../../../lib/db";
import User from "../../../../models/user.model";
import bcrypt from "bcryptjs";

// api to create/register user
export async function POST(req: NextRequest) {
  try {
    await connectDB(); //this fxn has to be called inside every api to connect to the db
    const { name, email, mobile, password } = await req.json();
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
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      mobile,
      password: hashedPassword,
    });
    return NextResponse.json(
      {
        message: `User created successfully.`,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          mobile: user.mobile,
          password: user.password,
        },
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: `registration error: ${err}` },
      {
        status: 500, //since internal server error
      }
    );
  }
}
