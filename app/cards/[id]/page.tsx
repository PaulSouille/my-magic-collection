"use client";
import useCards from "@/app/hooks/useCards";
import { Image } from "@nextui-org/image";
import Link from "next/link";
import { useParams } from "next/navigation";

const CardDetail = () => {
  const { id }: { id: string } = useParams();
  const page = 1;
  const pageSize = 20;

  const { data, loading } = useCards(id, page, pageSize);
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className=" grid gap-16 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {data!.cards.map((card) => (
        <div key={card.id}>
          <Link href={`/cards/${card.id}`}>
            <Image
              isZoomed
              width={300}
              alt={`${card.name}'s image`}
              src={`data:image/png;base64,${card.smallImage}`}
            />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CardDetail;
