FROM node:18-alpine
WORKDIR /app
COPY package.json .
RUN npm install
ENV PORT 3001
ENV MONGO_URI mongodb+srv://kumar:7VnrEfN0Ci3nQ3Xo@cluster0.ovgqwzy.mongodb.net/ticketing
ENV NODE_ENV development
ENV JWT_SECRET dev_key_#_1
COPY . .
CMD ["npm", "run", "dev"]