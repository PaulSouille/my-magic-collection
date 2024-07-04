import { PrismaClient } from '@prisma/client';
import { NextApiRequest } from 'next';
import { NextResponse } from "next/server";
const prisma = new PrismaClient()


export async function GET(request: NextApiRequest& {nextUrl: {searchParams:URLSearchParams}},  {params}:{params:{id:string}} ,) {
    console.log(`Fetching cards for id ${params.id}`)
    const id = params.id;
    const page = parseInt(request.nextUrl.searchParams.get('page') || '1');
    const pageSize = parseInt(request.nextUrl.searchParams.get('pageSize') || '20');
  
    if (!id) {
      return NextResponse.json({ error: 'ExtensionId is required' }, { status: 400 });
    }
  
    try {
      const skip = (page - 1) * pageSize;
      let cards = await prisma.cards.findMany({
        where: {
          extensionId: parseInt(id)
        },
        skip: skip,
        take: pageSize,
        orderBy: {
          printedName: 'asc'
        }
      });
  
      const totalCards = await prisma.cards.count({
        where: {
            extensionId: parseInt(id)
        }
      });
      cards = cards.map((card)=>{
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
      console.error('Error fetching cards:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }