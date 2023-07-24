"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
interface ClientTotenProps {
  images: {
    url: string;
  }[];
}

export const ClientToten: React.FC<ClientTotenProps> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((currentImageIndex + 1) % images.length);
    }, 20000);

    return () => clearInterval(intervalId);
  }, [currentImageIndex, images.length]);

  return (
    <div>
      {images.map((image, index) => (
        <Image
          key={image.url}
          src={image.url}
          alt="image"
          fill
          className={cn(
            "transition-opacity duration-500",
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          )}
        />
      ))}
    </div>
  );
};
