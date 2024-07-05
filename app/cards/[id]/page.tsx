"use client";
import SearchBar from "@/app/components/searchbar";
import useCards from "@/app/hooks/useCards";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/react";
import { Cards } from "@prisma/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

const CardDetail = () => {
  const { id }: { id: string } = useParams();
  const initialPage = 1;
  const pageSize = 20;
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(initialPage);
  const [cards, setCards] = useState<Cards[]>([]);
  const { data, loading } = useCards(id, page, pageSize);

  useEffect(() => {
    if (data && data.cards) {
      setCards((prevCards) => {
        setLoadingMore(false);
        return [...prevCards, ...data.cards];
      });
    }
  }, [data]);

  const loadMoreCards = () => {
    setLoadingMore(true);
    setPage((prevPage) => prevPage + 1);
  };

  if (loading && page === initialPage) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <SearchBar />
      <div className=" grid gap-16 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {cards.map((card) => (
          <div key={card.id}>
            <Image
              className={card.stock > 0 ? "" : styles.notInStock}
              isZoomed
              width={300}
              alt={`${card.name}'s image`}
              src={`data:image/png;base64,${card.smallImage}`}
            />
          </div>
        ))}
      </div>
      <div className="flex content-center	justify-center	mb-5 mt-5">
        <div className="flex-grow"></div>
        <div>
          <Button
            onPress={loadMoreCards}
            isLoading={loadingMore}
            disabled={loading}
          >
            {loadingMore ? "Loading..." : "Load more"}
          </Button>
        </div>
        <div className="flex-grow"></div>
        <div className="flex justify-center content-center flex-wrap font-semibold">
          {cards.length} / {data?.totalCards}
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
