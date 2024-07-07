import { Rarity } from "@prisma/client";
import { useEffect, useState } from "react";
import { fetchCards, ICardsResponse } from "../service/cardsService";

interface IApiResponse<T> {
  data: T | null;
  loading: boolean;
}

const useCards = (
  extensionId: string,
  page: number,
  pageSize: number,
  query: string,
  rarityFilter: Rarity[],
  inStock: boolean | null,
): IApiResponse<ICardsResponse> => {
  const [data, setData] = useState<ICardsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    fetchCards(extensionId, page, pageSize, query, rarityFilter, inStock).then(
      (data) => {
        setLoading(false);
        setData(data);
      },
    );
  }, [extensionId, query, rarityFilter, inStock]);

  return { data, loading };
};
export default useCards;
