# Use an official node image as the base
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json .
RUN npm install

# Copy the rest of the code
COPY . .

# Build the React app
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Serve the React app
CMD ["npx", "serve", "-s", "build", "-l", "3000"]
