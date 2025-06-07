
import React from 'react';
import { Sparkles, Star } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 animate-bounce">
          <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
        </div>
        <div className="absolute top-20 right-16 animate-bounce delay-300">
          <Sparkles className="h-8 w-8 text-emerald-400" />
        </div>
        <div className="absolute bottom-32 left-20 animate-bounce delay-500">
          <Star className="h-5 w-5 text-orange-400 fill-orange-400" />
        </div>
        <div className="absolute bottom-40 right-12 animate-bounce delay-700">
          <Sparkles className="h-6 w-6 text-yellow-500" />
        </div>
      </div>

      {/* Main content */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-4 border-emerald-200 max-w-sm w-full animate-scale-in">
        <div className="mb-6">
          <div className="text-6xl mb-4 animate-bounce">🐑</div>
          <h1 className="text-2xl font-bold text-emerald-800 mb-2">
            Eid al-Adha
          </h1>
          <h2 className="text-lg font-semibold text-emerald-700 mb-4">
            Adventure Game
          </h2>
        </div>

        {/* Arabic greeting */}
        <div className="mb-4 p-4 bg-emerald-50 rounded-2xl border-2 border-emerald-200">
          <p className="text-right text-emerald-800 font-semibold text-lg mb-2" dir="rtl">
            تَقَبَّلَ اللّهُ مِنَّا وَمِنكُم
          </p>
          <p className="text-right text-emerald-800 font-semibold text-lg" dir="rtl">
            عِيدٌ أَضْحَى مُبَارَك
          </p>
        </div>

        {/* Indonesian greeting */}
        <div className="mb-6 p-4 bg-yellow-50 rounded-2xl border-2 border-yellow-200">
          <p className="text-emerald-800 font-semibold">
            Selamat Hari Raya Idul Adha!
          </p>
          <p className="text-emerald-700 text-sm mt-1">
            Semoga kita semua diberkahi
          </p>
        </div>

        <button
          onClick={onStart}
          className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95"
        >
          🎮 Mulai Game
        </button>

        <p className="text-xs text-emerald-600 mt-4">
          Belajar tentang kurban dengan cara yang menyenangkan!
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;
