import Link from 'next/link';
import Image from 'next/image';
import { PokerPlace } from '@/app/types/PokerPlace';

interface PokerPlaceCardProps {
  pokerPlace: PokerPlace;
}

export default function PokerPlaceCard({ pokerPlace }: PokerPlaceCardProps) {
  const primaryImage = pokerPlace.images?.[0];

  return (
    <Link href={`/places/${pokerPlace.id}`} className="block">
      <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200">
        {/* 画像表示 */}
        <div className="aspect-[4/3] w-full overflow-hidden rounded-t-lg bg-gray-100">
          {primaryImage ? (
            <img
              src={primaryImage}
              alt={pokerPlace.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>

        {/* カード情報 */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
            {pokerPlace.name}
          </h3>
          
          <div className="space-y-1 text-sm text-gray-600">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="line-clamp-1">{pokerPlace.nearestStation}</span>
            </div>
            
            {pokerPlace.amenities.length > 0 && (
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span className="line-clamp-1">
                  {pokerPlace.amenities.slice(0, 2).join('、')}
                  {pokerPlace.amenities.length > 2 && ' など'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}