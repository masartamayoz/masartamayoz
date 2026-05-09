export default function PaymentMethods() {
  const methods = [
    { icon: '🏦', name: 'تحويل بنكي', desc: 'عبر أي بنك تونسي' },
    { icon: '📮', name: 'البريد التونسي', desc: 'تحويل بريدي مباشر' },
    { icon: '📱', name: 'تطبيق D17', desc: 'دفع إلكتروني سريع' },
    { icon: '💳', name: 'Carte eDinar', desc: 'بطاقة الدينار الإلكتروني' },
  ];

  const steps = [
    { num: 1, title: 'قم بعملية الدفع', desc: 'حوّل المبلغ عبر طريقة الدفع التي تناسبك واحتفظ بوصل الخلاص' },
    { num: 2, title: 'سجّل دخولك للمنصة', desc: 'ادخل إلى حسابك على أكاديمية مسار التميز' },
    { num: 3, title: 'أرسل صورة الوصل', desc: 'ارفع صورة وصل الخلاص عبر نموذج الاشتراك في لوحة التحكم' },
    { num: 4, title: 'انتظر التفعيل', desc: 'يتم مراجعة وصلك وتفعيل اشتراكك خلال 24 ساعة كحد أقصى' },
  ];

  return (
    <section className="bg-white py-20 pb-24" id="payment">
      <div className="container mx-auto px-5">
        <div className="mb-14 text-center">
          <div className="mb-3.5 inline-block rounded-full border border-blue-light/10 bg-blue-light/10 px-4 py-1.5 text-[0.82rem] font-bold text-blue-light">
            طرق الدفع
          </div>
          <h2 className="mb-3 text-3xl font-black text-blue-dark sm:text-4xl">
            طرق دفع متعددة في متناولك
          </h2>
          <p className="mx-auto max-w-[560px] text-[1.05rem] text-gray-600 font-Tajawal text-center">
            اختر الطريقة الأنسب لك لإرسال وصل الخلاص
          </p>
        </div>

        <div className="grid grid-cols-1 gap-15 lg:grid-cols-2 items-center">
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-7">
              {methods.map((m) => (
                <div key={m.name} className="flex items-center gap-3 rounded-xl border-1.5 border-gray-200 bg-gray-50 p-4 transition-all hover:border-blue-light hover:bg-blue-light/[0.04]">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-white text-[1.3rem]">
                    {m.icon}
                  </div>
                  <div>
                    <h4 className="text-[0.9rem] font-bold text-blue-dark">{m.name}</h4>
                    <p className="text-[0.78rem] text-gray-600 font-Tajawal">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-[1.2rem] font-black text-blue-dark">
              كيف ترسل وصل الخلاص؟
            </h3>
            <ol className="flex flex-col gap-0">
              {steps.map((s) => (
                <li key={s.num} className="group flex items-start gap-4 border-b border-gray-100 py-4 last:border-0 ltr:text-left rtl:text-right">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-light to-blue-mid text-[0.85rem] font-extrabold text-white">
                    {s.num}
                  </div>
                  <div>
                    <h4 className="mb-0.75 text-[0.95rem] font-bold text-blue-dark">{s.title}</h4>
                    <p className="text-[0.85rem] text-gray-600 font-Tajawal rtl:text-right">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
