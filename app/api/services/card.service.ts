import { PrismaClient, Rarity } from '@prisma/client';

const prisma = new PrismaClient();

export const getCards = async (
  extensionCode: string, 
  page: number, 
  pageSize: number, 
  query: string, 
  rarityFilter: Rarity[], 
  stockConditions: any[]
) => {
  const skip = (page - 1) * pageSize;

  const cards = await prisma.cards.findMany({
    where: {
      extension: { 
        code: extensionCode 
      },
      printedName: {
        contains: query, 
        mode: 'insensitive'
      },
      rarity: {
        in: rarityFilter
      },
      ...(stockConditions.length > 0 && { AND: stockConditions })
    },
    skip: skip,
    take: pageSize,
    orderBy: {
      printedName: 'asc'
    }
  });

  const totalCards = await prisma.cards.count({
    where: {
      extension: { 
        code: extensionCode 
      },
      printedName: {
        contains: query, 
        mode: 'insensitive'
      },
      rarity: {
        in: rarityFilter
      },
      ...(stockConditions.length > 0 && { AND: stockConditions })
    }
  });

  return { cards, totalCards };
};

export const incrementCardStock = async (cardId: number) => {
  const updatedCard = await prisma.cards.update({
    where: { id: cardId },
    data: { stock: { increment: 1 } }
  });

  const { normalImage, smallImage, ...cardWithoutImages } = updatedCard;
  return cardWithoutImages;
};

export const decrementCardStock = async (cardId: number) => {
    const updatedCard = await prisma.cards.update({
      where: { id: cardId },
      data: { stock: { decrement: 1 } }
    });
  
    const { normalImage, smallImage, ...cardWithoutImages } = updatedCard;
    return cardWithoutImages;
  };