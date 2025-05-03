## Description
This monorepo sample project consists of three subprojects:
- bookstore-api-gateway (consumer) – Runs on port 3000.
- auth (producer microservice) – Provides authentication and user data.
- books (producer microservice) – Provides book data and requires a RabbitMQ URL.

Additionally, there is a libs directory that provides a shared contract for common use.

## Project setup
Create `.env` files with the **following** keys:
`RABBITMQ_URL`=your_rabbitmq_url  # RabbitMQ queue URL  
`MONGODB_URI`=your_mongo_db_url
`BOOKS_QUEUE`=your_books_queue_name  # RabbitMQ queue name  
`AUTH_PORT`=your_auth_service_port  # TCP port for connecting 
to the Auth service 
`EXPIRATION_TIME`=expiration time for jwt token
`TOKEN_SECRET_KEY`=you_token_key for jwt verification 

```bash
$ pnpm install
```
## Run by docker
```bash
$ docker-compose up
```
## Compile and run the project
run each project seperately and call 

```bash
# watch mode
$ nest start app_name --watch #example nest start books --watch
```


## Author Info
[Saman Kefayatpour](https://www.linkedin.com/in/samankefayatpour/)
