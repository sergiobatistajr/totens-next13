import { Toten, Image } from "@prisma/client";

const URL = `${process.env.NEXT_PUBLIC_API}/api/totens`;

export const getToten = async (
  id: string
): Promise<
  Toten & {
    images: Image[];
  }
> => {
  const res = await fetch(`${URL}/${id}`);

  return res.json();
};
