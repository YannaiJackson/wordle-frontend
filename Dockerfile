# Step 1: Use the official Node.js image as the base image
FROM node:18-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (or yarn.lock) to install dependencies first
COPY package*.json ./

# Step 4: Install dependencies (including Tailwind CSS)
RUN npm install

# Step 5: Copy the rest of the application code into the container
COPY . .

# Step 6: Build the Next.js application (this also compiles Tailwind CSS)
RUN npm run build

# Step 7: Expose the port the app will run on
EXPOSE 3000

# Step 8: Start the Next.js app
CMD ["npm", "run", "start", "--", "-H", "0.0.0.0"]
