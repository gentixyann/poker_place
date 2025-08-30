"use client";

import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  getDoc,
  query,
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { PokerPlace, PokerPlaceFormData } from '@/app/types/PokerPlace';

const COLLECTION_NAME = 'places';

export const pokerPlaceService = {
  // ポーカー場一覧取得
  async getAll(): Promise<PokerPlace[]> {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      } as PokerPlace));
    } catch (error) {
      console.error('ポーカー場一覧取得エラー:', error);
      throw error;
    }
  },

  // ポーカー場詳細取得
  async getById(id: string): Promise<PokerPlace | null> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data(),
          createdAt: docSnap.data().createdAt?.toDate() || new Date(),
          updatedAt: docSnap.data().updatedAt?.toDate() || new Date(),
        } as PokerPlace;
      }
      return null;
    } catch (error) {
      console.error('ポーカー場取得エラー:', error);
      throw error;
    }
  },

  // ポーカー場作成
  async create(data: PokerPlaceFormData): Promise<string> {
    try {
      const now = Timestamp.now();
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...data,
        createdAt: now,
        updatedAt: now,
      });
      return docRef.id;
    } catch (error) {
      console.error('ポーカー場作成エラー:', error);
      throw error;
    }
  },

  // ポーカー場更新
  async update(id: string, data: PokerPlaceFormData): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('ポーカー場更新エラー:', error);
      throw error;
    }
  },

  // ポーカー場削除
  async delete(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
    } catch (error) {
      console.error('ポーカー場削除エラー:', error);
      throw error;
    }
  },

  // 公開状態変更
  async togglePublish(id: string, isPublished: boolean): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, {
        isPublished,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('公開状態変更エラー:', error);
      throw error;
    }
  },
};