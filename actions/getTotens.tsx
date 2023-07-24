import { Toten } from "@prisma/client";

const URL = `${process.env.NEXT_PUBLIC_API}/api/totens`;

export const getTotens = async (): Promise<Toten[]> => {
  const res = await fetch(URL);

  return res.json();
};
