
import { Doctor, TaxiDriver, Tab, District, NewsArticle } from './types.ts';

export const OFFICIAL_WHATSAPP = "07740100909";
export const WHATSAPP_LINK = `https://wa.me/9647740100909`;

export const DISTRICTS: District[] = ['الكل', 'تكريت', 'سامراء', 'الشرقاط', 'بيجي', 'بلد', 'الدجيل', 'طوزخورماتو'];

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 1,
    title: "تخفيضات كبرى في مجمع العائلة السعيدة",
    category: "إعلان عاجل",
    date: "",
    image: "https://picsum.photos/seed/fashion-sale/800/600",
    content: "تخفيضات تصل إلى 50% على كافة الملابس الشتوية والمنزلية. للاستفسار اتصل بنا أو تابع صفحتنا.",
    phone: "07701112233",
    facebook: "https://facebook.com"
  },
  {
    id: 2,
    title: "مركز النور الطبي - عيادة الأسنان الحديثة",
    category: "خبر",
    date: "",
    image: "https://picsum.photos/seed/dentist-clinic/800/600",
    content: "نقدم لكم أحدث تقنيات تبييض وزراعة الأسنان في مركزنا المتطور. احجز موعدك الآن عبر الهاتف.",
    phone: "07712223344",
    facebook: "https://facebook.com"
  },
  {
    id: 3,
    title: "افتتاح مجمع تجاري جديد في سامراء",
    category: "إعلان عاجل",
    date: "",
    image: "https://picsum.photos/seed/modern-mall/800/600",
    content: "نرحب بكم في افتتاحنا الكبير. أحدث الموديلات والماركات العالمية بانتظاركم.",
    phone: "07705556677",
    facebook: "https://facebook.com"
  }
];

export const OFFERS_DATA: NewsArticle[] = [
  {
    id: 101,
    title: "خصم 25% على كافة الفحوصات المختبرية",
    category: "إعلان عاجل",
    date: "",
    image: "https://picsum.photos/seed/medical-lab/800/600",
    content: "يعلن مختبر الحياة عن خصم خاص لحاملي بطاقة الدليل على كافة تحاليل الدم والهرمونات. العرض ساري لنهاية الشهر.",
    phone: "07721112233",
    facebook: "https://facebook.com",
    products: [
      { id: 1, name: "فحص السكر", price: "5,000 د.ع", image: "https://picsum.photos/seed/blood-test/300/300" },
      { id: 2, name: "فحص الدم الكامل", price: "15,000 د.ع", image: "https://picsum.photos/seed/medical-report/300/300" },
      { id: 3, name: "فحص الفيتامينات", price: "25,000 د.ع", image: "https://picsum.photos/seed/vitamins/300/300" },
      { id: 4, name: "فحص الغدة", price: "20,000 د.ع", image: "https://picsum.photos/seed/thyroid/300/300" }
    ]
  },
  {
    id: 102,
    title: "عرض خاص من مركز صيانة الرواد",
    category: "إعلان عاجل",
    date: "",
    image: "https://picsum.photos/seed/car-service/800/600",
    content: "احصل على فحص مجاني للمحرك عند تبديل الزيت. العرض متوفر في فرع تكريت فقط.",
    phone: "07704445566",
    facebook: "https://facebook.com",
    products: [
      { id: 1, name: "زيت محرك أصلي", price: "35,000 د.ع", image: "https://picsum.photos/seed/engine-oil/300/300" },
      { id: 2, name: "فلتر زيت", price: "10,000 د.ع", image: "https://picsum.photos/seed/oil-filter/300/300" }
    ]
  },
  {
    id: 103,
    title: "توصيل مجاني لطلبات التكسي المسائية",
    category: "خبر",
    date: "",
    image: "https://picsum.photos/seed/taxi-night/800/600",
    content: "كابتن أبو علي يقدم توصيل مجاني داخل مركز المدينة للطلبات التي تتم بعد الساعة 10 مساءً.",
    phone: "07718889900",
    facebook: "https://facebook.com"
  }
];

const getImages = (id: number, type: string) => {
  const sets: Record<string, string[][]> = {
    doctors: [
      ["https://picsum.photos/seed/doctor-male/600/400", "https://picsum.photos/seed/medical-office/600/400"],
      ["https://picsum.photos/seed/doctor-female/600/400", "https://picsum.photos/seed/hospital-room/600/400"]
    ]
  };
  const categorySets = sets[type];
  if (!categorySets) return [];
  return categorySets[id % categorySets.length];
};

export const DOCTORS: Doctor[] = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  name: `د. ${['أحمد', 'علي', 'عمار', 'ياسين', 'محمد', 'سيف'][i % 6]} ${['الجبوري', 'التكريتي', 'العبيدي', 'الزبيدي'][i % 4]}`,
  specialty: ['باطنية وقلبية', 'طب وجراحة العيون', 'نسائية وتوليد', 'جراحة عامة', 'أطفال', 'كسور ومفاصل'][i % 6],
  location: "مجمع الأطباء الاستشاري",
  district: DISTRICTS[i % (DISTRICTS.length - 1) + 1],
  phones: [`0771${i}${i}${i}9988`],
  description: `العيادة التخصصية للدكتور رقم ${i + 1}، نستخدم أحدث الأجهزة التشخيصية لضمان أدق النتائج ومتابعة دورية للمرضى حتى التماثل للشفاء التام بإذن الله.`,
  images: getImages(i, 'doctors')
}));

export const TAXI_DRIVERS: TaxiDriver[] = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  name: `الكابتن ${['أبو علي', 'أبو فهد', 'سيف', 'مصطفى', 'رعد'][i % 5]}`,
  carModel: ['سايبا 2021', 'إلنترا 2018', 'كيا اوبتيما', 'تويوتا كورولا', 'سوناتا 2019'][i % 5],
  route: "توصيل لكافة أقضية المحافظة",
  district: DISTRICTS[i % (DISTRICTS.length - 1) + 1],
  phones: [`0772${i}${i}${i}4433`],
  description: `خدمة تكسي حديثة ومكيفة، ملتزمون بمعايير السلامة والدقة في المواعيد لتجربة سفر مريحة وآمنة.`,
  images: [`https://picsum.photos/seed/taxi-car-${i}/600/400`]
}));
