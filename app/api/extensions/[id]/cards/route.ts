import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const cards = await prisma.card.findMany();

    if(cards == null || cards || undefined){
        return NextResponse.json({error:"Error occured", status:400});
    }
    return NextResponse.json(cards);
  
}

