"use client";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

const ClientUsers = () => {
  const router = useRouter();
  return (
    <div>
      <Button onClick={() => router.push("register/new")}>Novo usuario</Button>
      <p>list users</p>
    </div>
  );
};

export default ClientUsers;
