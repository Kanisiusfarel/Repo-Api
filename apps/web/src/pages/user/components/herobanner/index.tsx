import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/keyboard';
import 'swiper/css/pagination';
import Image from 'next/image'; // Import Next.js Image component for lazy loading

const HeroBanner = () => {
  const slides = [
    {
      title: "Akira 2024 Exhibition",
      description: "Discover the magnus opus of the legendary mangaka, Katsuhiro Otomo.",
      imagePath: '/banner-slides/akira.jpg', // Path to your image in the public folder
    },
    {
      title: "SJHU Shin Ultraman Exhibition and Fan Screening",
      description: "Don't miss the screening of a love letter for the legendary Tokusatsu series.",
      imagePath: '/banner-slides/shin-ultraman.png',
    },
    {
      title: "MF DOOM",
      description: "Participate in workshops and enhance your skills.",
      imagePath: '/banner-slides/mfdoom.jpg',
    },
    {
      title: "Shing02 feat. Nujabes",
      description: "Attend events that bring joy and excitement.",
      imagePath: '/banner-slides/shing02.jpg',
    },
    {
      title: "Akira Yasuda Art Exhibition",
      description: "Never miss an event with real-time updates.",
      imagePath: '/banner-slides/akiman.png',
    },
  ];

  return (
    <div className="hero-banner w-full h-[96vh] overflow-hidden relative">
      <Swiper
        modules={[Keyboard, Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000 }}
        keyboard={{ enabled: true, onlyInViewport: true }}
        pagination={{ clickable: true, dynamicBullets: true }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="slide w-full h-[96vh] flex items-end justify-end relative">
              {/* Image Component for lazy loading */}
              <div className="absolute inset-0">
                <Image
                  src={slide.imagePath} // Use the correct image path
                  alt={`Slide ${index + 1} image`}
                  layout="fill" // Ensure the image takes up the full container
                  objectFit="cover" // Keep the aspect ratio of the image and cover the container
                  priority={false} // Lazy load (set to false to lazy load images)
                />
                {/* Fallback color overlay */}
                <div className="bg-gray-500 opacity-40 absolute inset-0"></div>
              </div>
              {/* Text Content */}
              <div className="text-content z-10 p-8 text-right text-white w-full md:w-1/3 lg:w-1/4">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">{slide.title}</h2>
                <p className="text-lg md:text-xl">{slide.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroBanner;




