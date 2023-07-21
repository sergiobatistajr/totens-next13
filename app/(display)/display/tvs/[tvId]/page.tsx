import { getTv } from "@/actions/getTv";
import Image from "next/image";

export const revalidate = 0;

const TvPage = async ({
  params,
}: {
  params: {
    tvId: string;
  };
}) => {
  const tv = await getTv(params.tvId);
  return <Image fill src={tv.imageUrl} alt={tv.name} />;
};
export default TvPage;
