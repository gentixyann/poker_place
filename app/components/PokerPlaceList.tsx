"use client";

import { useState, useEffect } from 'react';
import { PokerPlace } from '@/app/types/PokerPlace';
import { pokerPlaceService } from '@/app/lib/pokerPlaceService';

interface PokerPlaceListProps {
  onEdit: (pokerPlace: PokerPlace) => void;
  onAdd: () => void;
  refreshTrigger: number;
}

export default function PokerPlaceList({ onEdit, onAdd, refreshTrigger }: PokerPlaceListProps) {
  const [pokerPlaces, setPokerPlaces] = useState<PokerPlace[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchPokerPlaces();
  }, [refreshTrigger]);

  const fetchPokerPlaces = async () => {
    try {
      setLoading(true);
      const places = await pokerPlaceService.getAll();
      setPokerPlaces(places);
      setError('');
    } catch (error) {
      console.error('ポーカー場一覧取得エラー:', error);
      setError('ポーカー場一覧の取得に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`「${name}」を削除してもよろしいですか？`)) {
      return;
    }

    try {
      await pokerPlaceService.delete(id);
      setPokerPlaces(prev => prev.filter(place => place.id !== id));
    } catch (error) {
      console.error('削除エラー:', error);
      alert('削除に失敗しました');
    }
  };

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    try {
      await pokerPlaceService.togglePublish(id, !currentStatus);
      setPokerPlaces(prev => 
        prev.map(place => 
          place.id === id 
            ? { ...place, isPublished: !currentStatus }
            : place
        )
      );
    } catch (error) {
      console.error('公開状態変更エラー:', error);
      alert('公開状態の変更に失敗しました');
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-600">読み込み中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600">{error}</div>
        <button 
          onClick={fetchPokerPlaces}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          再読み込み
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">ポーカー場一覧</h2>
        <button
          onClick={onAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          新規登録
        </button>
      </div>

      {pokerPlaces.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-4">ポーカー場が登録されていません</p>
          <button
            onClick={onAdd}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            最初のポーカー場を登録する
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {pokerPlaces.map((place) => (
            <div key={place.id} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {place.name}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      place.isPublished 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {place.isPublished ? '公開中' : '非公開'}
                    </span>
                  </div>
                  
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>📍 {place.address}</p>
                    <p>🚃 {place.nearestStation}</p>
                    <p>🏷️ 設備・サービス: {place.amenities.length}件</p>
                    <p>❓ FAQ: {place.faqs.length}件</p>
                  </div>
                  
                  <div className="mt-2 text-xs text-gray-500">
                    作成日: {place.createdAt.toLocaleDateString()}
                    {place.updatedAt.getTime() !== place.createdAt.getTime() && (
                      <span> | 更新日: {place.updatedAt.toLocaleDateString()}</span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2 ml-4">
                  <button
                    onClick={() => onEdit(place)}
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                  >
                    編集
                  </button>
                  <button
                    onClick={() => handleTogglePublish(place.id!, place.isPublished)}
                    className={`px-3 py-1 text-sm rounded ${
                      place.isPublished
                        ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {place.isPublished ? '非公開' : '公開'}
                  </button>
                  <button
                    onClick={() => handleDelete(place.id!, place.name)}
                    className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                  >
                    削除
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}