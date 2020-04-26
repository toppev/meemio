# Meemio

The open source meme platform.

## Getting Started

This project consists of backend written in Kotlin using Spring Boot and frontend written in ReactJS and Sass.

### Prerequisites

1. Install [Docker Compose](https://docs.docker.com/compose/install/)
2. Install [MySQL](https://www.mysql.com/) or [MariaDB](https://mariadb.org/).
Alternatively, you can configure `backend/src/main/resources/application.properties` to use [H2](https://www.h2database.com/html/main.html) in-memory database:
```
jdbc.driverClassName=org.h2.Driver
jdbc.url=jdbc:h2:mem:myDb;DB_CLOSE_DELAY=-1
hibernate.dialect=org.hibernate.dialect.H2Dialect
```

### Configure database
Ignore this section if you're using H2 in-memory database.

1. Configure `backend/src/main/resources/application.properties` (e.g password)
2. Setup the database. For example,
```sql
/* Create a new database `meemio` */
CREATE DATABASE meemio;

/* Create a new user `meemio` */
CREATE USER 'meemio'@'localhost' IDENTIFIED BY 'password123';

/* Give permissions to use the database */
GRANT ALL PRIVILEGES ON meemio.* TO 'meemio'@'localhost';
```

### Docker Compose

By default, uploaded files are saved into the `/meemio_uploads` directory. A custom path, if desired, can be configured in the `docker-compose.yml` file.

1. When NOT running the app on localhost, add (or edit) the host address in the `allowedOrigins` variable in `meemio/backend/src/main/kotlin/dev/toppe/meemio/config/SecurityConfiguration.kt`
2. Add `"homepage": "https://yourpage",` in `frontend/package.json`
3. Run with `docker-compose up`
4. Navigate to `http://localhost:3000`


### Running tests manually

1. Navigate to the `backend/` directory
2. Run tests with `./gradlew test`.

## Authors
[Omar](https://github.com/oomaroomar) (frontend)

[Topias](https://github.com/toppev) (backend)
