import { getTvs } from "@/actions/getTvs";
import { TvsDisplayClient } from "./components/client";

export const revalidate = 0;

const TvsPage = async () => {
  const tvs = await getTvs();
  return <TvsDisplayClient tvs={tvs} />;
};

export default TvsPage;
