"use client";
import InStockFilter from "@/app/components/inStockFilter";
import RarityFilter, {
  rarityValues,
} from "@/app/components/rarityFilter/rarityFilter";
import SearchBar from "@/app/components/searchbar";
import CardsSkeleton from "@/app/components/skeleton/cards";
import useCards from "@/app/hooks/useCards";
import { addStock, fetchCards } from "@/app/service/cardsService";
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
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(initialPage);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [cards, setCards] = useState<Cards[]>([]);
  const [inStock, setInStock] = useState(true);
  const [notInStock, setNotInStock] = useState(true);
  const [rarityFilter, setRarityFilter] = useState(rarityValues);
  const { data } = useCards(
    setLoading,
    extensionCode,
    page,
    initialPageSize,
    query,
    rarityFilter,
    inStock,
    notInStock,
  );

  const addCardInStock = async (cardId: number) => {
    try {
      const updatedCard = await addStock(cardId);
      setCards((prevCards) =>
        prevCards.map((card) =>
          card.id === cardId ? { ...card, stock: updatedCard.stock } : card,
        ),
      );
    } catch (error) {
      console.error("Error adding card to stock:", error);
    }
  };

  const resetPagination = () => {
    setLoading(true);
    setPage(initialPage);
    setCards([]);
  };

  useEffect(() => {
    if (data && data.cards) {
      setCards(data.cards);
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    setLoading(true);
    resetPagination();
  }, [rarityFilter]);

  useEffect(() => {
    if (search.length > 3 || search.length === 0) {
      setLoading(true);
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
      fetchCards(
        extensionCode,
        page + 1,
        initialPageSize,
        query,
        rarityFilter,
        inStock,
        notInStock,
      ).then((response) => {
        const newCards = response!.cards;
        setCards((prevCards) => {
          return [...prevCards, ...newCards];
        });
        setLoadingMore(false);
      });
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-3 w-full max-w-xl items-center">
          <div></div> {/* Empty div for left spacer */}
          <div className="flex justify-center">
            <RarityFilter
              extensionCode={extensionCode}
              setRarityFilter={setRarityFilter}
              rarityFilter={rarityFilter}
            />
          </div>
          <div className="flex justify-end">
            <InStockFilter
              setInStock={setInStock}
              inStock={inStock}
              setNotInStock={setNotInStock}
              notInStock={notInStock}
              resetPagination={resetPagination}
            />
          </div>
        </div>
      </div>
      <SearchBar setSearch={setSearch} />
      {loading && <CardsSkeleton />}

      {!loading && (
        <div>
          <div className=" grid gap-16 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {cards.map((card, index) => (
              <div
                className="relative flex justify-center items-center group"
                key={index}
              >
                <Image
                  className={`${card.stock > 0 ? "" : styles.notInStock}`}
                  isZoomed
                  width={300}
                  alt={`${card.name}'s image`}
                  src={`data:image/png;base64,${card.smallImage}`}
                />
                <div className="absolute inset-0 flex flex-col justify-center rounded-lg items-center bg-gray-900 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <div className="flex font-bold justify-center text-white">
                    {card.stock}
                  </div>
                  <Button
                    onPress={() => {
                      addCardInStock(card.id);
                    }}
                    className="mt-2"
                  >
                    Ajouter au stock
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center mt-5 mb-5">
            <div className="grid grid-cols-3 w-full items-center">
              <div></div>
              <div className="flex justify-center">
                {cards.length !== data?.totalCards && (
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
              </div>
              <div className="flex justify-end">
                {cards.length} / {data?.totalCards}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardDetail;
