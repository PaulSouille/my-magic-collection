const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const prisma = new PrismaClient();

async function main() {
  const filePath = path.join(__dirname, 'ACR.json');
  const cardsData = JSON.parse(fs.readFileSync(filePath, 'utf-8'))['data'];

  for (const card of cardsData) {
    console.log('adding card '+ card.id+ ' // '+card.printed_name);
    console.log('------------------')

    await prisma.cards.create({
      data: {
        sourceId: card.id, // Identifiant source
        name: card.name, // Titre
        printedName: card.printed_name,
        content: card.printed_text, // Contenu
        extensionId: 1,
        cardMarketId: card.cardmarket_id ?? null,
        typeLine: card.type_line,
        rarity: card.rarity.toUpperCase(), // Type
        borderColor: card.border_color.toUpperCase(),
        stock:0,
        isFoil: false,
        normalImage: await fetchImageWithDelay(card.image_uris.normal),
        smallImage: await fetchImageWithDelay(card.image_uris.normal),
        price: card.prices['eur'] ?? null
      }
    });
  }
  console.log('Les données ont été insérées avec succès.');



}

async function fetchImageWithDelay(imageUrl) {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const response = await axios.get(imageUrl, {
            responseType: 'arraybuffer', 
          });
          resolve(Buffer.from(response.data)); 
        } catch (error) {
          console.error('Error fetching image:', error);
          reject(error);
        }
      }, 300); 
    });
  }

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });