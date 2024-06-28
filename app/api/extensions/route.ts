import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const extensions = await prisma.extensions.findMany();

    if(extensions == null || extensions == undefined){
        return NextResponse.json({error:"Error occured", status:400});
    }
    return NextResponse.json(extensions);
  
}

