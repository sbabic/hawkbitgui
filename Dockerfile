FROM node:22.13.0-bullseye AS common-build-stage

RUN npm install -g bun@1.2.5

WORKDIR /app

RUN chown node:node /app

USER node

COPY --chown=node:node package.json bun.lockb* ./

COPY --chown=node:node . .

RUN bun install --no-frozen-lockfile



# Development build stage
FROM common-build-stage AS development-build-stage

ENV NODE_ENV=development

EXPOSE 3000

CMD ["bun", "run", "dev"]

# Production build stage
FROM common-build-stage AS production-build-stage

ENV NODE_ENV=production

RUN bun run build

EXPOSE 3000

CMD ["bun", "run", "start"]
