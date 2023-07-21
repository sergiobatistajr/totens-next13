import prismadb from "@/lib/prismadb";
import Register from "./components/register-form";
import { redirect } from "next/navigation";

const UserPage = async ({ params }: { params: { userId: string } }) => {
  try {
    if (params.userId === "new") {
      return <Register initialData={null} />;
    }
    const user = await prismadb.user.findUnique({
      where: {
        id: params.userId,
      },
    });
    return <Register initialData={user} />;
  } catch {
    redirect("/");
  }
};

export default UserPage;
