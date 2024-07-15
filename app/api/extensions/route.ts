import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const extensions = await prisma.extensions.findMany();
    
    if (!extensions) {
      console.error("No extensions found");
      return NextResponse.json({ error: "Error occurred", status: 400 });
    }

    return NextResponse.json(extensions);
  } catch (error) {
    console.error("Database query failed", error);
    return NextResponse.json({ error: "Error occurred", status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req: NextRequest) {
  try {
    const extensions = await prisma.extensions.findMany();
    
    if (!extensions) {
      console.error("No extensions found");
      return NextResponse.json({ error: "Error occurred", status: 400 });
    }

    return NextResponse.json(extensions);
  } catch (error) {
    console.error("Database query failed", error);
    return NextResponse.json({ error: "Error occurred", status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}