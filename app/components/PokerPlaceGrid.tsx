"use client";

import { useState, useEffect } from 'react';
import { PokerPlace } from '@/app/types/PokerPlace';
import { publicPokerPlaceService } from '@/app/lib/publicPokerPlaceService';
import PokerPlaceCard from './PokerPlaceCard';

export default function PokerPlaceGrid() {
  const [pokerPlaces, setPokerPlaces] = useState<PokerPlace[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const places = await publicPokerPlaceService.getPublishedPlaces();
        setPokerPlaces(places);
      } catch (error) {
        console.error('ポーカー場取得エラー:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-600">読み込み中...</div>
      </div>
    );
  }

  if (pokerPlaces.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <div className="text-gray-600 mb-2">
          <svg className="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <p>現在、公開されているポーカー場がありません</p>
          <p className="text-sm mt-1">管理者がポーカー場を登録・公開すると、ここに表示されます</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {pokerPlaces.map((place) => (
        <PokerPlaceCard key={place.id} pokerPlace={place} />
      ))}
    </div>
  );
}