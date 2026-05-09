import { Video, PlayCircle, Users, Presentation, Smartphone, ChartLine } from 'lucide-react';

const features = [
  { icon: Video, title: 'حصص مباشرة تفاعلية', desc: 'حصص مباشرة عبر Google Meet مع مدرسين متخصصين، تفاعل مباشر وإجابات فورية على أسئلتك.' },
  { icon: PlayCircle, title: 'تسجيلات عالية الجودة', desc: 'مشاهدة تسجيلات الدروس في أي وقت وأي مكان عبر قناة مسار التميز على YouTube.' },
  { icon: Users, title: 'متابعة ولي الأمر', desc: 'نظام متكامل يتيح لولي الأمر متابعة تقدم أبنائه ومشاهدة نتائجهم بشكل مستمر.' },
  { icon: Presentation, title: 'مدرسون متخصصون', desc: 'فريق من أفضل أساتذة الرياضيات في تونس، خبرة عالية ومنهج تدريسي محكم.' },
  { icon: Smartphone, title: 'متاح على كل الأجهزة', desc: 'تصفح المنصة من هاتفك أو حاسوبك أو جهازك اللوحي بسهولة تامة.' },
  { icon: ChartLine, title: 'تتبع التقدم', desc: 'لوحة تحكم شخصية تظهر لك تقدمك في كل مادة وتساعدك على التركيز على نقاط الضعف.' },
];

export default function Features() {
  return (
    <section className="bg-white py-20 pb-24" id="about">
      <div className="container mx-auto px-5">
        <div className="mb-14 text-center">
          <div className="mb-3.5 inline-block rounded-full border border-blue-light/10 bg-blue-light/10 px-4 py-1.5 text-[0.82rem] font-bold text-blue-light">
            لماذا مسار التميز؟
          </div>
          <h2 className="mb-3 text-3xl font-black text-blue-dark sm:text-4xl">
            التعليم الذي يصنع الفارق
          </h2>
          <p className="mx-auto max-w-[560px] text-[1.05rem] text-gray-600">
            منصة تعليمية تونسية مبنية خصيصاً لاحتياجات الطلاب التونسيين
          </p>
        </div>

        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <div key={i} className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 p-8 pt-10 transition-all hover:-translate-y-1.5 hover:border-transparent hover:shadow-2xl">
              <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-l from-blue-light to-gold-brand opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="mb-5 flex h-14 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-light to-blue-mid text-white">
                <f.icon size={22} className="min-w-10 min-h-10 flex-shrink-0" />
              </div>
              <h3 className="mb-2.5 text-lg font-bold text-blue-dark">{f.title}</h3>
              <p className="text-[0.92rem] leading-relaxed text-gray-600 font-Tajawal">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
