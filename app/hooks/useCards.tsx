import { Rarity } from "@prisma/client";
import { useEffect, useState } from "react";
import { fetchCards, ICardsResponse } from "../service/cardsService";

interface IApiResponse<T> {
  data: T | null;
}

const useCards = (
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  extensionId: string,
  page: number,
  pageSize: number,
  query: string,
  rarityFilter: Rarity[],
  inStock: boolean,
  notInStock: boolean,
): IApiResponse<ICardsResponse> => {
  const [data, setData] = useState<ICardsResponse | null>(null);
  useEffect(() => {
    fetchCards(
      extensionId,
      page,
      pageSize,
      query,
      rarityFilter,
      inStock,
      notInStock,
    ).then((data) => {
      setLoading(false);
      setData(data);
    });
  }, [extensionId, query, rarityFilter, inStock, notInStock]);

  return { data };
};
export default useCards;
