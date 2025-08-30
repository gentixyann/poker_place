"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/app/hooks/useAuth';

export default function AdminDashboard() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin');
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      router.push('/admin');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-gray-900">
              Poker Place 管理画面
            </h1>
            
            {/* ハンバーガーメニューボタン */}
            <div className="relative">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md hover:bg-gray-100 transition duration-200"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              {/* ドロップダウンメニュー */}
              {isMenuOpen && (
                <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50 w-48">
                  <Link 
                    href="/"
                    className="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 transition duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    サイトへ
                  </Link>
                  <div className="px-4 py-2 text-sm text-gray-600 border-t border-gray-100">
                    {user.email}
                  </div>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition duration-200 border-t border-gray-100"
                  >
                    ログアウト
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Link href="/admin/places" className="block">
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                ポーカー場管理
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                ポーカー場の登録・編集・削除ができます
              </p>
              <div className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 text-center">
                管理画面へ
              </div>
            </div>
          </Link>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              予約管理
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              予約状況を確認・管理できます
            </p>
            <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-200">
              予約一覧
            </button>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            最近の活動
          </h2>
          <div className="text-gray-600 text-center py-8">
            データがありません
          </div>
        </div>
      </main>
    </div>
  );
}