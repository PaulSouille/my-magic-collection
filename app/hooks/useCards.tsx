import { Cards } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";

interface ICardsResponse {
  cards: Cards[];
  page: number;
  pageSize: number;
  totalPages: number;
  totalCards: number;
}

interface IApiResponse<T> {
  data: T | null;
  loading: boolean;
}

const useCards = (
  extensionId: string,
  page: number,
  pageSize: number,
  query: string,
): IApiResponse<ICardsResponse> => {
  const [data, setData] = useState<ICardsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  console.log(page);
  console.log(query);
  useEffect(() => {
    axios
      .get(`/api/extensions/${extensionId}/cards`, {
        params: {
          page,
          pageSize,
          query,
        },
      })
      .then((response) => response.data)
      .then((data) => {
        const cardsWithBase64 = data.cards.map((card: Cards) => ({
          ...card,
          smallImage: Buffer.from(card.smallImage!).toString("base64"),
          normalImage: Buffer.from(card.normalImage!).toString("base64"),
        }));
        setData({ ...data, cards: cardsWithBase64 });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cards:", error);
        setLoading(false);
      });
  }, [extensionId, page, pageSize, query]);

  return { data, loading };
};
export default useCards;

// const useCards = (extensionId: string, page: number, pageSize: number) => {
//   const [cards, setCards] = useState<Cards[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const searchParams = new URLSearchParams({
//       page: page.toString(),
//       pageSize: pageSize.toString(),
//     });
//     const url = new URL(`/api/extensions/${extensionId}/cards`);
//     url.search = searchParams.toString();
//     console.log(url);
//     fetch(url)
//       .then((response) => response.json())
//       .then((data) => {
//         const cardsWithBase64 = data.map((card: Cards) => ({
//           ...card,
//           smallImage: Buffer.from(card.smallImage!).toString("base64"),
//           normalImage: Buffer.from(card.normalImage!).toString("base64"),
//         }));
//         setCards(cardsWithBase64);
//         setLoading(false);

//         setCards(cardsWithBase64);
//       })
//       .catch((error) => {
//         console.error("Error fetching cards:", error);
//         setLoading(false);
//       });
//   }, []);

//   return { cards, loading };
// };
