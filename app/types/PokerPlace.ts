export interface PokerPlace {
  id?: string;
  name: string;
  address: string;
  nearestStation: string;
  amenities: string[]; // 設備・備品・サービス
  faqs: FAQ[];
  images: string[]; // Firebase Storage URLs (最大3枚)
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface PokerPlaceFormData {
  name: string;
  address: string;
  nearestStation: string;
  amenities: string[];
  faqs: FAQ[];
  images: string[];
  isPublished: boolean;
}