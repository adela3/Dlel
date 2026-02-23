
export enum Tab {
  Doctors = 'doctors',
  Taxi = 'taxi',
  News = 'news',
  Offers = 'offers'
}

export type District = 'تكريت' | 'سامراء' | 'الشرقاط' | 'بيجي' | 'بلد' | 'الدجيل' | 'طوزخورماتو' | 'الكل';

export interface BaseEntity {
  id: number;
  name: string;
  phones: string[];
  district: District;
  description?: string;
  images?: string[];
  facebookUrl?: string;
  googleMapsUrl?: string;
}

export interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

export interface NewsArticle {
  id: number;
  title: string;
  content: string;
  image: string;
  date: string;
  category: 'خبر' | 'مقال' | 'إعلان عاجل';
  author?: string;
  phone?: string;
  facebook?: string;
  products?: Product[];
}

export interface Doctor extends BaseEntity {
  specialty: string;
  location: string;
}

export interface TaxiDriver extends BaseEntity {
  carModel: string;
  route: string;
}
