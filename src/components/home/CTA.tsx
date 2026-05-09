import { Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-dark to-blue-mid py-24 text-center">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(245,158,11,0.15)_0%,transparent_60%)]" />
      
      <div className="container mx-auto px-5 relative z-10">
        <div className="cta-content">
          <h2 className="mb-3.5 text-3xl font-black text-white sm:text-4xl lg:text-5xl">
            ابدأ رحلتك نحو <span className="text-gold-brand text-yellow-500">التميز</span> اليوم
          </h2>
          <p className="mb-9 text-lg text-white/75 font-Tajawal max-w-[600px] mx-auto">
            انضم لمئات الطلاب الذين يتعلمون مع أفضل المدرسين في تونس
          </p>
          <Link to="/auth" className="mx-auto inline-flex items-center gap-2 rounded-xl bg-gold-brand px-8 py-4 font-bold text-blue-dark transition-all hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-xl hover:shadow-gold-brand/35">
            <UserPlus size={22} />
            أنشئ حسابك الآن — مجاناً
          </Link>
        </div>
      </div>
    </section>
  );
}
