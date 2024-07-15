import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";
const prisma = new PrismaClient()

export async function GET(req: Request) {
  try{
    const extensions = await prisma.extensions.findMany();
  
      if(extensions == null || extensions == undefined){
          return NextResponse.json({error:"Error occured", status:400});
      }
      return NextResponse.json(extensions);

  } catch(error){
    console.log(error)
  }
  
  
}

