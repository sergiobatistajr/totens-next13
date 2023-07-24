import { getToten } from "@/actions/getToten";

import { ClientToten } from "./components/client";
export const revalidate = 0;
const TotenPage = async ({
  params,
}: {
  params: {
    totenId: string;
  };
}) => {
  const toten = await getToten(params.totenId);
  return <ClientToten images={toten.images} />;
};

export default TotenPage;
