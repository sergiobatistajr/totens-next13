"use client";
import { Toten } from "@prisma/client";
import { useRouter } from "next/navigation";
interface TotensDisplayClientProps {
  totens: Toten[] | null;
}
export const TotensDisplayClient: React.FC<TotensDisplayClientProps> = ({
  totens,
}) => {
  const router = useRouter();
  return (
    <div>
      <ul>
        {totens?.map((toten) => (
          <li key={toten.id}>
            <h3 onClick={() => router.push(`/display/totens/${toten.id}`)}>
              * {toten.name}
            </h3>
          </li>
        ))}
      </ul>
    </div>
  );
};
