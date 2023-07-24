import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import getUser from "@/actions/getCurrentUser";
import bcrypt from "bcrypt";

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const body = await req.json();

    const user = await getUser();

    const { password } = body;
    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.userId) {
      return new NextResponse("userId is required");
    }

    if (!password) {
      return new NextResponse("Password is required");
    }

    const isUser = await prismadb.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!isUser) {
      return new NextResponse("Unauthorized", { status: 404 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const resetPasswordUser = await prismadb.user.update({
      where: {
        id: params.userId,
      },
      data: {
        hashedPassword,
      },
    });
    return NextResponse.json(resetPasswordUser);
  } catch (error) {
    console.log("[RESET_PASSOWRD_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
