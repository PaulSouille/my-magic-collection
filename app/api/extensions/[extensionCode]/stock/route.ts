import { PrismaClient } from '@prisma/client';
import { NextApiRequest } from 'next';
import { NextResponse } from "next/server";
const prisma = new PrismaClient()
 

export async function GET(request: NextApiRequest & {nextUrl: {searchParams:URLSearchParams}},  {params}:{params:{extensionCode:string}} ,) {
    console.log(`Fetching cards for extension code ${params.extensionCode}`)
    const extensionCode = params.extensionCode;
  
    try {
      let totalCardsInStock = await prisma.cards.count({
        where: {
          extension: { 
            code: extensionCode
          },       
          stock: {
            gt: 0
          }
        }
        
      }); 
  
      const totalCards = await prisma.cards.count({
        where: {
          extension: { 
            code: extensionCode
          },
        }
      });

      return NextResponse.json({
        totalCardsInStock,
        totalCards,
      });
    } catch (error) {
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }





