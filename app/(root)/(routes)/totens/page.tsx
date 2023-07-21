import prismadb from "@/lib/prismadb";

import { TotenClient } from "./components/client";

const ProductsPage = async () => {
  const toten = await prismadb.toten.findMany({
    include: {
      images: true,
    },
  });

  const formattedToten = toten.map((toten) => ({
    id: toten.id,
    name: toten.name,
    images: toten.images.map((image) => image.url),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <TotenClient data={formattedToten} />
      </div>
    </div>
  );
};

export default ProductsPage;
