import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const extensions = await prisma.extensions.findMany();
  console.log(prisma.extensions)
  if (extensions == null || extensions == undefined) {
    return NextResponse.json({ error: "Error occured", status: 400 });
  }
  return NextResponse.json(extensions);
}
