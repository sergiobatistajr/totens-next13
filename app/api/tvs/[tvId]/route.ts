import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import getUser from "@/actions/getCurrentUser";

export async function GET(
  req: Request,
  { params }: { params: { tvId: string } }
) {
  try {
    if (!params.tvId) {
      return new NextResponse("tvId is required");
    }

    const tv = await prismadb.tv.findUnique({
      where: {
        id: params.tvId,
      },
    });

    return NextResponse.json(tv);
  } catch (error) {
    console.log("[TV_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { tvId: string } }
) {
  try {
    const user = await getUser();

    if (!params.tvId) {
      return new NextResponse("tvId is required");
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
    const tv = await prismadb.tv.delete({
      where: {
        id: params.tvId,
      },
    });

    return NextResponse.json(tv);
  } catch (error) {
    console.log("[TV_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { tvId: string } }
) {
  try {
    const body = await req.json();

    const user = await getUser();

    const { name, imageUrl } = body;
    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.tvId) {
      return new NextResponse("tvId is required");
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

    const tv = await prismadb.tv.update({
      where: {
        id: params.tvId,
      },
      data: {
        name,
        imageUrl,
      },
    });
    return NextResponse.json(tv);
  } catch (error) {
    console.log("[TV_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
