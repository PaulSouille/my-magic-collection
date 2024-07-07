import { Cards, Rarity } from "@prisma/client";
import axios from "axios";
export interface ICardsResponse {
    cards: Cards[];
    page: number;
    pageSize: number;
    totalPages: number;
    totalCards: number;
  }

export function fetchCards( extensionId: string,
    page: number,
    pageSize: number,
    query: string,
    rarityFilter: Rarity[],
    inStock: boolean | null) {
    return axios
    .get(`/api/extensions/${extensionId}/cards`, {
      params: {
        page,
        pageSize,
        query,
        rarityFilter: JSON.stringify(rarityFilter),
        inStock
      },
    }) .then((response) => response.data)
    .then((data) => {
      const cardsWithBase64 = data.cards.map((card: Cards) => ({
        ...card,
        smallImage: Buffer.from(card.smallImage!).toString("base64"),
        normalImage: Buffer.from(card.normalImage!).toString("base64"),
      }));
      return {...data, cards:cardsWithBase64};
    })
    .catch((error) => {
      console.error("Error fetching cards:", error);
    });
    
}