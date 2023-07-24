import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import getUser from "@/actions/getCurrentUser";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    if (!params.userId) {
      return new NextResponse("userId is required");
    }

    const tv = await prismadb.user.findUnique({
      where: {
        id: params.userId,
      },
    });

    return NextResponse.json(tv);
  } catch (error) {
    console.log("[REGISTER_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const user = await getUser();

    if (!params.userId) {
      return new NextResponse("userId is required");
    }

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const isUser = await prismadb.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!isUser) {
      return new NextResponse("Unauthorized", { status: 404 });
    }
    const deletedUser = await prismadb.user.delete({
      where: {
        id: params.userId,
      },
    });

    return NextResponse.json(deletedUser);
  } catch (error) {
    console.log("[REGISTER_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const body = await req.json();

    const user = await getUser();

    const { name, username, isActive, role } = body;

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.userId) {
      return new NextResponse("userId is required");
    }

    if (!name) {
      return new NextResponse("Name is required");
    }
    if (!username) {
      return new NextResponse("Username is required");
    }

    if (!role) {
      return new NextResponse("Role is required");
    }

    const isUser = await prismadb.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!isUser) {
      return new NextResponse("Unauthorized", { status: 404 });
    }

    const updatedUser = await prismadb.user.update({
      where: {
        id: params.userId,
      },
      data: {
        name,
        username,
        isActive,
        role,
      },
    });
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log("[USER_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
