const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const prisma = new PrismaClient();

const IMAGE_URL="";
const EXTENSION_ID = 1;

async function main() {

      const createdCard = await prisma.extensions.update({
        where: {id:EXTENSION_ID},
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