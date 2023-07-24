"use client";
import { Toten } from "@prisma/client";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
interface TotensDisplayClientProps {
  totens: Toten[] | null;
}
export const TotensDisplayClient: React.FC<TotensDisplayClientProps> = ({
  totens,
}) => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center h-screen">
      <ul>
        {totens?.map((toten) => (
          <li key={toten.id}>
            <Button
              variant="link"
              onClick={() => router.push(`/display/totens/${toten.id}`)}
            >
              * {toten.name}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};
