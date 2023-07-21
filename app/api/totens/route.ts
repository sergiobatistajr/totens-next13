import { NextResponse } from "next/server";

import getUser from "@/actions/getCurrentUser";

import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const user = await getUser();

    const body = await req.json();

    const { name, images } = body;

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!images) {
      return new NextResponse("Images is required", { status: 400 });
    }

    const isUser = await prismadb.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!isUser) {
      return new NextResponse("Unauthorized", { status: 404 });
    }

    const toten = await prismadb.toten.create({
      data: {
        name,
        userId: user.id,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(toten);
  } catch (error) {
    console.log("[TOTEN_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const totens = await prismadb.toten.findMany({
      include: {
        images: true,
      },
    });

    return NextResponse.json(totens);
  } catch (error) {
    console.log("[TOTENS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
