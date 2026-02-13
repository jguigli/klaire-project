import instance from "../axios/client";
import { useEffect, useState } from "react";
import type { Document } from "../types/document";


export function List()
{
  const[documents, setDocuments] = useState<Document[]>([]);

  const fetchDocuments = async () => {
    try {
      const response = await instance.get<Document[]>('/documents');
      setDocuments(response.data);
    } catch (err: any) {
      console.error('Error fetching documents:', err);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const updateDocument = async (id: number, status: string) => {
    try {
      await instance.patch<Document>(`/documents/${id}?status=${encodeURIComponent(status)}`);
      setDocuments(documents.map(document => document.id === id ? {...document, status: status} : document));
    } catch (err: any) {
      console.error('Error updating document:', err);
    }
  }
  return (
    <div>
      <h2 className="text-3xl font-bold mb-10">List of documents</h2>
      <div className="overflow-x-auto rounded-lg border border-gray-600">
        <table className="w-full text-left">
          <thead className="bg-gray-600 text-gray-100">
            <tr>
              <th className="px-4 py-3 font-semibold">File name</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Page count</th>
              <th className="px-4 py-3 font-semibold">Metadata</th>
              <th className="px-4 py-3 font-semibold">Created at</th>
              <th className="px-4 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-600">
            {documents.map((document) => (
              <tr key={document.id} className="bg-gray-700/50 hover:bg-gray-700">
                <td className="px-4 py-3">{document.fileName}</td>
                <td className="px-4 py-3">{document.status}</td>
                <td className="px-4 py-3">{document.pageCount}</td>
                <td className="px-4 py-3 max-w-xs truncate" title={typeof document.metadata === 'string' ? document.metadata : JSON.stringify(document.metadata)}>
                  {typeof document.metadata === 'string' ? document.metadata : JSON.stringify(document.metadata)}
                </td>
                <td className="px-4 py-3">{new Date(document.createdAt).toLocaleString()}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button className="border border-gray-500 rounded px-2 py-1 text-sm hover:bg-gray-600" onClick={() => updateDocument(document.id, 'pending')}>Pending</button>
                    <button className="border border-gray-500 rounded px-2 py-1 text-sm hover:bg-gray-600" onClick={() => updateDocument(document.id, 'processed')}>Processed</button>
                    <button className="border border-gray-500 rounded px-2 py-1 text-sm hover:bg-gray-600" onClick={() => updateDocument(document.id, 'archived')}>Archived</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}