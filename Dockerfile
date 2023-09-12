FROM bitnami/node:12 as builder
ENV NODE_ENV="production"

# Copy app's source code to the /app directory
COPY . /app

# The application's directory will be the working directory
WORKDIR /app

# Install Node.js dependencies defined in '/app/packages.json'
RUN npm install

FROM bitnami/node:12-prod
ENV NODE_ENV="producting"
COPY --from=builder /app /app
WORKDIR /app
ENV PORT 3000
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
