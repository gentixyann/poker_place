"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/hooks/useAuth';
import { PokerPlace, PokerPlaceFormData } from '@/app/types/PokerPlace';
import { pokerPlaceService } from '@/app/lib/pokerPlaceService';
import PokerPlaceList from './PokerPlaceList';
import PokerPlaceForm from './PokerPlaceForm';

type ViewMode = 'list' | 'add' | 'edit';

export default function PokerPlaceManagement() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedPlace, setSelectedPlace] = useState<PokerPlace | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">読み込み中...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleAdd = () => {
    setSelectedPlace(null);
    setViewMode('add');
  };

  const handleEdit = (place: PokerPlace) => {
    setSelectedPlace(place);
    setViewMode('edit');
  };

  const handleCancel = () => {
    setSelectedPlace(null);
    setViewMode('list');
  };

  const handleSubmit = async (data: PokerPlaceFormData) => {
    setIsSubmitting(true);
    try {
      if (viewMode === 'edit' && selectedPlace?.id) {
        await pokerPlaceService.update(selectedPlace.id, data);
      } else {
        await pokerPlaceService.create(data);
      }
      
      setViewMode('list');
      setSelectedPlace(null);
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      console.error('保存エラー:', error);
      alert('保存に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/admin/dashboard')}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                ← ダッシュボード
              </button>
              <h1 className="text-xl font-bold text-gray-900">
                ポーカー場管理
              </h1>
            </div>
            <span className="text-sm text-gray-600">{user.email}</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {viewMode === 'list' && (
          <PokerPlaceList
            onEdit={handleEdit}
            onAdd={handleAdd}
            refreshTrigger={refreshTrigger}
          />
        )}
        
        {(viewMode === 'add' || viewMode === 'edit') && (
          <PokerPlaceForm
            pokerPlace={selectedPlace || undefined}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={isSubmitting}
          />
        )}
      </main>
    </div>
  );
}