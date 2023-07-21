import { Tv } from "@prisma/client";

const URL = `${process.env.NEXT_PUBLIC_API}/api/tvs`;

export const getTv = async (id: string): Promise<Tv> => {
  const res = await fetch(`${URL}/${id}`);

  return res.json();
};
