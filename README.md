## Description
This monorepo sample project consists of three subprojects:
- bookstore-api-gateway (consumer) – Runs on port 3000.
- users (producer microservice) – Provides user data.
- books (producer microservice) – Provides book data and requires a RabbitMQ URL.

Additionally, there is a libs directory that provides a shared contract for common use.

## Project setup
Create `.env` files with the **following** keys:
`RABBITMQ_URL`=your_rabbitmq_url  # RabbitMQ queue URL  
`BOOKS_QUEUE`=your_books_queue_name  # RabbitMQ queue name  
`USER_PORT`=your_user_service_port  # TCP port for connecting to the User service  

```bash
$ pnpm install
```

## Compile and run the project
run each project seperaately and call 

```bash
# watch mode
$ nest start app_name --watch #example nest start books --watch
```


## Author Info
[Saman Kefayatpour](https://www.linkedin.com/in/samankefayatpour/)
