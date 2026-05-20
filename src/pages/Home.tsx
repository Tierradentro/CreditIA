import Navbar from '@/components/Navbar';
import HeroSection from '@/sections/HeroSection';
import FeaturesSection from '@/sections/FeaturesSection';
import FlowDiagram from '@/sections/FlowDiagram';
import Footer from '@/sections/Footer';

export default function Home() {
  return (
    <div className="bg-[#0a1628]">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <FlowDiagram />
        <Footer />
      </main>
    </div>
  );
}
