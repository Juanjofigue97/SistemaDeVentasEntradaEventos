import BenefitsSection from "../components/BenefitsSection"
import EventList from "../components/EventList"
import FaqSection from "../components/FaqSection"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import HeroSlider from "../components/Slider"

const HomePage = () => {
  return (
    <div>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-gray-900 shadow">
        <Navbar />
      </nav>
      <HeroSlider />
      <EventList />
      <BenefitsSection />
      <FaqSection />
      <Footer />
    </div>
  )
}

export default HomePage
