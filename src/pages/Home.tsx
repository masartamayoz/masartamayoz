import Hero from '@/src/components/home/Hero';
import Features from '@/src/components/home/Features';
import Levels from '@/src/components/home/Levels';
import Pricing from '@/src/components/home/Pricing';
import HowItWorks from '@/src/components/home/HowItWorks';
import PaymentMethods from '@/src/components/home/PaymentMethods';
import CTA from '@/src/components/home/CTA';
import Navbar from '@/src/components/layout/Navbar';
import Footer from '@/src/components/layout/Footer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden" dir="rtl">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <Levels />
        <Pricing />
        <HowItWorks />
        <PaymentMethods />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
