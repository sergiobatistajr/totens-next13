import { redirect } from "next/navigation";

import getUser from "@/actions/getCurrentUser";

const EventosLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser();

  if (user && user.role === "marketing") {
    redirect("/");
  }

  return <div>{children}</div>;
};

export default EventosLayout;
