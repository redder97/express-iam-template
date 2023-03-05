## Express IAM Server Template
This is a template for IAM auth server.

### Technology Stack Used
- Typescript
- ExpressJS
- Docker
- Prisma
- bcryptjs

### To Generate a public/private key pair
- Private Key (RSA):
`ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key`

- Public Key:
`openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub`

- create a `/certs` file and copy generated keys.

### Notes before starting
- Refer to `.env.example` for necessary environment variables
- create a `.env.dev` for your environment variables

### Starting the application
- Install the dependencies
`npm install`
- Run the application
`npm run dev`
- Generate prisma client
`npx prisma generate`
- Push prisma schema
`npx prisma db push`

### Starting the application as a service (docker)
- Run docker command (`-d` for detached instance):
`docker compose up -d`

