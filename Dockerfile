FROM node:16-alpine
ENV NODE_ENV=production

WORKDIR /app

COPY . .

RUN yarn install --production

CMD ["npm", "run", "prod"]