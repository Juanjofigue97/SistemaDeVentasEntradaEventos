import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slides = [
    {
        title: "Conciertos Inolvidables",
        subtitle: "Disfruta los mejores artistas en vivo",
        image: "https://images.blackmagicdesign.com/images/media/releases/2020/20201207_anderson-paak-spotlight-concert/carousel/1-anderson-paak-spotlight-concert.jpg?_v=1605651980",
    },
    {
        title: "Conferencias Impactantes",
        subtitle: "Aprende con los expertos más reconocidos",
        image: "https://images.blackmagicdesign.com/images/media/releases/2020/20201207_anderson-paak-spotlight-concert/carousel/2-anderson-paak-spotlight-concert.jpg?_v=1605651982",
    },
    {
        title: "Festivales para todos",
        subtitle: "Diversión sin límites",
        image: "https://images.blackmagicdesign.com/images/media/releases/2020/20201207_anderson-paak-spotlight-concert/carousel/3-anderson-paak-spotlight-concert.jpg?_v=1605651983",
    },
];

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
        <div className="w-full h-screen overflow-hidden"> {/* Esto envuelve el slider */}
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
