import { useState, useEffect } from 'react';
import { db } from '@/src/lib/firebase';
import { collection, query, where, getDocs, doc, getDoc, limit } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { 
  Wallet, 
  Calendar, 
  Plus, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Loader2, 
  Users, 
  TrendingUp, 
  ArrowRight,
  Video,
  Award,
  Zap,
  DollarSign,
  Briefcase,
  BookOpen,
  Globe
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface Props {
  activeTab: string;
  userData: any;
  user: User;
}

export default function TeacherOverview({ activeTab, userData, user }: Props) {
  const [balance, setBalance] = useState(0);
  const [stats, setStats] = useState({ total: 0, earned: 0, paid: 0 });
  const [sessions, setSessions] = useState<any[]>([]);
  const [myGroups, setMyGroups] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTeacherData();
  }, [userData]);

  const loadTeacherData = async () => {
    setLoading(true);
    try {
      // Fetch groups
      const gQuery = query(collection(db, 'groups'), where('teacherId', '==', user.uid));
      const gSnap = await getDocs(gQuery);
      setMyGroups(gSnap.docs.map(d => ({ id: d.id, ...d.data() })));

      // Fetch sessions
      const q = query(
        collection(db, 'teacherSessions'), 
        where('teacherId', '==', user.uid), 
        limit(30)
      );
      const snap = await getDocs(q);
      
      let total = 0, earned = 0;
      const list: any[] = [];
      const docs: any[] = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      
      docs.sort((a: any, b: any) => {
        const timeA = a.createdAt?.toMillis?.() || a.createdAt || 0;
        const timeB = b.createdAt?.toMillis?.() || b.createdAt || 0;
        return timeB - timeA;
      });

      docs.forEach(s => {
        list.push(s);
        if (s.status === 'confirmed') {
          total++;
          earned += 20; 
        }
      });
      
      const wSnap = await getDoc(doc(db, 'wallets', user.uid));
      const paid = wSnap.exists() ? wSnap.data().paid || 0 : 0;
      
      // Fetch Attendance
      const attSnap = await getDocs(collection(db, 'attendance'));
      setAttendance(attSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      
      setStats({ total, earned, paid });
      setBalance(earned - paid);
      setSessions(list);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderOverview = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Teacher Welcome & Wallet */}
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 relative overflow-hidden rounded-[32px] bg-[#0A0D14] p-8 text-white shadow-2xl">
          <div className="absolute right-0 top-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-light/20 blur-[100px]" />
          <div className="relative z-10">
            <h1 className="text-3xl font-black text-white mb-2">مرحباً أستاذ {userData?.displayName?.split(' ')[0]}! 👋</h1>
            <p className="text-blue-light font-bold text-lg mb-8">مساهمتك تبني أجيالاً. إليك ملخص نشاطك.</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-white/5">
              <div>
                <p className="text-[0.65rem] font-black text-white/40 uppercase tracking-widest mb-1">إجمالي الحصص</p>
                <p className="text-2xl font-black text-gold-brand">{stats.total}</p>
              </div>
              <div className="h-10 w-px bg-white/5 hidden sm:block" />
              <div>
                <p className="text-[0.65rem] font-black text-white/40 uppercase tracking-widest mb-1">الربح الصافي</p>
                <div className="flex items-baseline gap-1">
                  <p className="text-2xl font-black text-emerald-400">{stats.earned}</p>
                  <span className="text-[0.6rem] font-bold text-white/30 lowercase">dt</span>
                </div>
              </div>
              <div className="h-10 w-px bg-white/5 hidden sm:block" />
            </div>
          </div>
        </div>

        <div className="rounded-[32px] bg-white border border-gray-100 p-8 shadow-sm flex flex-col justify-between group">
           <div>
              <div className="flex items-center justify-between mb-6">
                <div className="h-12 w-12 rounded-2xl bg-blue-light/10 text-blue-light flex items-center justify-center">
                   <Wallet size={24} />
                </div>
                <div className="h-8 w-8 rounded-full border border-gray-50 flex items-center justify-center text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">
                   <ArrowRight size={14} className="ltr:rotate-0 rtl:rotate-180" />
                </div>
              </div>
              <p className="text-[0.7rem] font-black text-gray-400 uppercase tracking-widest mb-1">الرصيد المتاح</p>
              <div className="flex items-baseline gap-2">
                 <h2 className="text-4xl font-black text-blue-dark">{balance.toFixed(3)}</h2>
                 <span className="text-lg font-bold text-gray-300">د.ت</span>
              </div>
           </div>
           <button className="mt-8 w-full bg-blue-dark rounded-2xl py-3.5 text-white font-black text-sm shadow-xl shadow-blue-900/20 hover:shadow-blue-900/40 transition-all hover:-translate-y-1">
              طلب سحب الأرباح
           </button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Recent Sessions & Groups */}
        <div className="lg:col-span-2 space-y-8">
          <div className="rounded-[32px] border border-gray-100 bg-white p-8 shadow-sm">
            <div className="mb-8 flex items-center justify-between">
               <div className="flex items-center gap-3">
                 <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                   <Calendar size={22} />
                 </div>
                 <h3 className="text-xl font-black text-blue-dark">حصصي الأخيرة</h3>
               </div>
               <button className="text-xs font-black text-blue-light hover:underline flex items-center gap-1 group transition-all">
                 الجدول الأسبوعي
                 <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
               </button>
            </div>
            
            {loading ? (
              <div className="py-20 text-center"><Loader2 className="mx-auto h-10 w-10 animate-spin text-gray-200" /></div>
            ) : sessions.length > 0 ? (
              <div className="space-y-4">
                 {sessions.slice(0, 5).map(s => (
                   <div key={s.id} className="group relative flex items-center justify-between rounded-3xl border border-gray-50 bg-gray-50/30 p-5 transition-all hover:bg-white hover:border-blue-light/20 hover:shadow-xl hover:shadow-blue-900/5">
                      <div className="flex items-center gap-4">
                         <div className="h-12 w-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-blue-dark font-black shadow-sm">
                            {s.level}
                         </div>
                         <div>
                           <h4 className="font-black text-blue-dark text-[0.95rem]">{s.subject || s.chapter || 'جبر / هندسة'}</h4>
                           <div className="flex items-center gap-3 mt-1">
                              <span className="text-[0.7rem] text-gray-400 font-bold flex items-center gap-1">
                                 <Clock size={12} /> {s.date?.toDate ? s.date.toDate().toLocaleDateString('ar-TN') : '—'}
                              </span>
                              <span className="text-[0.7rem] text-gray-400 font-bold flex items-center gap-1">
                                 <Users size={12} /> {s.students || 0} طالب
                              </span>
                           </div>
                         </div>
                      </div>
                      <div className={cn(
                        "rounded-xl px-4 py-1.5 text-[0.7rem] font-black border",
                        s.status === 'confirmed' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                        s.status === 'rejected' ? "bg-red-50 text-red-600 border-red-100" :
                        "bg-amber-50 text-amber-600 border-amber-100"
                      )}>
                        {s.status === 'confirmed' ? 'مؤكدة' : s.status === 'rejected' ? 'مرفوضة' : 'في الانتظار'}
                      </div>
                   </div>
                 ))}
              </div>
            ) : (
              <div className="py-20 text-center text-gray-400 border-2 border-dashed border-gray-50 rounded-[32px]">
                <Calendar size={48} className="mx-auto mb-4 opacity-10" />
                <p className="text-[0.95rem] font-black text-gray-600">لا توجد حصص مسجلة بعد</p>
                <p className="text-[0.8rem] mt-1 italic">قم بتسجيل حصصك الجديدة لتظهر هنا</p>
              </div>
            )}
          </div>

          {/* Assigned Groups Section */}
          <div className="rounded-[32px] border border-gray-100 bg-white p-8 shadow-sm">
             <div className="mb-8 flex items-center gap-3">
               <div className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                 <Users size={22} />
               </div>
               <h3 className="text-xl font-black text-blue-dark">المجموعات التي أشرف عليها</h3>
             </div>

             {myGroups.length > 0 ? (
               <div className="grid sm:grid-cols-2 gap-4">
                  {myGroups.map(g => (
                    <div key={g.id} className="p-6 rounded-[28px] border border-gray-50 bg-gray-50/20 hover:bg-white hover:border-indigo-100 transition-all group">
                       <div className="flex justify-between items-start mb-4">
                          <div className="h-10 w-10 rounded-xl bg-blue-dark text-white flex items-center justify-center font-black text-xs">
                             {g.level}
                          </div>
                          {g.whatsappLink && (
                            <a href={g.whatsappLink} target="_blank" className="p-2 rounded-xl bg-green-50 text-green-600 hover:bg-green-100 transition-colors">
                              <Globe size={16} />
                            </a>
                          )}
                       </div>
                       <h4 className="font-black text-blue-dark mb-1">{g.name}</h4>
                       <p className="text-[0.65rem] font-bold text-gray-400"> السنة {g.level} أساسي</p>
                       
                       {g.meetLink && (
                         <button 
                           onClick={() => {
                             import('@/src/lib/attendanceService').then(({ logAttendance }) => {
                               logAttendance({
                                 userId: user.uid,
                                 userName: userData.displayName || 'أستاذ',
                                 userType: 'teacher',
                                 groupId: g.id,
                                 groupName: g.name,
                                 meetLink: g.meetLink
                               });
                             });
                           }}
                           className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-blue-50 text-blue-brand text-[0.7rem] font-black hover:bg-blue-brand hover:text-white transition-all shadow-sm"
                         >
                           <Video size={14} />
                           الالتحاق بالحصة المباشرة
                         </button>
                       )}
                    </div>
                  ))}
               </div>
             ) : (
               <div className="py-12 text-center text-gray-300 italic border-2 border-dashed border-gray-50 rounded-[28px]">
                 <p className="text-xs font-black">لم يتم تعيينك لأي مجموعة حالياً</p>
               </div>
             )}
          </div>
        </div>

        {/* Quick Actions & Stats */}
        <div className="space-y-6">
           <div className="rounded-[32px] border border-gray-100 bg-white p-8 shadow-sm">
              <h3 className="text-lg font-black text-blue-dark mb-6 flex items-center gap-2">
                <TrendingUp className="text-blue-light" size={20} /> الأداء الشهري
              </h3>
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-brand">
                        <Video size={18} />
                      </div>
                      <div>
                        <p className="text-[0.65rem] font-black text-gray-400 uppercase leading-none mb-1">إنتاج المحتوى</p>
                        <p className="text-sm font-black text-blue-dark">0 حصة</p>
                      </div>
                   </div>
                   <div className="text-[0.65rem] font-black text-gray-300">0% مستهدف</div>
                </div>

                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500">
                        <Zap size={18} />
                      </div>
                      <div>
                        <p className="text-[0.65rem] font-black text-gray-400 uppercase leading-none mb-1">تقييم الطلاب</p>
                        <p className="text-sm font-black text-blue-dark">5.0 / 5</p>
                      </div>
                   </div>
                   <div className="text-[0.65rem] font-black text-emerald-500">+12%</div>
                </div>
              </div>
           </div>

           <button className="w-full group relative overflow-hidden rounded-[32px] bg-blue-brand p-8 text-white shadow-xl shadow-blue-900/10 transition-all hover:shadow-blue-900/20 text-right">
              <div className="absolute -right-4 -bottom-4 opacity-20 transition-transform group-hover:scale-110 duration-500">
                 <Plus size={120} />
              </div>
              <p className="text-xs font-black text-white/60 mb-1">سجل حصتك الآن</p>
              <h3 className="text-xl font-black text-white">إضافة حصة جديدة</h3>
              <div className="mt-6 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm transition-all group-hover:bg-white/40">
                 <Plus size={20} />
              </div>
           </button>
        </div>
      </div>
    </div>
  );

  const renderAttendance = () => {
    const myGroupIds = myGroups.map(g => g.id);
    const myAttendance = attendance.filter((a: any) => myGroupIds.includes(a.groupId));

    return (
      <div className="space-y-8 animate-in fade-in duration-500 pb-20">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100 shadow-sm">
            <CheckCircle2 size={28} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-blue-dark">سجلات حضور تلاميذي</h2>
            <p className="text-gray-400 font-bold text-sm">متابعة التلاميذ الذين التحقوا بالحصص المباشرة ({myAttendance.length})</p>
          </div>
        </div>

        <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden min-h-[400px]">
          <div className="grid grid-cols-[1.5fr_1.5fr_1fr_1fr] bg-gray-50/80 p-6 border-b border-gray-100 text-[0.65rem] font-black text-gray-400 uppercase tracking-widest text-center">
             <div className="text-right pr-4">التلميذ</div>
             <div>المجموعة</div>
             <div>الوقت</div>
             <div>التاريخ</div>
          </div>
          <div className="divide-y divide-gray-50 overflow-x-auto">
            {myAttendance.length > 0 ? (
              myAttendance.map((att: any) => (
                <div key={att.id} className="grid grid-cols-[1.5fr_1.5fr_1fr_1fr] p-6 items-center text-center hover:bg-gray-50 transition-all min-w-[600px]">
                   <div className="flex items-center gap-3 text-right">
                      <div className="h-10 w-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-black text-xs">
                         {att.userName?.charAt(0) || 'U'}
                      </div>
                      <h4 className="text-sm font-black text-blue-dark truncate max-w-[150px]">{att.userName}</h4>
                   </div>
                   <div>
                      <p className="text-xs font-black text-blue-dark">{att.groupName}</p>
                   </div>
                   <div>
                      <span className="text-[0.7rem] font-black text-gray-500">
                        {att.timestamp ? new Date(att.timestamp.toDate ? att.timestamp.toDate() : att.timestamp).toLocaleTimeString('ar-TN', { hour: '2-digit', minute: '2-digit' }) : '---'}
                      </span>
                   </div>
                   <div>
                      <span className="text-[0.7rem] font-black text-gray-500">
                        {att.timestamp ? new Date(att.timestamp.toDate ? att.timestamp.toDate() : att.timestamp).toLocaleDateString('ar-TN') : '---'}
                      </span>
                   </div>
                </div>
              ))
            ) : (
              <div className="py-40 text-center opacity-30">
                 <CheckCircle2 size={64} className="mx-auto mb-4" />
                 <p className="text-lg font-black italic">لا يوجد سجل حضور حالياً</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  switch (activeTab) {
    case 'overview': return renderOverview();
    case 'content': return (
      <div className="rounded-[32px] border border-gray-100 bg-white p-10 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="mb-8 flex items-center justify-between">
           <div className="flex items-center gap-3">
             <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-brand">
               <Video size={22} />
             </div>
             <h3 className="text-xl font-black text-blue-dark">إدارة المحتوى التعليمي</h3>
           </div>
           <button onClick={() => window.location.href='/dashboard?tab=content'} className="bg-blue-brand px-6 py-2.5 rounded-xl text-white font-black text-sm shadow-lg">
             + إضافة درس جديد
           </button>
        </div>
        <div className="py-24 text-center border-2 border-dashed border-gray-50 rounded-[32px]">
           <BookOpen size={56} className="mx-auto mb-6 text-gray-200" />
           <p className="text-lg font-black text-blue-dark">مساهماتك التعليمية</p>
           <p className="text-sm text-gray-400 mt-1 max-w-sm mx-auto">هنا ستظهر قائمة الدروس والمواد التي قمت بإضافتها. يمكنك التعديل عليها أو إضافة محتوى جديد لطلابك.</p>
           <p className="mt-4 px-4 py-2 bg-amber-50 text-amber-700 text-xs font-bold rounded-lg inline-block border border-amber-100">ملاحظة: إدارة المحتوى متاحة حالياً عبر لوحة الإدارة الرئيسية.</p>
        </div>
      </div>
    );
    case 'sessions': return (
      <div className="rounded-[32px] border border-gray-100 bg-white p-10 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="mb-8 flex items-center justify-between">
           <div className="flex items-center gap-3">
             <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-brand">
               <Briefcase size={22} />
             </div>
             <h3 className="text-xl font-black text-blue-dark">إدارة الحصص التعليمية</h3>
           </div>
           <button className="bg-blue-brand px-6 py-2.5 rounded-xl text-white font-black text-sm shadow-lg shadow-blue-900/10 hover:shadow-blue-900/20 transition-all">
             + حصة جديدة
           </button>
        </div>
        <div className="py-24 text-center border-2 border-dashed border-gray-50 rounded-[32px]">
           <Video size={56} className="mx-auto mb-6 text-gray-200" />
           <p className="text-lg font-black text-blue-dark">سيتم عرض قائمة حصصك الكاملة هنا</p>
           <p className="text-sm text-gray-400 mt-1 max-w-sm mx-auto">بإمكانك متابعة تفاصيل الحصص المباشرة والدروس المسجلة ومراجعة حالة تفعيلها من قبل الإدارة.</p>
        </div>
      </div>
    );
    case 'attendance': return renderAttendance();
    case 'schedule': return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-100 shadow-sm">
              <Calendar size={28} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-blue-dark">الجدول الأسبوعي لمجموعاتي</h2>
              <p className="text-gray-400 font-bold text-sm">مواعيد الحصص المباشرة للمجموعات التي تشرف عليها ({myGroups.length} مجموعات)</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {myGroups.length > 0 ? (
            myGroups.map(g => (
              <div key={g.id} className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-blue-dark text-white flex items-center justify-center font-black text-xs shadow-sm">
                      {g.level}
                    </div>
                    <div>
                      <h4 className="font-black text-blue-dark text-sm">{g.name}</h4>
                      <p className="text-[0.65rem] text-gray-400 font-bold">السنة {g.level} أساسي</p>
                    </div>
                  </div>
                  {g.meetLink && (
                    <a href={g.meetLink} target="_blank" className="p-2 rounded-lg bg-blue-50 text-blue-brand hover:bg-blue-brand hover:text-white transition-all">
                      <Globe size={14} />
                    </a>
                  )}
                </div>
                
                <div className="p-6 flex-1">
                   {g.schedule && g.schedule.length > 0 ? (
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                       {g.schedule.map((s: any, idx: number) => (
                         <div key={idx} className="flex items-center gap-3 p-3 rounded-2xl bg-blue-50/30 border border-blue-100/20 group hover:border-blue-brand/30 transition-all">
                            <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center text-blue-brand font-black text-[0.65rem] shadow-sm">
                               {s.day.charAt(0)}
                            </div>
                            <div>
                               <p className="text-[0.68rem] font-bold text-blue-dark/60">{s.day}</p>
                               <p className="text-xs font-black text-blue-dark">{s.startTime} → {s.endTime}</p>
                            </div>
                         </div>
                       ))}
                     </div>
                   ) : (
                     <div className="py-10 text-center opacity-30">
                        <Calendar size={40} className="mx-auto mb-2" />
                        <p className="text-xs font-bold">لم يتم ضبط جدول هذه المجموعة</p>
                     </div>
                   )}
                </div>
              </div>
            ))
          ) : (
            <div className="lg:col-span-2 py-24 text-center border-2 border-dashed border-gray-50 rounded-[32px]">
               <Calendar size={64} className="mx-auto mb-6 opacity-10" />
               <p className="text-lg font-black italic">لا توجد حصص مبرمجة حالياً</p>
               <p className="text-xs mt-2">سيتم تعيين جدول فور إضافته من قبل الإدارة.</p>
            </div>
          )}
        </div>
      </div>
    );
    case 'wallet': return renderOverview();
    default: return renderOverview();
  }
}
