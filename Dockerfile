FROM bitnami/node:9 as builder
ENV NODE_ENV="production"

# Copy app's source code to the /app directory
COPY . /app

# The application's directory will be the working directory
WORKDIR /app

# Install Node.js dependencies defined in '/app/packages.json'
RUN npm install

FROM bitnami/node:9-prod
ENV NODE_ENV="production"
COPY --from=builder /app /app
WORKDIR /app
ENV PORT 3000
ENV DATABASE_HOST '34.64.221.63'
ENV DATABASE_NAME 'huco'
ENV DATABASE_USERNAME 'huco'
ENV DATABASE_PASSWORD '0620'
ENV OPEN_API_URL 'http://aiopen.etri.re.kr:8000/WiseWWN/WordRel'
ENV ACCESS_KEY '797ce360-8ca1-4a8f-8ab6-bb0ae76a0405'
EXPOSE 3000

# Start the application
CMD ["npm", "run"]