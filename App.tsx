
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Stethoscope, 
  Car, 
  Menu, 
  X, 
  Search, 
  ChevronRight,
  MapPin, 
  Info, 
  ShieldCheck, 
  MessageCircle, 
  Plus, 
  Copy, 
  LayoutGrid, 
  PhoneCall,
  ImageIcon,
  Facebook,
  Navigation,
  ChevronLeft,
  Clock,
  User,
  Megaphone,
  ArrowUpRight,
  Send,
  TicketPercent,
  Sparkles,
  Tag,
  ShoppingBag
} from 'lucide-react';
import { Tab, NewsArticle } from './types.ts';
import { DOCTORS, TAXI_DRIVERS, WHATSAPP_LINK, NEWS_ARTICLES, OFFERS_DATA } from './constants.tsx';

type SubPage = 'none' | 'about' | 'privacy' | 'contact';

const NewsCard: React.FC<{ article: NewsArticle; onClick: () => void; isFeatured?: boolean }> = ({ article, onClick, isFeatured }) => {
  if (isFeatured) {
    return (
      <div onClick={onClick} className="relative w-full h-48 rounded-[32px] overflow-hidden shadow-lg active:scale-95 transition-all group border border-gray-100 shrink-0 cursor-pointer">
        <img src={article.image} alt={article.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
        
        <div className="absolute bottom-6 right-6 left-6 text-right z-10">
          <h3 className="text-white font-black text-lg leading-tight drop-shadow-md">{article.title}</h3>
        </div>
      </div>
    );
  }

  return (
    <div onClick={onClick} className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-gray-100 active:scale-[0.98] transition-all mb-3">
      <div className="relative h-32">
        <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4 text-right">
        <h3 className="text-gray-900 font-black text-base leading-tight">{article.title}</h3>
      </div>
    </div>
  );
};

const ListCard: React.FC<{ item: any; type: Tab; onClick: () => void }> = ({ item, type, onClick }) => {
  const isOffer = type === Tab.Offers;
  const getIcon = () => {
    if (isOffer) return TicketPercent;
    switch(type) {
      case Tab.Doctors: return Stethoscope;
      case Tab.Taxi: return Car;
      default: return LayoutGrid;
    }
  };
  const Icon = getIcon();
  const getColor = () => {
    if (isOffer) return 'rose';
    switch(type) {
      case Tab.Doctors: return 'emerald';
      case Tab.Taxi: return 'sky';
      default: return 'emerald';
    }
  };
  const color = getColor();
  
  return (
    <div onClick={onClick} className={`bg-white rounded-[24px] p-4 border border-gray-100 flex items-center justify-between shadow-sm text-right active:scale-[0.98] transition-all cursor-pointer hover:shadow-md group mb-3 relative overflow-hidden ${isOffer ? 'border-rose-100' : ''}`}>
      {isOffer && (
        <div className="absolute -left-6 top-4 -rotate-45 bg-rose-500 text-white text-[8px] font-black px-8 py-1 shadow-sm uppercase tracking-tighter">خصم</div>
      )}
      <div className="flex-1 min-w-0 pr-1">
        <h3 className={`font-black text-gray-900 text-sm group-hover:text-${color}-700 transition-colors truncate`}>{item.name || item.title}</h3>
        <div className="flex items-center gap-1.5 justify-end mt-1">
          <span className={`text-[9px] text-${color}-600 font-black px-1.5 py-0.5 bg-${color}-50 rounded-md truncate`}>
            {item.specialty || item.cuisine || item.brand || item.type || item.carModel || item.serviceType || item.category || 'عرض لفترة محدودة'}
          </span>
          <span className="text-[9px] text-gray-400 font-bold">{item.district || 'محافظة صلاح الدين'}</span>
        </div>
      </div>
      <div className={`w-14 h-14 rounded-2xl overflow-hidden relative border-2 border-white shadow-sm shrink-0 mr-4 bg-${color}-50`}>
        {item.image || (item.images && item.images.length > 0) ? (
          <img src={item.image || item.images[0]} alt={item.name || item.title} className="w-full h-full object-cover" />
        ) : (
          <div className={`w-full h-full flex items-center justify-center text-${color}-600`}><Icon size={24} /></div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [currentSubPage, setCurrentSubPage] = useState<SubPage>('none');
  const [selectedEntity, setSelectedEntity] = useState<{ data: any; type: Tab | 'news' } | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [offerScrollIndex, setOfferScrollIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!activeTab) {
      const interval = setInterval(() => {
        setFeaturedIndex((prev) => (prev + 1) % NEWS_ARTICLES.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [activeTab]);

  useEffect(() => {
    if (!activeTab) {
      const interval = setInterval(() => {
        setOfferScrollIndex((prev) => (prev + 1) % OFFERS_DATA.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [activeTab]);

  useEffect(() => {
    if (selectedEntity && selectedEntity.data.images && selectedEntity.data.images.length > 1) {
      const interval = setInterval(() => {
        setModalImageIndex((prev) => (prev + 1) % selectedEntity.data.images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [selectedEntity]);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setSearchQuery('');
    window.scrollTo(0, 0);
  };

  const handleBackToMenu = () => {
    setActiveTab(null);
    setSearchQuery('');
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const getEntityList = (tab: Tab) => {
    switch(tab) {
      case Tab.Doctors: return DOCTORS;
      case Tab.Taxi: return TAXI_DRIVERS;
      case Tab.Offers: return OFFERS_DATA;
      default: return [];
    }
  };

  const filteredItems = useMemo(() => {
    if (!activeTab) return [];
    if (activeTab === Tab.News) return [];
    const list = getEntityList(activeTab);
    return list.filter((item: any) => {
      const name = item.name || item.title || '';
      const meta = item.specialty || item.cuisine || item.brand || item.type || item.district || item.serviceType || item.category || '';
      return name.includes(searchQuery) || meta.includes(searchQuery);
    });
  }, [activeTab, searchQuery]);

  const getThemeColor = (type: Tab | 'news' | undefined) => {
    switch (type) {
      case Tab.Doctors: return 'emerald';
      case Tab.Taxi: return 'sky';
      case Tab.Offers: return 'rose';
      case 'news': return 'blue';
      default: return 'emerald';
    }
  };

  const categories = [
    { id: Tab.Doctors, name: 'الدليل الطبي', icon: <Stethoscope size={24} />, bg: 'from-emerald-500 to-teal-600' },
    { id: Tab.Taxi, name: 'سيارات الأجرة والنقل', icon: <Car size={24} />, bg: 'from-sky-500 to-blue-600' },
  ];

  const handleModalImageChange = (direction: 'next' | 'prev', total: number) => {
    if (direction === 'next') setModalImageIndex(prev => (prev + 1) % total);
    else setModalImageIndex(prev => (prev - 1 + total) % total);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden relative" dir="rtl">
      {showSplash && (
        <div className="fixed inset-0 z-[1000] bg-white flex flex-col items-center justify-center splash-screen">
          <div className="w-28 h-28 bg-emerald-50 text-emerald-600 rounded-[35px] flex items-center justify-center mb-6 shadow-2xl animate-logo-pulse border border-emerald-100">
            <LayoutGrid size={56} />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-1 tracking-tight">دليل صلاح الدين</h2>
          <p className="text-emerald-600 font-black text-sm tracking-widest opacity-80 uppercase">Saladin Guide</p>
        </div>
      )}

      {isSidebarOpen && <div className="fixed inset-0 bg-black/40 z-[90] backdrop-blur-[2px]" onClick={() => setIsSidebarOpen(false)} />}
      <aside className={`fixed top-0 right-0 h-full w-64 bg-white z-[100] shadow-2xl transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 flex flex-col h-full text-right">
          <button onClick={() => setIsSidebarOpen(false)} className="self-start p-2 hover:bg-gray-100 rounded-full mb-8"><X size={20} className="text-gray-400" /></button>
          <nav className="space-y-2">
            {[ 
              { id: 'about', label: 'عن التطبيق', icon: <Info size={18} /> }, 
              { id: 'privacy', label: 'سياسة الخصوصية', icon: <ShieldCheck size={18} /> }, 
              { id: 'contact', label: 'تواصل معنا', icon: <MessageCircle size={18} /> } 
            ].map((item) => (
              <button key={item.id} onClick={() => { setCurrentSubPage(item.id as SubPage); setIsSidebarOpen(false); }} className="flex items-center gap-3 w-full p-3 hover:bg-emerald-50 rounded-xl transition-colors text-gray-700 font-black justify-end">
                <span>{item.label}</span><div className="text-emerald-600">{item.icon}</div>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      <header className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-[50] h-16 shrink-0 border-b border-gray-50">
        <button onClick={() => setIsSidebarOpen(true)} className="p-2 bg-gray-50 rounded-xl text-gray-700 active:scale-95 transition-all"><Menu size={22} /></button>
        <h1 className="text-base font-black text-gray-900 truncate flex-1 text-center">
          {activeTab ? (activeTab === Tab.Offers ? 'العروض والخصومات' : categories.find(c => c.id === activeTab)?.name || 'التفاصيل') : 'دليل صلاح الدين'}
        </h1>
        <div className="w-10 flex justify-end">
          {activeTab && (
            <button onClick={handleBackToMenu} className="p-2 text-emerald-600 active:scale-95 transition-all"><ChevronLeft size={24} /></button>
          )}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar relative">
        {!activeTab ? (
          <div className="p-4 space-y-8 animate-in fade-in duration-500 pb-16">
            
            <div className="space-y-4">
              <div className="relative w-full overflow-hidden rounded-[32px] bg-white border border-gray-50 shadow-sm h-48">
                <div className="flex h-full transition-transform duration-1000 ease-in-out" dir="ltr" style={{ transform: `translateX(-${featuredIndex * 100}%)`, width: `${NEWS_ARTICLES.length * 100}%` }}>
                  {NEWS_ARTICLES.map((article) => (
                    <NewsCard key={article.id} article={article} isFeatured onClick={() => { setSelectedEntity({ data: article, type: 'news' }); setModalImageIndex(0); }} />
                  ))}
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                  {NEWS_ARTICLES.map((_, i) => (
                    <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${featuredIndex === i ? 'w-4 bg-white shadow-sm' : 'w-1.5 bg-white/40'}`} />
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3.5">
                {categories.map((item) => (
                  <button key={item.id} onClick={() => handleTabChange(item.id)} className={`relative overflow-hidden group rounded-[26px] h-24 shadow-sm transition-all active:scale-95 border border-gray-100 col-span-2`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.bg}`} />
                    <div className="relative h-full flex items-center justify-center gap-3 px-4">
                      <div className="bg-white/15 backdrop-blur-sm p-2 rounded-xl text-white border border-white/10">{item.icon}</div>
                      <span className={`text-white font-black text-lg`}>{item.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <button onClick={() => handleTabChange(Tab.Offers)} className="text-[10px] text-rose-600 font-black flex items-center gap-1">عرض الكل <ChevronLeft size={12} /></button>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-black text-gray-800">أحدث العروض والخصومات</h2>
                  <TicketPercent size={16} className="text-rose-500" />
                </div>
              </div>
              
              <div className="relative overflow-hidden rounded-[32px]">
                <div className="flex transition-transform duration-1000 ease-in-out" dir="ltr" style={{ transform: `translateX(-${offerScrollIndex * 100}%)`, width: `${OFFERS_DATA.length * 100}%` }}>
                  {OFFERS_DATA.map((offer) => (
                    <div 
                      key={offer.id} 
                      onClick={() => { setSelectedEntity({ data: offer, type: Tab.Offers }); setModalImageIndex(0); }}
                      className="w-full shrink-0 px-1"
                    >
                      <div className="bg-white rounded-[32px] overflow-hidden border border-rose-100 shadow-sm active:scale-[0.98] transition-all cursor-pointer group">
                        <div className="relative h-40">
                          <img src={offer.image} alt={offer.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          <div className="absolute top-3 right-3 bg-rose-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg">خصم حصري</div>
                        </div>
                        <div className="p-4 text-right">
                          <h3 className="text-gray-900 font-black text-sm leading-tight mb-2 line-clamp-1">{offer.title}</h3>
                          <p className="text-[10px] text-gray-500 font-bold line-clamp-2 mb-3 leading-relaxed">{offer.content}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 text-rose-600">
                              <Sparkles size={12} />
                              <span className="text-[10px] font-black">احصل عليه الآن</span>
                            </div>
                            <div className="w-8 h-8 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600">
                              <ArrowUpRight size={16} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                  {OFFERS_DATA.map((_, i) => (
                    <div key={i} className={`h-1 rounded-full transition-all duration-300 ${offerScrollIndex === i ? 'w-4 bg-rose-500' : 'w-1 bg-rose-200'}`} />
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a href={WHATSAPP_LINK} target="_blank" className="w-full bg-white border-2 border-emerald-100 p-6 rounded-[32px] flex items-center justify-between group active:scale-[0.98] transition-all shadow-sm">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
                  <Send size={24} />
                </div>
                <div className="flex-1 text-right px-4">
                  <h3 className="text-gray-900 font-black text-sm">أضف معلوماتك أو أعلن معنا</h3>
                  <p className="text-[10px] font-bold text-gray-400 mt-0.5">تواصل مع إدارة التطبيق عبر الواتساب</p>
                </div>
                <ChevronLeft size={20} className="text-emerald-200 group-hover:text-emerald-500 transition-colors" />
              </a>
            </div>

            <div className="text-center pt-4 opacity-50">
              <span className="text-[10px] font-black text-gray-400">دليل صلاح الدين الشامل - بوابتك للخدمات</span>
            </div>
          </div>
        ) : (
          <div className="relative min-h-full animate-in fade-in">
            {/* Show search only if NOT in Offers tab */}
            {activeTab !== Tab.Offers && (
              <div className="sticky top-0 z-[40] bg-gray-50/95 backdrop-blur-md px-4 py-4 border-b border-gray-100">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="ابحث هنا...." 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                    className="w-full bg-white border border-gray-100 rounded-2xl py-3 pr-10 pl-4 text-xs focus:ring-2 focus:ring-emerald-500/20 text-right font-black shadow-sm" 
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                </div>
              </div>
            )}
            <div className="px-4 pt-4 pb-20">
              {filteredItems.map(item => <ListCard key={item.id} item={item} type={activeTab} onClick={() => { setSelectedEntity({ data: item, type: activeTab }); setModalImageIndex(0); }} />)}
              {filteredItems.length === 0 && (
                <div className="py-20 text-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                    <Search size={32} />
                  </div>
                  <p className="text-gray-400 font-bold">لا توجد نتائج مطابقة</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {selectedEntity && (
        <div className="fixed inset-0 z-[120] bg-white flex flex-col animate-in slide-in-from-left duration-300 overflow-hidden" dir="rtl">
          <header className="sticky top-0 bg-white/90 backdrop-blur-md z-30 h-14 flex items-center justify-between px-4 border-b border-gray-100 shrink-0">
             <button onClick={() => setSelectedEntity(null)} className="p-2 text-emerald-600 font-black text-xs flex items-center gap-1"><ChevronRight size={24} />رجوع</button>
             <h2 className="text-sm font-black text-gray-800 truncate px-4">{(selectedEntity.type === 'news' || selectedEntity.type === Tab.Offers) ? 'دليل صلاح الدين' : 'تفاصيل الحساب'}</h2>
             <div className="w-10"></div>
          </header>
          <div className="flex-1 overflow-y-auto no-scrollbar pb-10">
            <div className={`relative h-[30vh] bg-gray-100 overflow-hidden`}>
              {(selectedEntity.type === 'news' || selectedEntity.type === Tab.Offers) ? (
                 <div className="w-full h-full"><img src={selectedEntity.data.image} alt={selectedEntity.data.title} className="w-full h-full object-cover" /></div>
              ) : (
                <div className="relative h-full w-full">
                  <div className="flex h-full transition-transform duration-500 ease-out" dir="ltr" style={{ transform: `translateX(-${modalImageIndex * 100}%)`, width: `${(selectedEntity.data.images?.length || 1) * 100}%` }}>
                    {(selectedEntity.data.images || [""]).map((img: string, idx: number) => (
                      <div key={idx} className="w-full h-full relative shrink-0">
                        {img ? <img src={img} alt={selectedEntity.data.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-300"><ImageIcon size={48} /></div>}
                      </div>
                    ))}
                  </div>
                  {selectedEntity.data.images && selectedEntity.data.images.length > 1 && (
                    <>
                      <button onClick={() => handleModalImageChange('prev', selectedEntity.data.images.length)} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/20 backdrop-blur-sm rounded-full text-white"><ChevronLeft size={20} /></button>
                      <button onClick={() => handleModalImageChange('next', selectedEntity.data.images.length)} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/20 backdrop-blur-sm rounded-full text-white"><ChevronRight size={20} /></button>
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
                        {selectedEntity.data.images.map((_: any, i: number) => (
                          <div key={i} className={`h-1.5 rounded-full transition-all ${modalImageIndex === i ? 'w-4 bg-white' : 'w-1.5 bg-white/50'}`} />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="px-5 py-6 space-y-6">
              {(selectedEntity.type === 'news' || selectedEntity.type === Tab.Offers) ? (
                <div className="text-right space-y-6">
                  <div className="relative">
                    {selectedEntity.type === Tab.Offers && (
                      <div className="flex items-center gap-2 mb-2 text-rose-600">
                        <Tag size={14} className="fill-current" />
                        <span className="text-[10px] font-black uppercase tracking-wider">عرض حصري وتخفيض</span>
                      </div>
                    )}
                    <h2 className="font-black text-xl text-gray-900 leading-tight border-b pb-4">{selectedEntity.data.title}</h2>
                  </div>
                  
                  <div className={`p-6 rounded-[28px] border-2 shadow-sm leading-relaxed text-sm font-bold text-gray-700 whitespace-pre-wrap relative ${selectedEntity.type === Tab.Offers ? 'bg-rose-50/30 border-rose-100' : 'bg-white border-gray-50'}`}>
                    {selectedEntity.type === Tab.Offers && (
                      <div className="absolute -top-3 -right-3 bg-rose-500 text-white p-2 rounded-xl shadow-lg animate-pulse">
                        <Sparkles size={16} />
                      </div>
                    )}
                    {selectedEntity.data.content}
                  </div>

                  {selectedEntity.type === Tab.Offers && selectedEntity.data.products && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-end gap-2 px-1">
                        <h3 className="text-sm font-black text-gray-800">المنتجات المشمولة بالعرض</h3>
                        <ShoppingBag size={16} className="text-rose-500" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {selectedEntity.data.products.map((product: any) => (
                          <div key={product.id} className="bg-white rounded-3xl border border-rose-50 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <div className="h-28 relative">
                              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                                <span className="text-white font-black text-[10px]">{product.price}</span>
                              </div>
                            </div>
                            <div className="p-3 text-right">
                              <h4 className="text-[11px] font-black text-gray-900 line-clamp-1">{product.name}</h4>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-3 p-3 bg-gray-50 rounded-[32px] border border-gray-100">
                     {selectedEntity.data.facebook && (
                       <a href={selectedEntity.data.facebook} target="_blank" className="flex items-center justify-center gap-2 bg-[#1877F2] text-white py-4 rounded-2xl font-black text-xs shadow-sm active:scale-95 transition-all">
                         <Facebook size={18} /> الفيسبوك
                       </a>
                     )}
                     {selectedEntity.data.phone && (
                       <a href={`tel:${selectedEntity.data.phone}`} className={`flex items-center justify-center gap-2 text-white py-4 rounded-2xl font-black text-xs shadow-sm active:scale-95 transition-all ${selectedEntity.type === Tab.Offers ? 'bg-rose-600' : 'bg-emerald-600'}`}>
                         <PhoneCall size={18} /> اتصل الآن
                       </a>
                     )}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-right">
                    <h2 className="font-black text-2xl text-gray-900 leading-tight">{selectedEntity.data.name}</h2>
                    <div className="flex items-center gap-2 justify-end mt-1">
                      <span className={`inline-block text-[10px] font-black text-${getThemeColor(selectedEntity.type as Tab)}-600 bg-${getThemeColor(selectedEntity.type as Tab)}-50 px-3 py-1 rounded-lg`}>
                          {selectedEntity.data.specialty || selectedEntity.data.cuisine || selectedEntity.data.brand || selectedEntity.data.type || selectedEntity.data.carModel || selectedEntity.data.serviceType}
                      </span>
                      <span className="text-[10px] text-gray-400 font-black px-2 py-1 bg-gray-50 rounded-lg border border-gray-100">{selectedEntity.data.district}</span>
                    </div>
                  </div>
                  
                  {selectedEntity.data.description && (
                    <div className="bg-emerald-50/30 p-5 rounded-[24px] border border-emerald-100/30">
                      <h4 className="text-[10px] font-black text-emerald-700 mb-2 opacity-50">عن الخدمة / نبذة</h4>
                      <p className="text-xs font-bold text-gray-700 leading-relaxed text-right">{selectedEntity.data.description}</p>
                    </div>
                  )}

                  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
                    <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 shrink-0"><MapPin size={20} /></div>
                    <div className="text-right flex-1"><p className="text-[9px] font-black text-gray-400 mb-0.5">العنوان</p><p className="text-sm font-black text-gray-800 leading-relaxed">{selectedEntity.data.location || selectedEntity.data.route}</p></div>
                  </div>
                  {selectedEntity.data.facebookUrl || selectedEntity.data.googleMapsUrl ? (
                    <div className="grid grid-cols-2 gap-3">
                      {selectedEntity.data.facebookUrl && <a href={selectedEntity.data.facebookUrl} target="_blank" className="flex items-center justify-center gap-2 bg-[#1877F2] text-white py-4 rounded-2xl font-black text-xs shadow-sm"><Facebook size={18} />الفيسبوك</a>}
                      {selectedEntity.data.googleMapsUrl && <a href={selectedEntity.data.googleMapsUrl} target="_blank" className="flex items-center justify-center gap-2 bg-white border border-gray-100 text-gray-800 py-4 rounded-2xl font-black text-xs shadow-sm"><Navigation size={18} className="text-emerald-500" />الخريطة</a>}
                    </div>
                  ) : null}
                  <div className="space-y-3">
                    {selectedEntity.data.phones.map((phone: string, idx: number) => (
                      <div key={idx} className="flex gap-3 items-center h-14">
                        <div className="flex-1 flex items-center justify-between px-5 h-full bg-white border border-gray-100 rounded-2xl shadow-sm">
                          <span className="text-lg font-black text-gray-800 font-sans">{phone}</span>
                          <button onClick={() => handleCopy(phone, idx)} className="p-2 text-gray-300"><Copy size={18} /></button>
                        </div>
                        <a href={`tel:${phone}`} className="w-14 h-full bg-green-500 text-white rounded-2xl shadow-lg flex items-center justify-center shrink-0"><PhoneCall size={24} /></a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <footer className="bg-white h-12 flex items-center justify-center z-40 border-t border-gray-50 shrink-0">
        <span className="text-[10px] font-black text-gray-300">© 2024 دليل محافظة صلاح الدين الشامل</span>
      </footer>
    </div>
  );
}
