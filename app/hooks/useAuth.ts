"use client";

import { useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // ユーザーが管理者かどうかをFirestoreで確認
        try {
          const adminDoc = await getDoc(doc(db, 'users', 'admin', 'admins', user.uid));
          if (adminDoc.exists()) {
            setUser(user);
            setIsAdmin(true);
          } else {
            // 管理者でない場合はログアウト
            await signOut(auth);
            setUser(null);
            setIsAdmin(false);
          }
        } catch (error) {
          console.error('管理者確認エラー:', error);
          setUser(null);
          setIsAdmin(false);
        }
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      
      // ログイン後、管理者かどうかを確認
      const adminDoc = await getDoc(doc(db, 'users', 'admin', 'admins', result.user.uid));
      if (!adminDoc.exists()) {
        await signOut(auth);
        return { 
          success: false, 
          error: '管理者権限がありません' 
        };
      }
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'ログインに失敗しました' 
      };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'ログアウトに失敗しました' 
      };
    }
  };

  return { user, isAdmin, loading, login, logout };
}