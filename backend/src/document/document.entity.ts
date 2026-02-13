import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm"
import { DocumentStatus } from "./document.status"

@Entity()
export class DocumentEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    fileName: string

    @Column({ type: "text", default: DocumentStatus.PENDING })
    status: DocumentStatus

    @Column()
    pageCount: number

    @Column({ type: 'simple-json', nullable: true })
    metadata: JSON;

    @CreateDateColumn({ type: 'datetime' })
    createdAt: Date
}