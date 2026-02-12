import { DocumentStatus } from "./document.status";

export class DocumentCreate {
    fileName: string;
    status: DocumentStatus;
    pageCount: number;
    metadata: JSON;
}