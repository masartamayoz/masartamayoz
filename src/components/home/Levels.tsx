export default function Levels() {
  const levels = [
    { num: '7', title: 'السنة السابعة أساسي', desc: 'تأسيس متين في الحساب والهندسة للانطلاق في المرحلة الإعدادية بنجاح.', topics: ['الأعداد', 'الهندسة', 'القياس'] },
    { num: '8', title: 'السنة الثامنة أساسي', desc: 'تعميق المكتسبات والتحضير للدراسة التجريدية والمنطق الرياضي.', topics: ['الجبر', 'الهندسة', 'الإحصاء'] },
    { num: '9', title: 'السنة التاسعة أساسي', desc: 'تحضير شامل لمناظرة شهادة ختم التعليم الأساسي (النوفيام).', topics: ['مناظرة', 'مراجعة', 'اختبارات'] },
    { num: 'S', title: 'المرحلة الثانوية', desc: 'تحضير دقيق لكل المستويات الثانوية وصولاً إلى مناظرة الباكالوريا.', topics: ['تحليل', 'هندسة فضاء', 'احتمالات'] },
  ];

  return (
    <section className="bg-gray-50 py-20 pb-24" id="levels">
      <div className="container mx-auto px-5">
        <div className="mb-14 text-center">
          <div className="mb-3.5 inline-block rounded-full border border-blue-light/10 bg-blue-light/10 px-4 py-1.5 text-[0.82rem] font-bold text-blue-light">
            المستويات الدراسية
          </div>
          <h2 className="mb-3 text-3xl font-black text-blue-dark sm:text-4xl">
            من الإعدادي إلى الباكالوريا
          </h2>
          <p className="mx-auto max-w-[560px] text-[1.05rem] text-gray-600 font-Tajawal">
            منصة مسار التميز ترافقك في كل مراحل تعليمك لتكون دائماً من الأوائل
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {levels.map((lvl) => (
            <div key={lvl.num} className="group cursor-pointer rounded-[20px] border border-gray-200 bg-white p-7 transition-all hover:-translate-y-1 hover:border-blue-light hover:shadow-2xl">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-light to-blue-mid text-lg font-black text-white">
                {lvl.num}
              </div>
              <h3 className="mb-1.5 text-[1.05rem] font-bold text-blue-dark">{lvl.title}</h3>
              <p className="mb-4 text-[0.88rem] leading-relaxed text-gray-600 font-Tajawal">{lvl.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {lvl.topics.map((t) => (
                  <span key={t} className="rounded-full border border-blue-light/15 bg-blue-light/8 px-2.5 py-1 text-[0.78rem] font-semibold text-blue-light">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
