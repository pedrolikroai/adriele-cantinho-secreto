import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import RecadoSection from "@/components/RecadoSection";
import QuickAccessSection from "@/components/QuickAccessSection";
import SelecoesSection from "@/components/SelecoesSection";
import FavoritoSection from "@/components/FavoritoSection";
import SobreSection from "@/components/SobreSection";
import ParceriasSection from "@/components/ParceriasSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <RecadoSection />
      <QuickAccessSection />
      <SelecoesSection />
      <FavoritoSection />
      <SobreSection />
      <ParceriasSection />
      <Footer />
    </div>
  );
};

export default Index;
