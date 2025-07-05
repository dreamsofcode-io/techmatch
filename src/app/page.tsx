'use client';

import { useState } from 'react';
import SwipeCard from '@/components/SwipeCard';
import { techProfiles, TechProfile } from '@/data/techProfiles';

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matches, setMatches] = useState<TechProfile[]>([]);
  const [passes, setPasses] = useState<TechProfile[]>([]);

  const currentProfile = techProfiles[currentIndex];

  const handleSwipe = (direction: 'left' | 'right') => {
    const profile = techProfiles[currentIndex];
    
    if (direction === 'right') {
      setMatches(prev => [...prev, profile]);
    } else {
      setPasses(prev => [...prev, profile]);
    }
    
    setCurrentIndex(prev => prev + 1);
  };

  const resetApp = () => {
    setCurrentIndex(0);
    setMatches([]);
    setPasses([]);
  };

  if (currentIndex >= techProfiles.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center p-2 sm:p-4">
        <div className="bg-black border border-gray-700 rounded-2xl p-4 sm:p-8 max-w-md w-full text-center shadow-2xl mx-2 sm:mx-0">
          <h1 className="text-3xl font-bold mb-6 text-white">🎉 All Done!</h1>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3 text-emerald-400">Your Matches ({matches.length})</h2>
            {matches.length > 0 ? (
              <div className="space-y-2">
                {matches.map(match => (
                  <div key={match.id} className="flex items-center gap-3 p-3 bg-gray-900 border border-emerald-500/30 rounded-lg">
                    {match.logoUrl ? (
                      <img 
                        src={match.logoUrl} 
                        alt={`${match.name} logo`}
                        className="w-8 h-8 object-contain rounded-full bg-gray-100 p-0.5"
                      />
                    ) : (
                      <span className="text-lg">{match.logo}</span>
                    )}
                    <span className="font-medium text-white">{match.name}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No matches yet!</p>
            )}
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3 text-rose-400">Passed ({passes.length})</h2>
            {passes.length > 0 ? (
              <div className="space-y-2">
                {passes.map(pass => (
                  <div key={pass.id} className="flex items-center gap-3 p-3 bg-gray-900 border border-rose-500/30 rounded-lg">
                    {pass.logoUrl ? (
                      <img 
                        src={pass.logoUrl} 
                        alt={`${pass.name} logo`}
                        className="w-8 h-8 object-contain rounded-full bg-gray-100 p-0.5"
                      />
                    ) : (
                      <span className="text-lg">{pass.logo}</span>
                    )}
                    <span className="font-medium text-white">{pass.name}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">You liked everything!</p>
            )}
          </div>

          <button
            onClick={resetApp}
            className="bg-white hover:bg-gray-200 text-gray-800 px-8 py-4 rounded-full font-medium hover:scale-105 transition-transform"
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 flex flex-col items-center justify-center p-2 sm:p-4">
      {/* Header */}
      <div className="text-center mb-2 sm:mb-8 mt-2 sm:mt-0">
        <h1 className="text-2xl sm:text-4xl font-bold text-white mb-1 sm:mb-3">💻❤️ TechMatch</h1>
        <p className="text-base sm:text-xl text-gray-300">Swipe right to match, left to pass</p>
      </div>

      {/* Card Stack */}
      <div className="relative">
        {/* Next card (background) */}
        {currentIndex + 1 < techProfiles.length && (
          <SwipeCard
            key={techProfiles[currentIndex + 1].id}
            profile={techProfiles[currentIndex + 1]}
            onSwipe={() => {}}
            style={{
              position: 'absolute',
              transform: 'scale(0.95) translateY(10px)',
              opacity: 0.5,
              pointerEvents: 'none'
            }}
          />
        )}
        
        {/* Current card */}
        <SwipeCard
          key={currentProfile.id}
          profile={currentProfile}
          onSwipe={handleSwipe}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-6 sm:gap-8 mt-4 sm:mt-10">
        <button
          onClick={() => handleSwipe('left')}
          className="w-16 h-16 sm:w-20 sm:h-20 bg-rose-500 hover:bg-rose-600 text-white rounded-full flex items-center justify-center text-2xl sm:text-3xl shadow-lg hover:scale-110 transition-transform"
        >
          💔
        </button>
        <button
          onClick={() => handleSwipe('right')}
          className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center text-2xl sm:text-3xl shadow-lg hover:scale-110 transition-transform"
        >
          💚
        </button>
      </div>

      {/* Progress */}
      <div className="mt-3 sm:mt-8 w-full max-w-80 sm:max-w-96 bg-slate-700 rounded-full h-2 sm:h-3 mx-4">
        <div 
          className="bg-white rounded-full h-2 sm:h-3 transition-all duration-300"
          style={{ width: `${((currentIndex) / techProfiles.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
