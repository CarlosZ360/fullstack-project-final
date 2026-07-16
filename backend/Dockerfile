FROM node:20-alpine
 
WORKDIR /app
 
COPY package*.json ./
RUN npm ci
 
COPY . .
 
ENV DATABASE_URL="postgresql://fullstackfinal_user:BDMtFWD8YpzPeawOP7xRLf0eTU8m4IH9@dpg-d7jadjnavr4c73c6obgg-a.oregon-postgres.render.com/fullstackfinal"
RUN npx prisma generate
 
EXPOSE 4000
 
CMD ["npm", "run", "dev"]