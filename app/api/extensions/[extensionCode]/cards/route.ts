import { rarityValues } from '@/app/components/rarityFilter/rarityFilter';
import { PrismaClient, Rarity } from '@prisma/client';
import { randomInt } from 'crypto';
import { NextApiRequest } from 'next';
import { NextResponse } from "next/server";
const prisma = new PrismaClient()
 

export async function GET(request: NextApiRequest & {nextUrl: {searchParams:URLSearchParams}},  {params}:{params:{extensionCode:string}} ,) {
    console.log(`Fetching cards for extension code ${params.extensionCode}`)
    const extensionCode = params.extensionCode;
    const page = parseInt(request.nextUrl.searchParams.get('page') || '1');
    const pageSize = parseInt(request.nextUrl.searchParams.get('pageSize') || '20');
    const query = request.nextUrl.searchParams.get('query') || '';
    const rarityFilterParam = request.nextUrl.searchParams.get('rarityFilter');
    const rarityFilter: Rarity[] = rarityFilterParam ? JSON.parse(rarityFilterParam) : rarityValues;
    console.log(rarityFilter)
    if (!extensionCode) {
      return NextResponse.json({ error: 'extensionCode is required' }, { status: 400 });
    }
  
    try {
      const skip = (page - 1) * pageSize;
      let cards = await prisma.cards.findMany({
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
          }
        },
        skip: skip,
        take: pageSize,
        orderBy: {
          printedName: 'asc'
        },
        
      }); 
  
      const totalCards = await prisma.cards.count({
        where: {
          extension: { 
            code: extensionCode
          },
        }
      });
      cards = cards.map((card)=>{
        card.stock = randomInt(3); 
        return card
      })
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





