import { Link } from 'react-router-dom';
import { Rocket, Tags, GraduationCap, Star } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-dark via-blue-mid to-blue-brand py-20 pb-24 text-right">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_10%_50%,rgba(245,158,11,0.12)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_90%_20%,rgba(37,99,235,0.2)_0%,transparent_50%)]" />
      </div>

      <div className="container mx-auto px-5 relative z-10">
        <div className="grid grid-cols-1 items-center gap-15 lg:grid-cols-2 text-right lg:ltr:text-left rtl:text-right">
          <div className="hero-content">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold-light/30 bg-gold-brand/15 px-4 py-1.5 text-[0.85rem] font-semibold text-gold-light">
              <Star size={16} />
              منصة تعليمية تونسية متخصصة
            </div>
            <h1 className="mb-5 text-4xl font-black text-white sm:text-5xl lg:text-6xl leading-tight">
              تعلّم <span className="text-gold-brand text-yellow-500">الرياضيات</span> مع أفضل المدرّسين
            </h1>
            <p className="mb-9 max-w-[500px] text-lg text-white/80 ltr:text-left rtl:text-right">
              دروس مسجلة وحصص مباشرة عالية الجودة للمرحلتين الإعدادية والثانوية. تعليم تفاعلي وشامل يضمن لك التميز والنجاح.
            </p>
            <div className="flex flex-wrap gap-3.5 justify-start">
              <Link to="/auth" className="inline-flex items-center gap-2 rounded-xl bg-gold-brand px-8 py-3.5 font-bold text-blue-dark transition-all hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-xl hover:shadow-gold-brand/35">
                <Rocket size={20} />
                ابدأ الآن مجاناً
              </Link>
              <a href="#pricing" className="inline-flex items-center gap-2 rounded-xl border-1.5 border-white/30 bg-white/10 px-8 py-3.5 font-semibold text-white transition-all hover:border-white/60 hover:bg-white/20">
                <Tags size={20} />
                اكتشف العروض
              </a>
            </div>
            <div className="mt-11 flex gap-7 border-t border-white/12 pt-8 text-right">
              <div className="hero-stat">
                <strong className="block text-3xl font-black text-gold-brand text-yellow-500">+500</strong>
                <span className="text-[0.85rem] text-white/65">طالب مسجّل</span>
              </div>
              <div className="hero-stat">
                <strong className="block text-3xl font-black text-gold-brand text-yellow-500">7</strong>
                <span className="text-[0.85rem] text-white/65">مستويات دراسية</span>
              </div>
              <div className="hero-stat">
                <strong className="block text-3xl font-black text-gold-brand text-yellow-500">5</strong>
                <span className="text-[0.85rem] text-white/65">مدرّسون متخصصون</span>
              </div>
            </div>
          </div>

          <div className="hidden lg:block relative">
            <div className="rounded-[20px] bg-white/8 backdrop-blur-xl border border-white/15 p-7 text-white shadow-2xl">
              <div className="mb-4.5 flex items-center gap-2 text-gold-light text-yellow-400 font-bold">
                <GraduationCap size={20} />
                الدورات المتاحة
              </div>
              <ul className="space-y-2">
                {[
                  { name: 'الرياضيات', level: 'المرحلة الإعدادية (7، 8، 9)', icon: '➗', badge: 'متاح', badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
                  { name: 'الرياضيات', level: 'المرحلة الثانوية (1، 2، 3، 4)', icon: '➗', badge: 'جديد', badgeColor: 'bg-gold-brand/20 text-gold-light border-gold-brand/30' },
                  { name: 'دروس تجريبية', level: 'جميع المستويات', icon: '✨', badge: 'مجاني', badgeColor: 'bg-blue-light/20 text-blue-lighter border-blue-light/30' },
                ].map((item, i) => (
                  <li key={i} className="flex items-center justify-between rounded-xl border border-white/8 bg-white/6 p-3.5 transition-all hover:bg-white/12">
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-brand/20 text-lg">
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-[0.9rem] font-semibold">{item.name}</div>
                        <div className="text-[0.75rem] text-white/55">{item.level}</div>
                      </div>
                    </div>
                    <span className={cn("rounded-full border px-2.5 py-1 text-[0.72rem] font-bold shadow-sm", item.badgeColor)}>
                      {item.badge}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
