import Link from 'next/link';
import { PokerPlace } from '@/app/types/PokerPlace';

interface PokerPlaceDetailProps {
  pokerPlace: PokerPlace;
}

export default function PokerPlaceDetail({ pokerPlace }: PokerPlaceDetailProps) {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <div className="max-w-md mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link 
              href="/"
              className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              一覧に戻る
            </Link>
            <h1 className="text-lg font-bold text-gray-900">
              Poker Place
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-8">
        {/* 画像表示 */}
        {pokerPlace.images && pokerPlace.images.length > 0 && (
          <div className="mb-6">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-100 mb-4">
              <img
                src={pokerPlace.images[0]}
                alt={pokerPlace.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {pokerPlace.images.length > 1 && (
              <div className="grid grid-cols-2 gap-2">
                {pokerPlace.images.slice(1).map((imageUrl, index) => (
                  <div key={index} className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={imageUrl}
                      alt={`${pokerPlace.name} 画像 ${index + 2}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 基本情報 */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {pokerPlace.name}
          </h1>
          
          <div className="space-y-3 text-sm">
            <div className="flex items-start">
              <svg className="w-5 h-5 mr-2 mt-0.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <div className="font-medium text-gray-700">住所</div>
                <div className="text-gray-900">{pokerPlace.address}</div>
              </div>
            </div>

            <div className="flex items-start">
              <svg className="w-5 h-5 mr-2 mt-0.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2v0a2 2 0 01-2-2v-2a2 2 0 00-2-2H8z" />
              </svg>
              <div>
                <div className="font-medium text-gray-700">最寄駅</div>
                <div className="text-gray-900">{pokerPlace.nearestStation}</div>
              </div>
            </div>
          </div>
        </div>

        {/* 設備・備品・サービス */}
        {pokerPlace.amenities && pokerPlace.amenities.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              設備・備品・サービス
            </h2>
            <div className="space-y-2">
              {pokerPlace.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-900 text-sm">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* よくある質問 */}
        {pokerPlace.faqs && pokerPlace.faqs.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              よくある質問
            </h2>
            <div className="space-y-4">
              {pokerPlace.faqs.map((faq, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="font-medium text-gray-900 mb-2">
                    Q. {faq.question}
                  </div>
                  <div className="text-gray-700 text-sm">
                    A. {faq.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 予約ボタン */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 font-medium">
            予約する（準備中）
          </button>
        </div>
      </main>
    </div>
  );
}