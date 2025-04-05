import BenefitsSection from "../components/home/BenefitsSection"
import EventList from "../components/common/EventList"
import FaqSection from "../components/home/FaqSection"
import Footer from "../components/home/Footer"
import Navbar from "../components/home/Navbar"
import HeroSlider from "../components/common/Slider"

const HomePage = () => {
  return (
    <div>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-gray-900 shadow">
        <Navbar />
      </nav>
      <div id="inicio" >
        <HeroSlider />
      </div>
      <div id="eventos" className="scroll-mt-20 md:scroll-mt-24">
        <EventList />
      </div>
      <div id="beneficios" className="scroll-mt-20 md:scroll-mt-24">
        <BenefitsSection />
      </div>
      <div id="faq" className="scroll-mt-20 md:scroll-mt-24">
        <FaqSection />
      </div>
      <Footer />
    </div>
  )
}

export default HomePage
