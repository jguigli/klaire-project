# klaire-project

This technical test for Klaire is a simple CRUD app for documents ingestion and listing.  

## Subject

- [Instructions](instructions.md)  


## Requirements

- [Docker](https://docs.docker.com/get-docker/)  
- [Docker Compose](https://docs.docker.com/compose/)  




## Setup

Install :

```
git clone git@github.com:jguigli/klaire-project.git
cd klaire-project
```

Launch the app :
```
make
```
or
```
docker compose up -d --build
```

## Api Tests
Execute the api tests :

```
make test
```

## Access the app

Run the app on your web browser : http://localhost:5173



## Useful link
- [NestJS introduction doc](https://docs.nestjs.com)  
- [NestJS Controllers doc](https://docs.nestjs.com/controllers)  
- [Vite doc](https://vite.dev/guide/)  
- [TypeORM Entities](https://typeorm.io/docs/entity/entities)  
- [TypeORM Find](https://typeorm.io/docs/working-with-entity-manager/find-options)  
- [TypeORM QueryBuilder](https://typeorm.io/docs/query-builder/select-query-builder)  