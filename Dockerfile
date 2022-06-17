FROM bitnami/node:12 as builder
ENV NODE_ENV="production"

# Copy app's source code to the /app directory
COPY . /app

# The application's directory will be the working directory
WORKDIR /app

# Install Node.js dependencies defined in '/app/packages.json'
RUN npm install

FROM bitnami/node:12-prod
ENV NODE_ENV="production"
COPY --from=builder /app /app
WORKDIR /app
ENV PORT 3000
ENV DATABASE_HOST '34.64.221.63'
ENV DATABASE_NAME 'huco'
ENV DATABASE_USERNAME 'huco'
ENV OPEN_API_URL 'http://aiopen.etri.re.kr:8000/WiseWWN/WordRel'
EXPOSE 3000

# Start the application
CMD ["npm", "start"]