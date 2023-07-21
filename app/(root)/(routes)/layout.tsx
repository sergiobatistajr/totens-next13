import { redirect } from "next/navigation";

import getUser from "@/actions/getCurrentUser";

const LayoutRoutes = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser();
  if (!user) {
    redirect("/");
  }
  return <div>{children}</div>;
};

export default LayoutRoutes;
