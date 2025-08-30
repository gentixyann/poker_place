import { 
  collection, 
  getDocs, 
  getDoc,
  doc,
  query,
  where,
  orderBy
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { PokerPlace } from '@/app/types/PokerPlace';

const COLLECTION_NAME = 'places';

// 公開されているポーカー場のみを取得するサーバーサイド用サービス
export const publicPokerPlaceService = {
  // 公開されているポーカー場一覧取得
  async getPublishedPlaces(): Promise<PokerPlace[]> {
    try {
      const q = query(
        collection(db, COLLECTION_NAME), 
        where('isPublished', '==', true),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      } as PokerPlace));
    } catch (error) {
      console.error('公開ポーカー場一覧取得エラー:', error);
      return [];
    }
  },

  // 公開されているポーカー場詳細取得
  async getPublishedPlaceById(id: string): Promise<PokerPlace | null> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        
        // 公開されている場合のみ返す
        if (data.isPublished) {
          return {
            id: docSnap.id,
            ...data,
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date(),
          } as PokerPlace;
        }
      }
      return null;
    } catch (error) {
      console.error('公開ポーカー場取得エラー:', error);
      return null;
    }
  },
};