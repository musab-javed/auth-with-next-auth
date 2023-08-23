import { NextRequest, NextResponse } from "next/server";
import { findOne } from "@/helpers/dbHelper";
import bcryptjs from "bcryptjs";
import { User } from "@/types/user";

export const POST = async (request: NextRequest) => {
  try {
    let body = await request.json();
    let { email, password } = body;
    let user: User | undefined = findOne({ email });
    if (!user) {
      return new NextResponse("User is not registered", { status: 400 });
    }
    if (user.isBlocked) {
      return new NextResponse("User is blocked", { status: 400 });
    }
    const passwordMatch = bcryptjs.compareSync(password, user.password);
    if (!passwordMatch) {
      return new NextResponse("User is blocked", { status: 400 });
    }
    const { password: passwordHash, ...updatedUser } = user;
    return NextResponse.json(updatedUser);
  } catch (error: any) {
    return NextResponse.error();
  }
};
