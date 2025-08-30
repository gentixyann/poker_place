import { notFound } from 'next/navigation';
import { publicPokerPlaceService } from '@/app/lib/publicPokerPlaceService';
import PokerPlaceDetail from '@/app/components/PokerPlaceDetail';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PokerPlaceDetailPage({ params }: PageProps) {
  const { id } = await params;
  
  const pokerPlace = await publicPokerPlaceService.getPublishedPlaceById(id);

  if (!pokerPlace) {
    notFound();
  }

  return <PokerPlaceDetail pokerPlace={pokerPlace} />;
}