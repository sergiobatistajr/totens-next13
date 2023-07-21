import { NextResponse } from "next/server";
import getUser from "@/actions/getCurrentUser";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { totenId: string } }
) {
  try {
    if (!params.totenId) {
      return new NextResponse("Toten id is required", { status: 400 });
    }

    const toten = await prismadb.toten.findUnique({
      where: {
        id: params.totenId,
      },
      include: {
        images: true,
      },
    });

    return NextResponse.json(toten);
  } catch (error) {
    console.log("[TOTEN_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { totenId: string } }
) {
  try {
    const user = await getUser();

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.totenId) {
      return new NextResponse("Toten id is required", { status: 400 });
    }

    const isUser = await prismadb.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!isUser) {
      return new NextResponse("Unauthorized", { status: 404 });
    }

    const toten = await prismadb.toten.delete({
      where: {
        id: params.totenId,
      },
    });

    return NextResponse.json(toten);
  } catch (error) {
    console.log("[TOTEN_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { totenId: string } }
) {
  try {
    const user = await getUser();

    const body = await req.json();

    const { name, images } = body;

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.totenId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("Images are required", { status: 400 });
    }

    const isUser = await prismadb.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!isUser) {
      return new NextResponse("Unauthorized", { status: 404 });
    }

    await prismadb.toten.update({
      where: {
        id: params.totenId,
      },
      data: {
        name,
        images: {
          deleteMany: {},
        },
      },
    });

    const toten = await prismadb.toten.update({
      where: {
        id: params.totenId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(toten);
  } catch (error) {
    console.log("[TOTEN_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
