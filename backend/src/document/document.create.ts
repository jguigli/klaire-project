import { DocumentStatus } from "./document.status";

export class DocumentCreate {
    fileName: string;
    pageCount: number;
    metadata: JSON;
}