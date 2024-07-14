


import { decrementCardStock } from '@/app/api/extensions/services/card.service';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
const prisma = new PrismaClient()


export async function PUT(request: NextRequest, { params }: { params: { cardId: string } }) {
    const cardId = parseInt(params.cardId);

    try {
        const cardWithoutImages = await decrementCardStock(cardId);
        return NextResponse.json(cardWithoutImages);
    } catch (error) {
        console.error(`Error updating stock for card ID ${cardId}:`, error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}