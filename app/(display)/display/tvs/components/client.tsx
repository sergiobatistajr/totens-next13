"use client";
import { Tv } from "@prisma/client";
import { useRouter } from "next/navigation";
interface TvsDisplayClientProps {
  tvs: Tv[] | null;
}
export const TvsDisplayClient: React.FC<TvsDisplayClientProps> = ({ tvs }) => {
  const router = useRouter();
  return (
    <div>
      <ul>
        {tvs?.map((tv) => (
          <li key={tv.id}>
            <h3 onClick={() => router.push(`/display/tvs/${tv.id}`)}>
              * {tv.name}
            </h3>
          </li>
        ))}
      </ul>
    </div>
  );
};
