import React, { useState, useEffect } from "react";
import { Trophy, Star, RefreshCw, Share } from "lucide-react";

interface FinalFeastProps {
  food: string;
  score: number;
  onRestart: () => void;
}

const FinalFeast: React.FC<FinalFeastProps> = ({ food, score, onRestart }) => {
  const [eatingProgress, setEatingProgress] = useState(100);
  const [showCelebration, setShowCelebration] = useState(false);
  const [badge, setBadge] = useState("");

  useEffect(() => {
    // Determine badge based on score
    if (score >= 120) setBadge("Master Chef Kurban 👨‍🍳");
    else if (score >= 100) setBadge("Ahli Masak Tradisional 🥇");
    else if (score >= 80) setBadge("Koki Handal 🏆");
    else setBadge("Pemula yang Berbakat 🌟");
  }, [score]);

  const eatFood = () => {
    if (eatingProgress > 0) {
      setEatingProgress((prev) => {
        const newProgress = Math.max(prev - 10, 0);
        if (newProgress === 0 && !showCelebration) {
          setShowCelebration(true);
        }
        return newProgress;
      });
    }
  };

  const getFoodEmoji = (foodId: string) => {
    switch (foodId) {
      case "sate":
        return "🍢";
      case "rendang":
        return "🍛";
      case "gulai":
        return "🍲";
      case "tongseng":
        return "🥘";
      default:
        return "🍽️";
    }
  };

  const getFoodName = (foodId: string) => {
    switch (foodId) {
      case "sate":
        return "Sate";
      case "rendang":
        return "Rendang";
      case "gulai":
        return "Gulai";
      case "tongseng":
        return "Tongseng";
      default:
        return "Makanan";
    }
  };

  return (
    <div className="min-h-screen p-4 pt-20 mt-20">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-6">
          <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-emerald-800 mb-2">
            Selamat! 🎉
          </h2>
          <p className="text-emerald-600">
            Kamu berhasil menyelesaikan perjalanan kurban Idul Adha!
          </p>
        </div>

        {/* Score and Badge */}
        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-2xl border-4 border-yellow-300 mb-6">
          <div className="text-6xl mb-2">🏆</div>
          <h3 className="text-xl font-bold text-orange-800 mb-2">{badge}</h3>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            <span className="text-lg font-bold text-orange-700">
              Skor: {score}
            </span>
            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
          </div>
        </div>

        {/* Eating Game */}
        <div className="bg-white p-6 rounded-2xl border-4 border-emerald-200 shadow-lg mb-6">
          <h3 className="text-xl font-bold text-emerald-800 mb-4">
            Nikmati {getFoodName(food)}mu!
          </h3>

          <div className="text-8xl mb-4 transition-all duration-300">
            {eatingProgress > 0 ? getFoodEmoji(food) : "🍽️"}
          </div>

          <div className="mb-4">
            <div className="bg-gray-200 rounded-full h-6 overflow-hidden border-2 border-gray-300">
              <div
                className="bg-gradient-to-r from-red-400 to-orange-500 h-full transition-all duration-300"
                style={{ width: `${eatingProgress}%` }}
              ></div>
            </div>
            <p className="text-emerald-700 text-sm mt-2">
              {eatingProgress}% tersisa
            </p>
          </div>

          {eatingProgress > 0 ? (
            <button
              onClick={eatFood}
              className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <span className="text-xl">😋 Makan!</span>
            </button>
          ) : (
            <div className="space-y-3">
              <div className="bg-green-50 p-4 rounded-xl border-2 border-green-200">
                <p className="text-green-800 font-semibold">
                  Alhamdulillah! Makanan habis dimakan! 😊
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Final celebration */}
        {showCelebration && (
          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-6 rounded-2xl border-4 border-emerald-300 mb-6 animate-fade-in">
            <div className="text-6xl mb-4">🤝</div>
            <h3 className="text-xl font-bold text-emerald-800 mb-2">
              Misi Selesai!
            </h3>
            <p className="text-emerald-700 text-sm mb-4">
              Kamu telah belajar tentang kurban Idul Adha dengan cara yang
              menyenangkan. Semoga ilmu ini bermanfaat dan menambah keimanan
              kita!
            </p>
            <div className="grid grid-cols-3 gap-2 text-2xl mb-4">
              <div>🕌</div>
              <div>🤲</div>
              <div>❤️</div>
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="space-y-3">
          <button
            onClick={onRestart}
            className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <div className="flex items-center justify-center gap-3">
              <RefreshCw className="h-5 w-5" />
              <span>Main Lagi</span>
            </div>
          </button>

          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: "Eid al-Adha Game",
                  text: `Aku baru menyelesaikan game kurban Idul Adha dengan skor ${score}! Badge: ${badge}`,
                  url: window.location.href,
                });
              }
            }}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-2xl shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <div className="flex items-center justify-center gap-3">
              <Share className="h-5 w-5" />
              <span>Bagikan Hasil</span>
            </div>
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-emerald-600">
            تَقَبَّلَ اللّهُ مِنَّا وَمِنكُم - Taqabbalallahu minna wa minkum
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinalFeast;
