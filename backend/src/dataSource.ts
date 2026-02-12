import { DataSource } from "typeorm"
import { DocumentEntity } from "./document/document.entity"

// DataSource (TypeORM) allow to communicate with our DB (sqlite)
export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "data/database.sqlite",
    synchronize: true,
    entities: [DocumentEntity]
})