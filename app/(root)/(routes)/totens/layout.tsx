import { redirect } from "next/navigation";

import getUser from "@/actions/getCurrentUser";

const MarketingLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser();

  if (user && user.role === "eventos") {
    redirect("/");
  }

  return <div>{children}</div>;
};

export default MarketingLayout;
