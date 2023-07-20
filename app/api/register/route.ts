import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, username, password, isActive, role } = body;

    if (!name) {
      return new NextResponse("Name is required");
    }
    if (!username) {
      return new NextResponse("Username is required");
    }
    if (!password) {
      return new NextResponse("Password is required");
    }
    if (!isActive) {
      return new NextResponse("isActive is required");
    }
    if (!role) {
      return new NextResponse("Role is required");
    }

    const isUser = await prismadb.user.findFirst({
      where: {
        username: username,
      },
    });
    if (isUser) {
      return NextResponse.json("Username is already exist");
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prismadb.user.create({
      data: {
        name: name,
        username: username,
        hashedPassword,
        isActive: isActive,
        role: role,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.log("[SIZES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
