FROM node:22.13.0-bullseye as common-build-stage

RUN npm install -g bun@1.2.5

WORKDIR /app

COPY package.json bun.lockb* ./

COPY . .

RUN bun install --no-frozen-lockfile



# Development build stage
FROM common-build-stage as development-build-stage

ENV NODE_ENV development

EXPOSE 3000

CMD ["bun", "run", "dev"]

# Production build stage
FROM common-build-stage as production-build-stage

ENV NODE_ENV production

RUN bun run build

EXPOSE 3000

CMD ["bun", "run", "start"]
