import React from "react";
import HeroSectionImages from "../assest/ImageList";
import { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useEffect } from "react";

{
  /* <picture key={index} className="w-full h-full">
                    <source media="(max-width: 768px)" srcSet={image.src} />
                    <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
                </picture> */
}

const HeroProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const desktopImage = [...HeroSectionImages].filter(
    (image) => !image.alt.includes("Mobile")
  );
  const mobileImage = [...HeroSectionImages].filter((image) =>
    image.alt.includes("Mobile")
  );

  const nextImage = ()=> {
    if(desktopImage.length - 1 > currentImage){
        setCurrentImage(prev => prev + 1);
    }
  }

  const prevImage = () => {
    if(currentImage != 0){
        setCurrentImage(prev => prev - 1);
    }
  }

  useEffect(()=> {
    const interval = setInterval(()=> {
        if (desktopImage.length - 1 > currentImage) {
            nextImage();
        } else {
            setCurrentImage(0);
        }

    }, 5000)

    return () => clearInterval(interval);

  }, [currentImage])

  return (
    <section className="hero-product container mx-auto px-4 rounded">
      <div className="h-[17rem] md:h-[19rem] w-full bg-slate-200 relative">
        <div className="absolute z-10 w-full h-full md:flex items-center hidden">
          <div className="flex justify-between w-full text-2xl">
            <button onClick={prevImage} className="bg-white shadow-md rounded-full p-1 cursor-pointer"><FaAngleLeft/></button>            
            <button onClick={nextImage} className="bg-white shadow-md rounded-full p-1 cursor-pointer"><FaAngleRight/></button>  
          </div>
        </div>

        {/** desktop and tablet version Images */}
        <div className="hidden md:flex h-full w-full overflow-hidden">
          {desktopImage.map((image, index) => (
            <div key={index} className="w-full h-full min-w-full min-h-full transition-all" style={{ transform: `translatex(-${currentImage * 100}%)` }}>
              <img src={image.src} alt={image.alt} className="w-full h-full" />
            </div>
          ))}
        </div>

        {/** mobile version Images */}
        <div className="flex h-full w-full overflow-hidden md:hidden">
          {mobileImage.map((image, index) => (
            <div key={index} className="w-full h-full min-w-full min-h-full transition-all" style={{ transform: `translatex(-${currentImage * 100}%)` }}>
              <img src={image.src} alt={image.alt} className="w-full h-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroProduct;
