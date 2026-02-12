import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm"
import { DocumentStatus } from "./document.status"

@Entity()
export class DocumentEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    fileName: string

    @Column({
        type: "enum",
        enum: DocumentStatus,
        default: DocumentStatus.PENDING,
    })
    status: DocumentStatus

    @Column()
    pageCount: number

    @Column()
    metadata: JSON

    @CreateDateColumn({ type: 'datetime' })
    createdAt: Date
}