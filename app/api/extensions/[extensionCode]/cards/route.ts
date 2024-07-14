import { rarityValues } from '@/app/components/rarityFilter/rarityFilter';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest } from 'next';
import { NextResponse } from "next/server";
import { getCards } from '../../services/card.service';
const prisma = new PrismaClient()

export async function GET(request: NextApiRequest & { nextUrl: { searchParams: URLSearchParams } }, { params }: { params: { extensionCode: string } }) {
  console.log(`Fetching cards for extension code ${params.extensionCode}`);
  const extensionCode = params.extensionCode;
  const page = parseInt(request.nextUrl.searchParams.get('page') || '1');
  const pageSize = parseInt(request.nextUrl.searchParams.get('pageSize') || '20');
  const query = request.nextUrl.searchParams.get('query') || '';
  const rarityFilterParam = request.nextUrl.searchParams.get('rarityFilter');
  const rarityFilter = rarityFilterParam ? JSON.parse(rarityFilterParam) : rarityValues;
  const inStockParam = request.nextUrl.searchParams.get('inStock');
  const inStock = inStockParam === 'true' ? true : (inStockParam === 'false' ? false : null);
  const notInStockParam = request.nextUrl.searchParams.get('notInStock');
  const notInStock = notInStockParam === 'true' ? true : (notInStockParam === 'false' ? false : null);
  let stockConditions = [];

  if (inStock && !notInStock) {
    stockConditions.push({ stock: { gt: 0 } });
  } else if (notInStock && !inStock) {
    stockConditions.push({ stock: { equals: 0 } });
  } 

  try {
      const { cards, totalCards } = await getCards(extensionCode, page, pageSize, query, rarityFilter, stockConditions);
      return NextResponse.json({
          cards,
          page,
          pageSize,
          totalCards,
          totalPages: Math.ceil(totalCards / pageSize)
      });
  } catch (error) {
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
