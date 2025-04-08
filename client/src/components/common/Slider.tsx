import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick"
import { slides } from "../../data/slides";

const HeroSlider = () => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      autoplay: true,
      autoplaySpeed: 4000,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
    };
  
    return (
      <div className="w-full h-screen overflow-hidden">
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div key={index} className="relative w-full h-screen">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover brightness-75"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
                <h2 className="text-4xl md:text-5xl font-bold">{slide.title}</h2>
                <p className="text-xl md:text-2xl mt-2">{slide.subtitle}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    );
  };
  
  export default HeroSlider;