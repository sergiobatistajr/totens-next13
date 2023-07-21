import prismadb from "@/lib/prismadb";
import { TotenForm } from "./components/toten-form";
import { redirect } from "next/navigation";

const TotenPage = async ({ params }: { params: { totenId: string } }) => {
  let toten = null;
  if (params.totenId.length === 24) {
    toten = await prismadb.toten.findUnique({
      where: { id: params.totenId },
      include: {
        images: true,
      },
    });
  } else if (params.totenId !== "new") {
    return redirect("/totens");
  }
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <TotenForm initialData={toten} />
      </div>
    </div>
  );
};

export default TotenPage;
