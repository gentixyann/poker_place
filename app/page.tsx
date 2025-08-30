import Link from "next/link";
import PokerPlaceGrid from "./components/PokerPlaceGrid";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <div className="max-w-md mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-gray-900">
              Poker Place
            </h1>
            <Link 
              href="/admin"
              className="text-sm text-gray-600 hover:text-gray-900 transition duration-200"
            >
              管理者ログイン
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            ポーカー場を探す
          </h2>
          <p className="text-gray-600 text-sm">
            お気に入りのポーカー場を見つけて予約しましょう
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              エリア
            </label>
            <select 
              id="location"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            >
              <option value="">エリアを選択</option>
              <option value="tokyo">東京</option>
              <option value="osaka">大阪</option>
              <option value="nagoya">名古屋</option>
              <option value="fukuoka">福岡</option>
            </select>
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
              日時
            </label>
            <input 
              type="datetime-local"
              id="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            />
          </div>

          <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200">
            検索
          </button>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">ポーカー場一覧</h3>
          <PokerPlaceGrid />
        </div>
      </main>

      <footer className="border-t border-gray-200 mt-16">
        <div className="max-w-md mx-auto px-4 py-8 text-center">
          <p className="text-sm text-gray-600">
            © 2024 Poker Place. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
