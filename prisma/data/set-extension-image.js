const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const prisma = new PrismaClient();

let EXTENSION_ID = process.argv[2];
let IMAGE_URL=process.argv[3]


async function main() {

      const createdCard = await prisma.extensions.update({
        where: {id:Number(EXTENSION_ID)},
      data: {
        image: await fetchImageWithDelay( IMAGE_URL),
      }
    });

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