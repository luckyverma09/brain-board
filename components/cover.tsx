'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Button } from './ui/button';
import { ImageIcon, X } from 'lucide-react';
import { useCoverImage } from '@/hooks/use-cover-image';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useParams } from 'next/navigation';
import { Id } from '@/convex/_generated/dataModel';
import { useEdgeStore } from '@/lib/edgestore';
import { Skeleton } from '@/components/ui/skeleton';

interface CoverImageProps {
  url?: string;
  preview?: boolean;
}

export const CoverImage = ({ url, preview }: CoverImageProps) => {
  const { edgestore } = useEdgeStore();
  const coverImage = useCoverImage();
  const removeCoverImage = useMutation(api.documents.removeCoverImage);
  const params = useParams();

  const onRemove = async () => {
    if (url) {
      await edgestore.publicFiles.delete({
        url: url,
      });
    }
    removeCoverImage({ id: params.documentId as Id<'documents'> });
  };

  return (
    <div className={cn('relative w-full h-[35px] group', !url && 'h-[12vh]', url && 'bg-muted')}>
      {!!url && <Image src={url} layout='fill' alt='Cover image' className='object-cover' />}
      {url && !preview && (
        <div className=' opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2'>
          <Button
            onClick={() => coverImage.onReplace(url)}
            className='texe-muted-foreground text-xs'
            variant='outline'
            size='sm'
          >
            <ImageIcon className=' h-4 w-4  mr-2 ' />
            Change cover
          </Button>
          <Button
            onClick={onRemove}
            className='texe-muted-foreground text-xs'
            variant='outline'
            size='sm'
          >
            <X className=' h-4 w-4  mr-2 ' />
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};

//hello