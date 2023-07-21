import prismadb from "@/lib/prismadb";
import TvForm from "./components/tv-form";
import { redirect } from "next/navigation";

const TvPage = async ({ params }: { params: { tvId: string } }) => {
  let tv = null;
  if (params.tvId.length === 24) {
    tv = await prismadb.tv.findUnique({
      where: { id: params.tvId },
    });
  } else if (params.tvId !== "new") {
    return redirect("/tvs");
  }
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <TvForm initialData={tv} />
      </div>
    </div>
  );
};

export default TvPage;
