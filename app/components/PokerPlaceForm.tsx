"use client";

import { useState, useEffect } from 'react';
import { PokerPlace, PokerPlaceFormData, FAQ } from '@/app/types/PokerPlace';
import ImageUpload from './ImageUpload';

interface PokerPlaceFormProps {
  pokerPlace?: PokerPlace;
  onSubmit: (data: PokerPlaceFormData) => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
}

export default function PokerPlaceForm({ 
  pokerPlace, 
  onSubmit, 
  onCancel, 
  isLoading 
}: PokerPlaceFormProps) {
  const [formData, setFormData] = useState<PokerPlaceFormData>({
    name: '',
    address: '',
    nearestStation: '',
    amenities: [],
    faqs: [],
    images: [],
    isPublished: false,
  });

  const [newAmenity, setNewAmenity] = useState('');
  const [newFaq, setNewFaq] = useState<FAQ>({ question: '', answer: '' });

  useEffect(() => {
    if (pokerPlace) {
      setFormData({
        name: pokerPlace.name,
        address: pokerPlace.address,
        nearestStation: pokerPlace.nearestStation,
        amenities: pokerPlace.amenities,
        faqs: pokerPlace.faqs,
        images: pokerPlace.images || [],
        isPublished: pokerPlace.isPublished,
      });
    }
  }, [pokerPlace]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const addAmenity = () => {
    if (newAmenity.trim()) {
      setFormData(prev => ({
        ...prev,
        amenities: [...prev.amenities, newAmenity.trim()]
      }));
      setNewAmenity('');
    }
  };

  const removeAmenity = (index: number) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index)
    }));
  };

  const addFaq = () => {
    if (newFaq.question.trim() && newFaq.answer.trim()) {
      setFormData(prev => ({
        ...prev,
        faqs: [...prev.faqs, { ...newFaq }]
      }));
      setNewFaq({ question: '', answer: '' });
    }
  };

  const removeFaq = (index: number) => {
    setFormData(prev => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        {pokerPlace ? 'ポーカー場編集' : 'ポーカー場登録'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ポーカー場名
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            placeholder="ポーカー場名を入力"
          />
        </div>

        <ImageUpload
          images={formData.images}
          onImagesChange={(images) => setFormData(prev => ({ ...prev, images }))}
          maxImages={3}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            住所
          </label>
          <textarea
            value={formData.address}
            onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
            required
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            placeholder="住所を入力"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            最寄駅
          </label>
          <input
            type="text"
            value={formData.nearestStation}
            onChange={(e) => setFormData(prev => ({ ...prev, nearestStation: e.target.value }))}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            placeholder="最寄駅を入力"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            設備・備品・サービス
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newAmenity}
              onChange={(e) => setNewAmenity(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              placeholder="設備・備品・サービスを入力"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAmenity())}
            />
            <button
              type="button"
              onClick={addAmenity}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              追加
            </button>
          </div>
          <div className="space-y-2">
            {formData.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md">
                <span className="text-gray-900">{amenity}</span>
                <button
                  type="button"
                  onClick={() => removeAmenity(index)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  削除
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            よくある質問
          </label>
          <div className="space-y-3 mb-4">
            <input
              type="text"
              value={newFaq.question}
              onChange={(e) => setNewFaq(prev => ({ ...prev, question: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              placeholder="質問を入力"
            />
            <textarea
              value={newFaq.answer}
              onChange={(e) => setNewFaq(prev => ({ ...prev, answer: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              placeholder="回答を入力"
            />
            <button
              type="button"
              onClick={addFaq}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              FAQ追加
            </button>
          </div>
          <div className="space-y-3">
            {formData.faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded-md">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900">Q: {faq.question}</h4>
                  <button
                    type="button"
                    onClick={() => removeFaq(index)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    削除
                  </button>
                </div>
                <p className="text-gray-700 text-sm">A: {faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="isPublished"
            checked={formData.isPublished}
            onChange={(e) => setFormData(prev => ({ ...prev, isPublished: e.target.checked }))}
            className="mr-2"
          />
          <label htmlFor="isPublished" className="text-sm font-medium text-gray-700">
            公開する
          </label>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? '保存中...' : (pokerPlace ? '更新' : '登録')}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
          >
            キャンセル
          </button>
        </div>
      </form>
    </div>
  );
}