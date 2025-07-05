'use client';

import { useState, useRef, useEffect } from 'react';
import { TechProfile } from '@/data/techProfiles';

interface SwipeCardProps {
  profile: TechProfile;
  onSwipe: (direction: 'left' | 'right') => void;
  style?: React.CSSProperties;
}

export default function SwipeCard({ profile, onSwipe, style }: SwipeCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [isMatching, setIsMatching] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const startPos = useRef({ x: 0, y: 0 });

  const handleStart = (clientX: number, clientY: number) => {
    setIsDragging(true);
    startPos.current = { x: clientX, y: clientY };
  };


  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault(); // Prevent default touch behaviors
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - startPos.current.x;
      const deltaY = e.clientY - startPos.current.y;
      setDragOffset({ x: deltaX, y: deltaY });
      setRotation(deltaX * 0.1);
    };

    const handleMouseUp = () => {
      if (!isDragging) return;
      setIsDragging(false);
      const threshold = 150;
      if (Math.abs(dragOffset.x) > threshold) {
        if (dragOffset.x > 0) {
          setIsMatching(true);
          setTimeout(() => {
            setIsMatching(false);
            onSwipe('right');
          }, 10000);
        } else {
          onSwipe('left');
        }
      } else {
        setDragOffset({ x: 0, y: 0 });
        setRotation(0);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      const touch = e.touches[0];
      const deltaX = touch.clientX - startPos.current.x;
      const deltaY = touch.clientY - startPos.current.y;
      setDragOffset({ x: deltaX, y: deltaY });
      setRotation(deltaX * 0.1);
    };

    const handleTouchEnd = () => {
      if (!isDragging) return;
      setIsDragging(false);
      const threshold = 150;
      if (Math.abs(dragOffset.x) > threshold) {
        if (dragOffset.x > 0) {
          setIsMatching(true);
          setTimeout(() => {
            setIsMatching(false);
            onSwipe('right');
          }, 10000);
        } else {
          onSwipe('left');
        }
      } else {
        setDragOffset({ x: 0, y: 0 });
        setRotation(0);
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, dragOffset.x, dragOffset.y, onSwipe]);

  const cardStyle = {
    transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${rotation}deg)`,
    transition: isDragging ? 'none' : 'transform 0.3s ease-out',
    cursor: isDragging ? 'grabbing' : 'grab',
    zIndex: isDragging ? 10 : 1,
    ...style
  };

  const overlayOpacity = Math.min(Math.abs(dragOffset.x) / 100, 1);
  const isRight = dragOffset.x > 0;

  return (
    <>
      {/* Full Screen Match Animation */}
      {isMatching && (
        <div className="fixed inset-0 z-50 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 flex items-center justify-center animate-pulse">
          {/* Confetti Particles */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400 opacity-80 animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${0.5 + Math.random() * 1}s`,
                  transform: `rotate(${Math.random() * 360}deg)`
                }}
              />
            ))}
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={`pink-${i}`}
                className="absolute w-3 h-1 bg-pink-400 opacity-70 animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${0.8 + Math.random() * 1.2}s`,
                  transform: `rotate(${Math.random() * 360}deg)`
                }}
              />
            ))}
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={`blue-${i}`}
                className="absolute w-1 h-3 bg-blue-400 opacity-60 animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${0.6 + Math.random() * 0.8}s`,
                  transform: `rotate(${Math.random() * 360}deg)`
                }}
              />
            ))}
          </div>
          
          <div className="text-center text-white relative z-10">
            <div className="text-9xl mb-6 animate-bounce">🎉</div>
            <div className="text-7xl font-bold mb-6 animate-pulse">IT&apos;S A MATCH!</div>
            <div className="text-4xl opacity-90 mb-4 animate-fade-in">with</div>
            <div className="text-5xl font-bold animate-bounce delay-150">{profile.name}</div>
            <div className="mt-8 text-5xl animate-pulse delay-300">💚 🎊 💚 🎊 💚</div>
            <div className="mt-6 text-6xl animate-bounce delay-500">🎆 🎉 🎆</div>
          </div>
        </div>
      )}
      
      <div
        ref={cardRef}
        className="relative w-[90vw] max-w-[400px] sm:max-w-[500px] h-[500px] sm:h-[600px] bg-white rounded-3xl shadow-2xl select-none mx-auto touch-none"
        style={cardStyle}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
      {/* Swipe Overlays */}
      {Math.abs(dragOffset.x) > 20 && (
        <>
          <div
            className={`absolute inset-0 rounded-3xl flex items-center justify-center text-5xl font-bold ${
              isRight 
                ? 'bg-emerald-500 text-white animate-pulse' 
                : 'bg-rose-500 text-white'
            }`}
            style={{ 
              opacity: overlayOpacity * 0.8,
              transform: isRight ? `scale(${1 + overlayOpacity * 0.1})` : 'scale(1)'
            }}
          >
            {isRight ? '🎉 MATCH! 🎉' : '💔 PASS'}
          </div>
        </>
      )}

      {/* Card Content */}
      <div className="bg-black rounded-3xl h-full flex flex-col">
        {/* Header */}
        <div className="p-6 sm:p-8 text-white">
          <div className="flex items-center gap-3 sm:gap-4 mb-3">
            {profile.logoUrl ? (
              <img 
                src={profile.logoUrl} 
                alt={`${profile.name} logo`}
                className="w-12 h-12 sm:w-16 sm:h-16 object-contain rounded-full bg-gray-100 p-1"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                  if (nextElement) nextElement.style.display = 'block';
                }}
              />
            ) : null}
            <span 
              className="text-4xl sm:text-5xl" 
              style={{ display: profile.logoUrl ? 'none' : 'block' }}
            >
              {profile.logo}
            </span>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">{profile.name}</h2>
              <p className="text-sm sm:text-base opacity-90">{profile.category}</p>
            </div>
          </div>
          <p className="text-sm sm:text-base italic opacity-90">{profile.tagline}</p>
        </div>

        {/* Description */}
        <div className="flex-1 bg-gray-900 border border-gray-700 p-4 sm:p-8 mx-4 sm:mx-6 mb-4 sm:mb-6 rounded-2xl flex flex-col">
          <p className="text-gray-300 text-sm sm:text-base mb-4 sm:mb-6">{profile.description}</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 flex-1">
            <div className="flex flex-col">
              <h4 className="font-semibold text-emerald-400 mb-2 sm:mb-3">Pros</h4>
              <ul className="text-xs sm:text-sm space-y-1 sm:space-y-2 flex-1 overflow-y-auto">
                {profile.pros.map((pro, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-300 leading-relaxed">
                    <span className="text-emerald-400 mt-0.5">✓</span>
                    <span className="break-words">{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex flex-col">
              <h4 className="font-semibold text-rose-400 mb-2 sm:mb-3">Cons</h4>
              <ul className="text-xs sm:text-sm space-y-1 sm:space-y-2 flex-1 overflow-y-auto">
                {profile.cons.map((con, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-300 leading-relaxed">
                    <span className="text-rose-400 mt-0.5">✗</span>
                    <span className="break-words">{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}