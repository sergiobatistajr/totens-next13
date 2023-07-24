import { redirect } from "next/navigation";

import getUser from "@/actions/getCurrentUser";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser();

  if (user && user.role !== "admin") {
    redirect("/");
  }

  return <div>{children}</div>;
};

export default AdminLayout;
