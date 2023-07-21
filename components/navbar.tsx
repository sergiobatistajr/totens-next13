"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";
import MainNav from "@/components/main-nav";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";

const Navbar = async () => {
  const formattedLinks = [
    {
      href: "/totens",
      name: "Totens",
    },
    {
      href: "/tvs",
      name: "TVs",
    },
    {
      href: "/admin",
      name: "Sistema",
    },
  ];

  return (
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
            <p className="font-bold text-xl">AR Hoteis</p>
          </Link>
          <MainNav data={formattedLinks} />
          <Button variant="ghost" onClick={() => signOut()}>
            Sair
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
