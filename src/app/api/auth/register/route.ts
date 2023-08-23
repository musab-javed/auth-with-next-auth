import { findOne, writeDB, UniqueID } from "@/helpers/dbHelper";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { whereT, User } from "@/types/user";

export const POST = async (request: NextRequest) => {
  try {
    let { name, email, password } = await request.json();
    let salt: string = bcryptjs.genSaltSync(10);
    let passwordHash: string = bcryptjs.hashSync(password, salt);
    let user: User | undefined = findOne({ email } as whereT);
    if (user) {
      return new NextResponse(
        "You already have an account associated with this email",
        { status: 409 }
      );
    }
    let newUser: User = {
      _id: UniqueID(),
      name,
      email,
      password: passwordHash,
      isBlocked: false,
    };
    writeDB(newUser);
    return NextResponse.json({ message: "success" }, { status: 201 });
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
