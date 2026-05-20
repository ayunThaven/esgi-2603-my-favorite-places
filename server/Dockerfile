FROM node:22-bookworm-slim AS base

WORKDIR /app

RUN corepack enable \
  && corepack prepare yarn@1.22.22 --activate

FROM base AS deps

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

FROM deps AS build

COPY tsconfig.json ./
COPY src ./src

RUN yarn build

FROM base AS prod-deps

ENV NODE_ENV=production

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --production=true \
  && yarn cache clean

FROM node:22-bookworm-slim AS runtime

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/index.js"]
