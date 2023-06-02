import React, { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { sliderData } from "../../pages/home/constant";
import "./Slider.scss";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrevSlider = () => {
    setCurrentSlide((pre) =>
      currentSlide > 0 ? pre - 1 : sliderData.length - 1
    );
  };
  const handleNextSlider = () => {
    setCurrentSlide((pre) =>
      currentSlide < sliderData.length - 1 ? pre + 1 : 0
    );
  };

  console.log(currentSlide);
  return (
    <>
      <div className="slider">
        <AiOutlineArrowLeft className="arrow prev" onClick={handlePrevSlider} />
        <AiOutlineArrowRight
          className="arrow next"
          onClick={handleNextSlider}
        />
        {sliderData.map((slide, i) => (
          <div
            key={i}
            className={currentSlide === i ? "slide current" : "slide"}
          >
            {currentSlide === i && <img src={slide.image} alt="" />}
          </div>
        ))}
      </div>
    </>
  );
};

export default Slider;
