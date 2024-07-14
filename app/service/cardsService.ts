import { Cards, Rarity } from "@prisma/client";
import axios from "axios";
export interface ICardsResponse {
  cards: Cards[];
  page: number;
  pageSize: number;
  totalPages: number;
  totalCards: number;
}

export interface ICountStockResponse {
  totalCardsInStock:number;
  totalCards: number;
}

export function fetchCards(
  extensionId: string,
  page: number,
  pageSize: number,
  query: string,
  rarityFilter: Rarity[],
  inStock: boolean,
  notInStock: boolean,
) {
  return axios
    .get(`/api/extensions/${extensionId}/cards`, {
      params: {
        page,
        pageSize,
        query,
        rarityFilter: JSON.stringify(rarityFilter),
        inStock,
        notInStock,
      },
    })
    .then((response) => response.data)
    .then((data) => {
      const cardsWithBase64 = data.cards.map((card: Cards) => ({
        ...card,
        smallImage: Buffer.from(card.smallImage!).toString("base64"),
        normalImage: Buffer.from(card.normalImage!).toString("base64"),
      }));
      return { ...data, cards: cardsWithBase64 };
    })
    .catch((error) => {
      console.error("Error fetching cards:", error);
    });
}

export function countExtensionStock(extensionId: string) {
  return axios
    .get<ICountStockResponse>(`/api/extensions/${extensionId}/stock`, {})
    .then((response) => response.data)

    .catch((error) => {
      console.error("Error fetching cards:", error);
    });
}

export const addStock = async (cardId: number) => {
  const response = await fetch(`/api/cards/${cardId}/stock/add`, {
    method: 'PUT',
  });

  if (!response.ok) {
    throw new Error('Failed to add stock');
  }

  return response.json();
};