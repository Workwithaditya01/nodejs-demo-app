#------------Stage-1:Builder-stage--------------

FROM node:24 as Builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

#------------Stage-2:Runner-stage---------------

FROM node:24-alpine

WORKDIR /app

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=Builder /app .

USER appuser

EXPOSE 3000

CMD ["node","index.js"]