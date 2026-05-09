export default function HowItWorks() {
  const steps = [
    { num: '1', title: 'إنشاء حساب', desc: 'سجّل حسابك كطالب أو ولي أمر في دقيقة واحدة' },
    { num: '2', title: 'اختر العرض', desc: 'اختر بين عرض التسجيلات أو الحصص المباشرة' },
    { num: '3', title: 'ادفع وأرسل الوصل', desc: 'حوّل المبلغ عبر البنك أو البريد أو D17 وأرسل الوصل' },
    { num: '4', title: 'ابدأ التعلم', desc: 'يتم تفعيل حسابك خلال 24 ساعة وتبدأ رحلتك' },
  ];

  return (
    <section className="bg-white py-20 pb-24" id="how">
      <div className="container mx-auto px-5">
        <div className="mb-14 text-center">
          <div className="mb-3.5 inline-block rounded-full border border-blue-light/10 bg-blue-light/10 px-4 py-1.5 text-[0.82rem] font-bold text-blue-light">
            كيف تشترك؟
          </div>
          <h2 className="mb-3 text-3xl font-black text-blue-dark sm:text-4xl">
            4 خطوات بسيطة وأنت جاهز
          </h2>
          <p className="mx-auto max-w-[560px] text-[1.05rem] text-gray-600 font-Tajawal">
            نظام اشتراك سهل وآمن بدون تعقيدات
          </p>
        </div>

        <div className="relative grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
          <div className="absolute top-8 left-[12%] right-[12%] hidden h-[2px] bg-gradient-to-l from-blue-light to-gold-brand lg:block" />
          
          {steps.map((step) => (
            <div key={step.num} className="relative z-10 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-blue-light to-blue-mid text-xl font-black text-white shadow-xl shadow-blue-light/30">
                {step.num}
              </div>
              <h3 className="mb-2 text-[1rem] font-extrabold text-blue-dark">{step.title}</h3>
              <p className="text-[0.88rem] text-gray-600 font-Tajawal">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
