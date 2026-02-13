import { useState } from "react";
import instance from "../axios/client";
import type { DocumentCreate } from "../types/document";


export function Form()
{
  const[document, setDocument] = useState<DocumentCreate>({fileName: '', pageCount: 0, metadata: ''})

  const addDocument = async () => {
    if (document.fileName.trim() === '' || document.pageCount < 1) {
      return;
    }

    try {
      await instance.post<DocumentCreate>('/documents', document);
      setDocument({fileName: '', pageCount: 0, metadata: ''});
    } catch (err: any) {
      console.error('Error adding document:', err);
    }
  }
    return (
      <div>
        <h2 className="text-3xl font-bold mb-10">Add document</h2>
        <div className="flex flex-col gap-4">
          <p>File Name</p>
          <input className="border rounded-lg p-2" value={document.fileName} onChange={e => setDocument({...document, fileName: e.target.value})}></input>
          <p>Page count</p>
          <input className="border rounded-lg p-2" value={document.pageCount} onChange={e => setDocument({...document, pageCount: parseInt(e.target.value) || 0})}></input>
          <p>Metadata</p>
          <input className="border rounded-lg p-2" value={document.metadata} onChange={e => setDocument({...document, metadata: e.target.value})}></input>

          <button className="border p-2 mt-10" onClick={addDocument}>Add</button>
        </div>
      </div>
    );
}