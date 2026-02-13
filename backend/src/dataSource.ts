import { DataSource } from "typeorm"
import { DocumentEntity } from "./document/document.entity"
import * as fs from "fs"
import * as path from "path"

// Chemin unique : env DATABASE_PATH (Docker) ou data/database.sqlite (relatif au CWD)
const dbPath = process.env.DATABASE_PATH || path.join(process.cwd(), "data", "database.sqlite")
const dbDir = path.dirname(dbPath)
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true })
}

// DataSource (TypeORM) allow to communicate with our DB (sqlite)
export const AppDataSource = new DataSource({
    type: "sqlite",
    database: dbPath,
    synchronize: true,
    entities: [DocumentEntity],
    logging: false,
})