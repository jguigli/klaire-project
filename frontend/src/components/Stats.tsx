import { useEffect, useState } from "react";
import instance from "../axios/client";
import type { DocumentStats } from "../types/document";


export function Stats()
{
  const[stats, setStats] = useState<DocumentStats[]>([]);
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await instance.get<DocumentStats[]>('/documents/stats');
        setStats(response.data);
      } catch (err: any) {
        console.error('Error fetching stats:', err);
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="w-full flex flex-row items-center">
        <h2 className="text-3xl font-bold mr-10">Stats</h2>
      <div className="w-full flex flex-row justify-center">
        <div className="flex flex-row gap-2">
          {stats.map((stat) => (
            <div className="border rounded-lg p-2" key={stat.status}>{stat.status} : {stat.total_pages} pages</div>
          ))}
        </div>
      </div>
    </div>
  );
}