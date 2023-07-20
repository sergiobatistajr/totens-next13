import Link from "next/link";

import MainNav from "@/components/main-nav";
import Container from "@/components/ui/container";

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
  ];

  return (
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
            <p className="font-bold text-xl">AR Hoteis</p>
          </Link>
          <MainNav data={formattedLinks} />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
