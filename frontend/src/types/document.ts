export interface DocumentCreate {
    fileName: string,
    pageCount: number,
    metadata: string
}

export interface Document {
    id: number,
    fileName: string,
    status: string,
    pageCount: number,
    metadata: string,
    createdAt: Date
}

export interface DocumentStats {
    status: string,
    total_pages: number
}