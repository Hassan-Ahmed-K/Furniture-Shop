import React from "react";
import Slider from "react-slick";

// Slick Carousel CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SliderComponent = ({ images }) => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: false, // Set autoplay to true
      autoplaySpeed: 2000,
      arrows: false,
      responsive: [
        {
          breakpoint: 1024, // For screens smaller than 1024px
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true, // Ensure autoplay is enabled
          },
        },
        {
          breakpoint: 768, // For screens smaller than 768px
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            autoplay: true, // Ensure autoplay is enabled
          },
        },
        {
          breakpoint: 480, // For screens smaller than 480px
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true, // Ensure autoplay is enabled
          },
        },
      ],
    };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={`${index}-${image}`}>
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderComponent;
