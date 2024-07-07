"use client";
import RarityFilter, {
  rarityValues,
} from "@/app/components/rarityFilter/rarityFilter";
import SearchBar from "@/app/components/searchbar";
import useCards from "@/app/hooks/useCards";
import { fetchCards } from "@/app/service/cardsService";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/react";
import { Cards } from "@prisma/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

const CardDetail = () => {
  const { extensionCode }: { extensionCode: string } = useParams();
  const initialPage = 1;
  const initialPageSize = 20;
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(initialPage);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [cards, setCards] = useState<Cards[]>([]);
  const [rarityFilter, setRarityFilter] = useState(rarityValues);
  const { data, loading } = useCards(
    extensionCode,
    page,
    initialPageSize,
    query,
    rarityFilter,
  );

  const resetPagination = () => {
    setPage(initialPage);
    setCards([]);
  };

  useEffect(() => {
    if (data && data.cards) {
      setCards(data.cards);
      setLoadingMore(false);
    }
  }, [data]);

  useEffect(() => {
    resetPagination();
  }, [rarityFilter]);

  useEffect(() => {
    if (search.length > 3 || search.length === 0) {
      resetPagination();
      setQuery(search);
    }
  }, [search]);

  const loadMoreCards = () => {
    setLoadingMore(true);
    setPage((prevPage) => prevPage + 1);
    fetchAndAppendCards();
  };

  const fetchAndAppendCards = async () => {
    try {
      //todo: why page is not the same as setPage did
      console.log(page);
      fetchCards(
        extensionCode,
        page + 1,
        initialPageSize,
        query,
        rarityFilter,
      ).then((response) => {
        const newCards = response!.cards;
        setCards((prevCards) => {
          console.log(newCards[0].printedName);
          console.log(prevCards[0].printedName);
          return [...prevCards, ...newCards];
        });
        setLoadingMore(false);
      });
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  if (loading && page === initialPage) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <RarityFilter
        setRarityFilter={setRarityFilter}
        extensionCode={extensionCode}
        rarityFilter={rarityFilter}
      />
      <SearchBar setSearch={setSearch} />
      <div className=" grid gap-16 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {cards.map((card, index) => (
          <div key={index}>
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
        {data?.cards.length === initialPageSize && (
          <div>
            <Button
              onPress={loadMoreCards}
              isLoading={loadingMore}
              disabled={loading}
            >
              {loadingMore ? "Loading..." : "Load more"}
            </Button>
          </div>
        )}
        <div className="flex-grow"></div>
        <div className="flex justify-center content-center flex-wrap font-semibold">
          {cards.length} / {data?.totalCards}
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
