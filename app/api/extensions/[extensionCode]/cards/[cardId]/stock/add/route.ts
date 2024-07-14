


import { incrementCardStock } from '@/app/api/extensions/services/card.service';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
const prisma = new PrismaClient()


export async function PUT(request: NextApiRequest, { params }: { params: { cardId: string } }) {
    const cardId = parseInt(params.cardId);

    try {
        const cardWithoutImages = await incrementCardStock(cardId);
        return NextResponse.json(cardWithoutImages);
    } catch (error) {
        console.error(`Error updating stock for card ID ${cardId}:`, error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}