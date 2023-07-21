import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import getUser from "@/actions/getCurrentUser";
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const user = await getUser();

    const { name, imageUrl } = body;
    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required");
    }
    if (!imageUrl) {
      return new NextResponse("imageUrl is required");
    }

    const isUser = await prismadb.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!isUser) {
      return new NextResponse("Unauthorized", { status: 404 });
    }

    const tv = await prismadb.tv.create({
      data: {
        name,
        imageUrl,
        userId: user.id,
      },
    });

    return NextResponse.json(tv);
  } catch (error) {
    console.log("[TV_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const tv = await prismadb.tv.findMany();

    return NextResponse.json(tv);
  } catch (error) {
    console.log("[TV_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
