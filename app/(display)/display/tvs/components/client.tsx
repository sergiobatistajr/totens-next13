"use client";
import { Tv } from "@prisma/client";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
interface TvsDisplayClientProps {
  tvs: Tv[] | null;
}
export const TvsDisplayClient: React.FC<TvsDisplayClientProps> = ({ tvs }) => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center h-screen">
      <ul>
        {tvs?.map((tv) => (
          <li key={tv.id}>
            <Button
              variant="link"
              onClick={() => router.push(`/display/tvs/${tv.id}`)}
            >
              * {tv.name}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};
