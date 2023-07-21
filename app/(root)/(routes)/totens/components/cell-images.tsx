"use client";

import Image from "next/image";

import { TotenColumn } from "./columns";

interface CellImagesProps {
  data: TotenColumn;
}
export const CellImages: React.FC<CellImagesProps> = ({ data }) => {
  return (
    <div className="flex flex-row space-x-2">
      {data.images.map((image, index) => (
        <Image
          key={index}
          src={image}
          alt={data.name}
          width={100}
          height={100}
          layout="fixed"
        />
      ))}
    </div>
  );
};
