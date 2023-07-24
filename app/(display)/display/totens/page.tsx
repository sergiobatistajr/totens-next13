import { getTotens } from "@/actions/getTotens";
import { TotensDisplayClient } from "./components/client";
export const revalidate = 0;
const TotensPage = async () => {
  const totens = await getTotens();
  return <TotensDisplayClient totens={totens} />;
};

export default TotensPage;
