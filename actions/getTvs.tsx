import { Tv } from "@prisma/client";

const URL = `${process.env.NEXT_PUBLIC_API}/api/tvs`;

export const getTvs = async (): Promise<Tv[]> => {
  const res = await fetch(URL);

  return res.json();
};
