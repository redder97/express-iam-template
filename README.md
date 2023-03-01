## Express IAM Server Template

This is a template for IAM auth server.

### Technology Stack Used
- Typescript
- ExpressJS
- Docker
- Prisma
- bcryptjs

### Starting the application
- Install the dependencies
`npm install`
- Run the application
`npm run dev`

### Starting the application as a service (docker)
- Run docker command (`-d` for detached instance):
`docker compose up -d`

### To Generate a public/private key pair
- Private Key (RSA):
`ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key`

- Public Key:
`openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub`

- Private Key (PKCS8):
`openssl pkcs8 -topk8 -nocrypt -in jwtRS256.key > private_key.pem`