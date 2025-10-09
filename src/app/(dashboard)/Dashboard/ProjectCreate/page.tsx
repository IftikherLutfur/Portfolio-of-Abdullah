'use client'; // client component
import useSWR from 'swr';
import ProjectTableData from '@/components/Project/ProjectTable';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function ProjectManagement() {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/project`,
    fetcher,
    { refreshInterval: 5000 } // প্রতি 5 সেকেন্ডে auto fetch
  );

  if (error) return <div>Error loading blogs</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <ProjectTableData projects={data.data} />
    </div>
  );
}
