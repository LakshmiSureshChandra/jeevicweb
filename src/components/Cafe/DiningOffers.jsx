import React, { useState, useRef, useEffect } from 'react';

const DiningOffers = () => {
  const [activeCard, setActiveCard] = useState(null);
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleCardClick = (cardId) => {
    setActiveCard(cardId === activeCard ? null : cardId);
  };

  
  const handleMouseDown = (e) => {
    if (window.innerWidth > 768) return; 
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleTouchStart = (e) => {
    if (window.innerWidth > 768) return; 
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; 
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; 
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('touchend', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
    }

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchend', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isDragging, startX, scrollLeft]);

  const getCardClasses = (cardId) => {
    const baseClasses = "rounded-lg overflow-hidden flex-shrink-0 h-36 cursor-pointer transition-all duration-200";
    const mobileClasses = "md:max-w-56 w-[60vw] md:w-full"; 
    
    if (cardId === activeCard) {
      return `${baseClasses} ${mobileClasses} bg-blue-600 text-white border border-blue-600`;
    }
    return `${baseClasses} ${mobileClasses} bg-white border border-gray-200`;
  };

  const getTextColor = (cardId, defaultColor = "text-gray-600") => {
    return cardId === activeCard ? "text-white" : defaultColor;
  };

  
  const BackgroundSVG = ({ isActive }) => (
    <div className="absolute bottom-0 right-0 w-24 h-24 -mb-10 -mr-8">
      <svg
        className={`w-full h-full ${isActive ? "opacity-20 fill-white" : "opacity-10 fill-blue-600"}`}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path d="M64.1,38.1l-30.2,24c-0.6,0.5-0.8,1.5-0.2,2.1c0.3,0.4,0.7,0.6,1.2,0.6c0.3,0,0.7-0.1,0.9-0.3l30.2-24   c0.6-0.5,0.8-1.5,0.2-2.1C65.7,37.7,64.8,37.6,64.1,38.1z" />
          <path d="M42,48.8c0.4,0,0.8,0,1.2-0.1c4.1-0.6,7-4.5,6.3-8.7c-0.3-2-1.4-3.8-3-5c-1.6-1.2-3.6-1.7-5.6-1.4c-2,0.3-3.8,1.4-5,3   c-1.2,1.6-1.7,3.6-1.4,5.6C35.1,46.1,38.4,48.8,42,48.8z M41.3,36.7c0.2,0,0.5-0.1,0.7-0.1c2.2,0,4.2,1.6,4.5,3.9   c0.4,2.5-1.3,4.8-3.8,5.2c-2.5,0.4-4.8-1.3-5.2-3.8C37.1,39.4,38.9,37.1,41.3,36.7z" />
          <path d="M58,53.8c-4.2,0-7.6,3.4-7.6,7.6c0,4.2,3.4,7.6,7.6,7.6s7.6-3.4,7.6-7.6C65.5,57.2,62.1,53.8,58,53.8z M58,65.9   c-2.5,0-4.6-2.1-4.6-4.6c0-2.5,2.1-4.6,4.6-4.6s4.6,2.1,4.6,4.6C62.5,63.9,60.5,65.9,58,65.9z" />
          <path d="M95.4,50.3c0-0.1,0.1-0.3,0.1-0.4c0-4.3-4.5-6.5-8.4-8.4c-2.8-1.4-5.8-2.9-6.6-4.7c-0.8-1.9,0.3-5,1.4-7.9   c1.5-4.1,3-8.3,0.2-11.1c-2.8-2.8-6.8-1.8-10.8-0.9c-2.8,0.6-5.7,1.3-7.6,0.5c-1.9-0.8-3.5-3.3-5-5.7c-2.2-3.4-4.6-7.3-8.8-7.3   c-4.2,0-6.6,3.9-8.7,7.4c-1.5,2.5-3,5-4.9,5.8c-1.9,0.8-4.9,0.1-7.7-0.6c-4-1-8.1-2-10.8,0.7c-2.8,2.8-1.4,7-0.1,11.1   c1,3,1.9,6,1.1,8c-0.8,1.9-3.6,3.3-6.3,4.7c-3.8,2-8.1,4.2-8.1,8.4c0,0.1,0,0.3,0.1,0.4c0,0.1-0.1,0.3-0.1,0.4   c0,4.2,4.3,6.5,8.1,8.4c2.7,1.4,5.5,2.8,6.3,4.7c0.8,1.9-0.2,5-1.1,8c-1.3,4.1-2.7,8.3,0.1,11.1c2.8,2.8,6.9,1.7,10.8,0.7   c2.8-0.7,5.8-1.4,7.7-0.6c1.9,0.8,3.4,3.3,4.9,5.8c2.1,3.5,4.5,7.4,8.7,7.4c4.2,0,6.7-3.9,8.8-7.3c1.5-2.4,3.1-4.9,5-5.7   c2-0.8,4.8-0.2,7.6,0.5c3.9,0.9,8,1.9,10.8-0.9c2.8-2.8,1.3-7-0.2-11.1c-1.1-3-2.2-6-1.4-7.9c0.8-1.9,3.7-3.3,6.6-4.7   c3.9-2,8.4-4.2,8.4-8.4C95.5,50.5,95.4,50.4,95.4,50.3z M85.7,56.4c-3.3,1.7-6.8,3.4-8,6.3c-1.3,3,0.1,6.6,1.3,10.1   c1.2,3.3,2.4,6.5,0.9,7.9c-1.6,1.6-4.7,0.9-8,0.1c-3.3-0.8-6.6-1.5-9.5-0.3c-2.8,1.2-4.6,4-6.3,6.8c-1.9,3-3.7,5.9-6.3,5.9   c-2.5,0-4.3-2.9-6.2-6c-1.7-2.9-3.5-5.8-6.3-7c-2.9-1.2-6.3-0.4-9.6,0.5c-3.3,0.8-6.4,1.6-8,0.1c-1.5-1.5-0.5-4.7,0.6-8   c1.1-3.5,2.3-7.1,1-10c-1.2-2.9-4.5-4.6-7.7-6.2c-3.3-1.7-6.4-3.3-6.4-5.8c0-0.1,0-0.3-0.1-0.4c0-0.1,0.1-0.3,0.1-0.4   c0-2.4,3.1-4,6.4-5.8c3.2-1.6,6.5-3.3,7.7-6.2c1.2-3,0.1-6.6-1-10c-1.1-3.4-2.1-6.6-0.6-8c1.6-1.6,4.7-0.8,8,0.1   c3.3,0.8,6.7,1.7,9.6,0.5c2.8-1.2,4.6-4.1,6.3-7c1.9-3.1,3.6-6,6.2-6c2.6,0,4.4,2.9,6.3,5.9c1.8,2.8,3.6,5.6,6.3,6.8   c2.9,1.2,6.2,0.4,9.5-0.3c3.3-0.8,6.4-1.5,8,0.1c1.5,1.4,0.3,4.6-0.9,7.9c-1.3,3.5-2.6,7.1-1.3,10.1c1.2,2.9,4.7,4.6,8,6.3   c3.5,1.7,6.7,3.4,6.7,5.8c0,0.1,0,0.3,0.1,0.4c0,0.1-0.1,0.3-0.1,0.4C92.5,53,89.2,54.7,85.7,56.4z" />
        </g>
      </svg>
    </div>
  );

  return (
    <div className="md:border md:border-gray-200 rounded-lg md:p-6">
      <h2 className="text-xl font-semibold mb-1">Dining Offers</h2>
      <p className="text-sm text-gray-600 mb-4">
        <span className="md:inline">Tap on any offer to know more</span>
        <span className="inline md:hidden"> • Swipe to see more</span>
      </p>
      
      {/* Mobile swipeable container */}
      <div 
        ref={scrollContainerRef}
        className="md:hidden flex overflow-x-auto gap-3 pb-4 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div 
          className={getCardClasses(1)}
          onClick={() => handleCardClick(1)}
        >
          <div className="p-4 relative">
            <div className="mb-2 relative z-10">
              <span className={`text-sm font-medium ${getTextColor(1, "text-blue-600")}`}>PRE-BOOK OFFER</span>
            </div>
            <div className="relative z-10">
              <h3 className="text-lg font-medium mb-1">Flat 15% OFF</h3>
              <p className={`text-xs ${getTextColor(1, "text-blue-600")}`}>Valid from 12PM to 11:55PM 12 May</p>
              <p className={`text-xs ${getTextColor(1, "text-blue-600")}`}>Booking required</p>
            </div>
            <BackgroundSVG isActive={activeCard === 1} />
          </div>
        </div>
        
        <div 
          className={getCardClasses(2)}
          onClick={() => handleCardClick(2)}
        >
          <div className="p-4 relative">
            <div className="mb-2 relative z-10">
              <span className={`text-sm font-medium ${getTextColor(2, "text-blue-600")}`}>SURPRISE</span>
            </div>
            <div className="relative z-10">
              <h3 className="text-lg font-medium mb-1">Get a scratch card</h3>
              <p className={`text-xs ${getTextColor(2, "text-blue-600")}`}>after every transaction</p>
            </div>
            <BackgroundSVG isActive={activeCard === 2} />
          </div>
        </div>
        
        <div 
          className={getCardClasses(3)}
          onClick={() => handleCardClick(3)}
        >
          <div className="p-4 relative">
            <div className="mb-2 relative z-10">
              <span className={`text-sm font-medium ${getTextColor(3, "text-blue-600")}`}>EXCLUSIVE OFFER</span>
            </div>
            <div className="relative z-10">
              <h3 className="text-lg font-medium mb-1">Flat 10% OFF</h3>
              <p className={`text-xs ${getTextColor(3, "text-blue-600")}`}>valid on your next dining payment</p>
            </div>
            <BackgroundSVG isActive={activeCard === 3} />
          </div>
        </div>
        
        <div 
          className={getCardClasses(4)}
          onClick={() => handleCardClick(4)}
        >
          <div className="p-4 relative">
            <div className="mb-1 relative z-10">
              <span className={`text-sm font-medium ${getTextColor(4, "text-blue-600")}`}>BANK OFFER</span>
            </div>
            <div className="relative z-10">
              <h3 className="font-medium text-base">20% OFF up to ₹1200 on Credit Cards</h3>
              <p className={`text-xs ${getTextColor(4, "text-blue-600")}`}>and more with other banks</p>
            </div>
            <BackgroundSVG isActive={activeCard === 4} />
          </div>
        </div>
      </div>

      {/* Desktop grid layout (unchanged) */}
      <div className="hidden md:grid md:grid-cols-3 gap-4">
        <div 
          className={getCardClasses(1)}
          onClick={() => handleCardClick(1)}
        >
          <div className="p-4 relative">
            <div className="mb-2 relative z-10">
              <span className={`text-sm font-medium ${getTextColor(1, "text-blue-600")}`}>PRE-BOOK OFFER</span>
            </div>
            <div className="relative z-10">
              <h3 className="text-lg font-medium mb-1">Flat 15% OFF</h3>
              <p className={`text-xs ${getTextColor(1, "text-blue-600")}`}>Valid from 12PM to 11:55PM 12 May</p>
              <p className={`text-xs ${getTextColor(1, "text-blue-600")}`}>Booking required</p>
            </div>
            <BackgroundSVG isActive={activeCard === 1} />
          </div>
        </div>
        
        <div 
          className={getCardClasses(2)}
          onClick={() => handleCardClick(2)}
        >
          <div className="p-4 relative">
            <div className="mb-2 relative z-10">
              <span className={`text-sm font-medium ${getTextColor(2, "text-blue-600")}`}>SURPRISE</span>
            </div>
            <div className="relative z-10">
              <h3 className="text-lg font-medium mb-1">Get a scratch card</h3>
              <p className={`text-sm ${getTextColor(2, "text-blue-600")}`}>after every transaction</p>
            </div>
            <BackgroundSVG isActive={activeCard === 2} />
          </div>
        </div>
        
        <div 
          className={getCardClasses(3)}
          onClick={() => handleCardClick(3)}
        >
          <div className="p-4 relative">
            <div className="mb-2 relative z-10">
              <span className={`text-sm font-medium ${getTextColor(3, "text-blue-600")}`}>EXCLUSIVE OFFER</span>
            </div>
            <div className="relative z-10">
              <h3 className="text-lg font-medium mb-1">Flat 10% OFF</h3>
              <p className={`text-sm ${getTextColor(3, "text-gray-600")}`}>valid on your next dining payment</p>
            </div>
            <BackgroundSVG isActive={activeCard === 3} />
          </div>
        </div>
      </div>
      
      <div 
        className="hidden md:block"
        style={{marginTop: '1rem'}}
      >
        <div 
          className={getCardClasses(4)}
          onClick={() => handleCardClick(4)}
        >
          <div className="p-4 relative">
            <div className="mb-1 relative z-10">
              <span className={`text-sm font-medium ${getTextColor(4, "text-blue-600")}`}>BANK OFFER</span>
            </div>
            <div className="relative z-10">
              <h3 className="font-medium text-base">20% OFF up to ₹1200 on Credit Cards</h3>
              <p className={`text-sm ${getTextColor(4, "text-blue-600")}`}>and more with other banks</p>
            </div>
            <BackgroundSVG isActive={activeCard === 4} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiningOffers;