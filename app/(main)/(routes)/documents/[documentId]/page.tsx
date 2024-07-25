'use client';

import { CoverImage } from '@/components/cover';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import Toolbar from '@/components/toolbar';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { Skeleton } from '@/components/ui/skeleton';

import { useMutation, useQuery } from 'convex/react';

interface DocumentIdPageProps {
  params: {
    documentId: Id<'documents'>;
  };
}

const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
  const Editor = useMemo(() => dynamic(() => import('@/components/editor'), { ssr: false }), []);
  const document = useQuery(api.documents.getById, { id: params.documentId });

  const update = useMutation(api.documents.update);

  const onChange = (content: string) => {
    update({ id: params.documentId, content });
  };

  if (document === undefined) {
    return <div>Loading...</div>;
  }

  if (document === null) {
    return <div>Not found</div>;
  }

  return (
    <div className=' pb-40'>
      <CoverImage url={document.coverImage} />
      <div className=' md:max-w-3xl lg:max-w-4xl mx-auto'>
        <Toolbar initialData={document} />
        <Editor onChange={onChange} initialContent={document.content} />
      </div>
    </div>
  );
};

export default DocumentIdPage;
