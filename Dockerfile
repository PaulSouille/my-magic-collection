



FROM node:18-alpine AS base
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

FROM base as build
RUN export NODE_ENV=production

COPY . .
RUN npm run prisma:generate
RUN npm run build

FROM base as prod-build

RUN npm install --production
COPY prisma prisma
RUN npm run prisma:generate
RUN cp -R node_modules prod_node_modules

FROM base as prod

COPY --from=prod-build /app/prod_node_modules /app/node_modules
COPY --from=build  /app/.next /app/.next
COPY --from=build  /app/public /app/public
COPY --from=build  /app/prisma /app/prisma

EXPOSE 3000
CMD ["npm", "run", "start"]
