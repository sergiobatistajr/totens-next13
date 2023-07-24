import prismadb from "@/lib/prismadb";

import ClientUsers from "./components/client";

const RegisterPage = async () => {
  const users = await prismadb.user.findMany();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ClientUsers data={users} />
      </div>
    </div>
  );
};

export default RegisterPage;
