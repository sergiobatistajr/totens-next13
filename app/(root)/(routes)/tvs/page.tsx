import { TVsClient } from "./components/client";
import prismadb from "@/lib/prismadb";

const TvsPage = async () => {
  const tvs = await prismadb.tv.findMany();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <TVsClient data={tvs} />
      </div>
    </div>
  );
};

export default TvsPage;
