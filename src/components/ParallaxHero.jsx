import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ParallaxHero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setScrollY(window.pageYOffset);

    const handleScroll = () => {
      setScrollY(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const parallaxFactor = 0.2;

  const chocolateVariants = (delay = 0, duration = 2, yOffset = "-0.6rem") => ({
    idle: {
      y: "0rem",
      transition: { duration: 0.3, ease: "easeOut" }
    },
    bobbing: {
      y: ["0rem", yOffset, "0rem"],
      transition: {
        duration: duration,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        delay: delay,
      }
    }
  });

  const choco1AnimVariants = chocolateVariants(0, 2.2, "-0.5rem");
  const choco2AnimVariants = chocolateVariants(0.3, 2.0, "-0.6rem");
  const choco3AnimVariants = chocolateVariants(0.6, 2.4, "-0.4rem");

  return (
    <div className='overflow-x-hidden'>
      <div className='h-[0vh] bg-white'></div>

      <div className='relative h-[60vh] flex justify-center items-center bg-white'>
        <img
          src="/images/banner-bg.webp"
          alt='banner'
          className='absolute inset-0 w-full h-full object-cover blur-xs brightness-90'
        />

        <div
          className='absolute inset-0 top-120 flex flex-wrap items-end justify-center gap-4 sm:gap-6 md:gap-8 '
          style={{ transform: `translateY(${scrollY * parallaxFactor * -1}px)` }}
        >
          <div
            className='relative w-40 h-40 md:w-56 md:h-56 lg:w-72 lg:h-72 transform translate-y-8'
            style={{ transform: `translateY(${scrollY * parallaxFactor * -1 * 0.1}px)` }}
          >
            <motion.div
              className="w-full h-full relative"
              variants={choco1AnimVariants}
              initial="idle"
              animate="bobbing"
            >
              <img
                src="/images/product-1.webp"
                alt='product 1'
                className='w-full h-full object-contain drop-shadow-2xl'
              />
            </motion.div>
          </div>

          <div
            className='relative w-40 h-40 md:w-56 md:h-56 lg:w-72 lg:h-72 transform translate-y-12'
            style={{ transform: `translateY(${scrollY * parallaxFactor * -1 * 0.15}px)` }}
          >
            <motion.div
              className="w-full h-full relative"
              variants={choco2AnimVariants}
              initial="idle"
              animate="bobbing"
            >
              <img
                src="/images/product-2.webp"
                alt='product 2'
                className='w-full h-full object-contain drop-shadow-2xl'
              />
            </motion.div>
          </div>

          <div
            className='relative w-40 h-40 md:w-56 md:h-56 lg:w-72 lg:h-72 transform translate-y-16'
            style={{ transform: `translateY(${scrollY * parallaxFactor * -1 * 0.2}px)` }}
          >
            <motion.div
              className="w-full h-full relative"
              variants={choco3AnimVariants}
              initial="idle"
              animate="bobbing"
            >
              <img
                src="/images/product-3.webp"
                alt='product 3'
                className='w-full h-full object-contain drop-shadow-2xl'
              />
            </motion.div>
          </div>
        </div>
      </div>

      <div className='h-[0vh] bg-white'></div>
    </div>
  );
};

export default ParallaxHero;