import prismadb from "@/lib/prismadb";
import ClientForm from "./components/client";
import { redirect } from "next/navigation";

const UserPage = async ({ params }: { params: { userId: string } }) => {
  let user = null;
  if (params.userId.length === 24) {
    user = await prismadb.user.findUnique({
      where: { id: params.userId },
    });
  } else if (params.userId !== "new") {
    return redirect("/admin");
  }
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ClientForm initialData={user} />
      </div>
    </div>
  );
};

export default UserPage;
