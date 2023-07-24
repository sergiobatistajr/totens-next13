"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";

import MainNav from "@/components/main-nav";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";

interface NavbarProps {
  user: User;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const formattedRoutes = [];

  if (user.role === "marketing" || user.role === "admin") {
    formattedRoutes.push({
      href: "/totens",
      name: "Totens",
    });
  }
  if (user.role === "eventos" || user.role === "admin") {
    formattedRoutes.push({
      href: "/tvs",
      name: "TVs",
    });
  }
  if (user.role === "admin") {
    formattedRoutes.push({
      href: "/admin",
      name: "Sistema",
    });
  }

  return (
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
            <p className="font-bold text-xl">AR Hoteis</p>
          </Link>
          <MainNav data={formattedRoutes} />
          <Button variant="ghost" onClick={() => signOut()}>
            Sair
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
