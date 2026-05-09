import { useState, useEffect } from 'react';
import { db } from '@/src/lib/firebase';
import { collection, query, where, getDocs, doc, getDoc, addDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { 
  Users, 
  History, 
  Loader2, 
  Calendar,
  Wallet,
  Bell,
  Trash2,
  AlertCircle,
  Search,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ExternalLink,
  Plus
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Link } from 'react-router-dom';

interface Props {
  activeTab: string;
  userData: any;
  user: User;
}

export default function ParentOverview({ activeTab, userData, user }: Props) {
  const [children, setChildren] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadChildren();
  }, []);

  const loadChildren = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'parentChildren'), where('parentId', '==', user.uid));
      const snap = await getDocs(q);
      const list = [];
      for (const d of snap.docs) {
        const link = d.data();
        const cSnap = await getDoc(doc(db, 'users', link.childId));
        if (cSnap.exists()) {
          list.push({ linkId: d.id, ...link, childData: cSnap.data() });
        }
      }
      setChildren(list);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderChildren = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="rounded-[32px] border border-gray-100 bg-white p-8 shadow-sm">
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-brand">
                <Users size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-blue-dark">منظوري المتابعون</h3>
                <p className="text-gray-400 text-sm font-bold">تابع تقدم أبنائك الدراسي في لحظة.</p>
              </div>
            </div>
            <button className="flex items-center justify-center gap-2 rounded-2xl bg-blue-dark px-6 py-3 text-sm font-black text-white hover:bg-[#0A0D14] shadow-xl shadow-blue-900/10 transition-all active:scale-95">
              <Plus size={18} />
              ربط تلميذ جديد
            </button>
        </div>
        
        {loading ? (
            <div className="py-24 text-center">
              <Loader2 className="mx-auto h-12 w-12 animate-spin text-gray-100" />
              <p className="mt-4 text-gray-300 font-bold italic">جاري تحميل البيانات...</p>
            </div>
        ) : children.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {children.map(c => (
              <div key={c.linkId} className="group relative rounded-[32px] border border-gray-50 bg-gray-50/30 p-8 transition-all hover:bg-white hover:border-blue-light/10 hover:shadow-2xl hover:shadow-blue-900/5">
                  <div className="flex items-center gap-5 mb-8">
                    <div className="flex h-16 w-16 items-center justify-center rounded-[22px] bg-white shadow-xl shadow-blue-900/5 border border-gray-100 text-blue-brand font-black text-2xl group-hover:scale-110 transition-transform">
                      {c.childData.displayName?.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-black text-blue-dark text-lg truncate">{c.childData.displayName}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[0.7rem] bg-gray-100 px-2.5 py-0.5 rounded-full text-gray-500 font-black">السنة {c.childData.level}</span>
                        <div className={cn(
                          "h-2 w-2 rounded-full",
                          c.childData.subscriptionStatus === 'active' ? "bg-emerald-500" : "bg-amber-500"
                        )} />
                        <span className={cn(
                          "text-[0.7rem] font-bold",
                          c.childData.subscriptionStatus === 'active' ? "text-emerald-500" : "text-amber-500"
                        )}>{c.childData.subscriptionStatus === 'active' ? 'مشترك' : 'غير مشترك'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4 pt-6 border-t border-gray-100/50">
                    <div className="flex items-center justify-between">
                       <span className="text-xs font-bold text-gray-400">التقدم في الدروس</span>
                       <span className="text-xs font-black text-blue-dark">0%</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                       <div className="h-full bg-blue-brand w-0" />
                    </div>
                  </div>

                  <div className="mt-8 flex gap-3">
                    <button className="flex-1 rounded-2xl bg-white border border-gray-100 py-3 text-[0.8rem] font-black text-gray-600 hover:border-blue-light hover:text-blue-light transition-all">التقرير</button>
                    <button className="flex-1 rounded-2xl bg-[#0A0D14] py-3 text-[0.8rem] font-black text-white hover:bg-blue-dark transition-all">التفاصيل</button>
                  </div>
                  
                  <div className="absolute top-4 left-4 h-8 w-8 rounded-full border border-gray-50 flex items-center justify-center text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity">
                     <ArrowRight size={14} className="ltr:rotate-0 rtl:rotate-180" />
                  </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center text-gray-400 border-2 border-dashed border-gray-50 rounded-[40px]">
            <Users size={64} className="mx-auto mb-6 opacity-5" />
            <h3 className="text-xl font-extrabold text-gray-600">اربط حساب الأبناء الآن</h3>
            <p className="mt-2 text-sm max-w-sm mx-auto">لم تضف أي تلميذ بعد لمتابعته. قم بربط حساب الأبناء لمتابعة مسارهم التعليمي، حصصهم، ونتائجهم.</p>
            <button className="mt-10 inline-flex items-center gap-2 rounded-2xl border-2 border-blue-light px-8 py-3 text-sm font-black text-blue-light hover:bg-blue-light hover:text-white transition-all">
               <Plus size={18} />
               ابدأ الربط الآن
            </button>
          </div>
        )}
      </div>
    </div>
  );

  switch (activeTab) {
    case 'overview':
      return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Welcome Dashboard Banner */}
          <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-[#0A0D14] to-blue-dark p-10 text-white shadow-2xl">
             <div className="absolute right-0 top-0 h-64 w-64 translate-x-1/3 -translate-y-1/3 rounded-full bg-blue-light/10 blur-[100px]" />
             <div className="absolute left-0 bottom-0 h-48 w-48 -translate-x-1/4 translate-y-1/4 rounded-full bg-gold-brand/5 blur-[80px]" />
             
             <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                   <h1 className="text-3xl font-black mb-2 text-white">لوحة تحكم الولي 👨‍👩‍👧‍👦</h1>
                   <p className="text-blue-light/80 font-bold max-w-md">أهلاً بك أستاذ {userData?.displayName?.split(' ')[0]}، تابع مسار تفوق أطفالك في مكان واحد.</p>
                </div>
                <div className="flex gap-4">
                   <div className="bg-white/5 backdrop-blur-md border border-white/10 px-6 py-4 rounded-[24px] text-center">
                      <p className="text-2xl font-black text-gold-brand">{children.length}</p>
                      <p className="text-[0.6rem] font-bold text-white/40 uppercase tracking-widest mt-1">تلاميذ متابعون</p>
                   </div>
                   <div className="bg-white/5 backdrop-blur-md border border-white/10 px-6 py-4 rounded-[24px] text-center">
                      <p className="text-2xl font-black text-emerald-400">0</p>
                      <p className="text-[0.6rem] font-bold text-white/40 uppercase tracking-widest mt-1">تنبيهات نشطة</p>
                   </div>
                </div>
             </div>
          </div>

          {renderChildren()}
          
          <div className="grid gap-8 lg:grid-cols-3">
             <div className="lg:col-span-2 rounded-[32px] border border-gray-100 bg-white p-8 shadow-sm">
                <h3 className="text-lg font-black text-blue-dark mb-8 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                    <History size={20} />
                  </div>
                  آخر النشاطات
                </h3>
                <div className="flex flex-col items-center justify-center py-16 text-center text-gray-300">
                   <History size={40} className="mb-4 opacity-5" />
                   <p className="text-sm italic font-medium">لا توجد أي نشاطات مسجلة حالياً</p>
                </div>
             </div>
             
             <div className="space-y-6">
                <div className="rounded-[32px] bg-[#0A0D14] p-8 text-white relative overflow-hidden group">
                   <div className="absolute -right-4 -bottom-4 opacity-20 transition-transform group-hover:scale-110 duration-500">
                      <ShieldCheck size={100} />
                   </div>
                   <h4 className="text-lg font-black mb-2 relative z-10">حماية وتفوق</h4>
                   <p className="text-xs font-medium text-white/60 mb-6 leading-relaxed relative z-10">نحن نضمن بيئة تعليمية آمنة ومحفزة تضمن تفوق أبنائكم بإشراف أفضل الأساتذة.</p>
                   <Link to="/contact" className="inline-flex items-center gap-2 text-xs font-black text-blue-light hover:text-white transition-all relative z-10">
                      تواصل مع الدعم التربوي
                      <ArrowRight size={14} className="ltr:rotate-0 rtl:rotate-180" />
                   </Link>
                </div>

                <div className="rounded-[32px] border border-gray-100 bg-white p-8 shadow-sm">
                   <h4 className="text-sm font-black text-blue-dark mb-4 flex items-center gap-2">
                      <Bell size={16} className="text-red-500" />
                      تنبيهات هامة
                   </h4>
                   <div className="space-y-4">
                      <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-50">
                         <p className="text-[0.7rem] font-bold text-blue-dark leading-relaxed">يرجى التأكد من ربط حسابات أبنائك بشكل صحيح للبدء في تلقي التقارير.</p>
                      </div>
                      <button className="w-full text-center py-2 text-[0.65rem] font-black text-gray-400 group hover:text-blue-brand transition-all flex items-center justify-center gap-1">
                         مشاهدة جميع التنبيهات
                         <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                   </div>
                </div>
             </div>
          </div>
        </div>
      );
    case 'children': return renderChildren();
    case 'schedule': return (
      <div className="rounded-[40px] border border-gray-100 bg-white py-24 text-center shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="h-24 w-24 rounded-[32px] bg-blue-50 flex items-center justify-center text-blue-brand mx-auto mb-8 shadow-xl shadow-blue-900/5">
           <Calendar size={48} />
        </div>
        <h3 className="text-3xl font-black text-blue-dark">الجداول الأسبوعية</h3>
        <p className="text-gray-400 mt-2 max-w-sm mx-auto font-medium">سيتم عرض جداول الحصص المباشرة والدروس الأسبوعية لكل منظور هنا بمجرد التوزيع على المجموعات.</p>
        <button className="mt-10 bg-blue-dark px-10 py-3.5 rounded-2xl text-white font-black text-sm shadow-xl shadow-blue-900/10 hover:shadow-blue-900/20 transition-all">
          عرض جدول نموذجي
        </button>
      </div>
    );
    case 'absences': return (
      <div className="rounded-[40px] border border-gray-100 bg-white py-24 text-center shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="h-24 w-24 rounded-[32px] bg-red-50 flex items-center justify-center text-red-500 mx-auto mb-8 shadow-xl shadow-red-900/5">
           <AlertCircle size={48} />
        </div>
        <h3 className="text-3xl font-black text-blue-dark">سجل المتابعة والغيابات</h3>
        <p className="text-gray-400 mt-2 max-w-sm mx-auto font-medium">ستصلك تنبيهات فورية في حال تخلف أحد الأبناء عن حصة مباشرة أو حصة دعم.</p>
        <div className="mt-12 flex items-center justify-center gap-2 text-xs font-black text-gray-300 uppercase tracking-widest">
           <Clock size={16} /> المتابعة مفعلة تلقائياً
        </div>
      </div>
    );
    default: return renderChildren();
  }
}
