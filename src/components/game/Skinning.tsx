import React, { useState, useEffect } from "react";
import { Zap, Info, Trophy } from "lucide-react";
import { Animal } from "../../types/game";

interface SkinningProps {
  animal: Animal;
  onComplete: () => void;
}

const Skinning: React.FC<SkinningProps> = ({ animal, onComplete }) => {
  const [skinningProgress, setSkinningProgress] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [canFlip, setCanFlip] = useState(true);
  const [showMatchAnimation, setShowMatchAnimation] = useState(false);

  const animalImages = [
    "🐄",
    "🐄", // sapi
    "🐐",
    "🐐", // kambing
    "🐏",
    "🐏", // domba
    "🐪",
    "🐪", // unta
  ];

  const handleCardClick = (index: number) => {
    if (
      !canFlip ||
      flippedCards.includes(index) ||
      matchedPairs.includes(index)
    )
      return;

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setCanFlip(false);
      const [first, second] = newFlippedCards;

      if (animalImages[first] === animalImages[second]) {
        // Match found
        setShowMatchAnimation(true);
        setTimeout(() => setShowMatchAnimation(false), 1000);
        setMatchedPairs([...matchedPairs, first, second]);
        setFlippedCards([]);
        setCanFlip(true);

        // Increase skinning progress
        setSkinningProgress((prev) => {
          const newProgress = Math.min(prev + 25, 100);
          if (newProgress >= 100) {
            setCompleted(true);
            setTimeout(() => onComplete(), 2000);
          }
          return newProgress;
        });
      } else {
        // No match
        setTimeout(() => {
          setFlippedCards([]);
          setCanFlip(true);
        }, 1000);
      }
    }
  };

  const isCardFlipped = (index: number) => {
    return flippedCards.includes(index) || matchedPairs.includes(index);
  };

  return (
    <div className="min-h-screen p-4 pt-20 mt-20 bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-md mx-auto text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <h2 className="text-3xl font-bold text-emerald-800 bg-white px-6 py-2 rounded-full shadow-lg">
            Pengulitan Hewan
          </h2>
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors shadow-lg hover:scale-110 transform duration-200"
          >
            <Info className="h-5 w-5" />
          </button>
        </div>

        <p className="text-emerald-600 mb-6 text-lg font-medium">
          Temukan pasangan hewan untuk menguliti
        </p>

        {showInfo && (
          <div className="mb-6 bg-white p-6 rounded-2xl border-2 border-blue-200 animate-fade-in shadow-lg">
            <h3 className="font-bold text-blue-800 mb-4 text-xl">
              Manfaat Pengulitan:
            </h3>
            <div className="space-y-3 text-left text-blue-700">
              <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg">
                <span className="text-2xl">🥩</span>
                <span>Memisahkan daging dari kulit</span>
              </div>
              <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg">
                <span className="text-2xl">👜</span>
                <span>Kulit bisa dibuat tas, sepatu, dll</span>
              </div>
              <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg">
                <span className="text-2xl">🍖</span>
                <span>Daging jadi lebih bersih</span>
              </div>
              <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg">
                <span className="text-2xl">💰</span>
                <span>Kulit bisa dijual untuk tambahan rezeki</span>
              </div>
            </div>
          </div>
        )}

        <div className="mb-8">
          <div className="relative">
            <div className="text-8xl mb-4 transition-all duration-300 transform hover:scale-110">
              {completed ? "🥩" : animal.image}
            </div>

            {!completed && skinningProgress > 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl opacity-60 animate-pulse">🥩</div>
              </div>
            )}
          </div>

          <div className="mb-4">
            <div className="bg-white rounded-full h-8 overflow-hidden border-4 border-gray-200 shadow-lg">
              <div
                className="bg-gradient-to-r from-orange-400 to-red-500 h-full transition-all duration-300 flex items-center justify-end pr-3"
                style={{ width: `${skinningProgress}%` }}
              >
                {skinningProgress > 20 && (
                  <Zap className="h-5 w-5 text-white animate-bounce" />
                )}
              </div>
            </div>
            <p className="text-emerald-700 text-sm mt-2 font-medium">
              {skinningProgress}% selesai
            </p>
          </div>
        </div>

        {!completed ? (
          <div className="space-y-6">
            <div className="grid grid-cols-4 gap-3">
              {animalImages.map((emoji, i) => (
                <button
                  key={i}
                  onClick={() => handleCardClick(i)}
                  className={`aspect-square rounded-xl text-3xl font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                    isCardFlipped(i)
                      ? "bg-white shadow-lg border-2 border-emerald-200"
                      : "bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-lg"
                  }`}
                >
                  {isCardFlipped(i) ? emoji : "❓"}
                </button>
              ))}
            </div>

            {showMatchAnimation && (
              <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-6xl animate-bounce">🎯</div>
              </div>
            )}

            <div className="bg-white p-4 rounded-xl border-2 border-yellow-200 shadow-lg">
              <p className="text-yellow-700 text-sm font-medium">
                💡 Tip: Temukan pasangan hewan yang sama!
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-white p-8 rounded-2xl border-4 border-green-200 shadow-lg">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-green-800 mb-3">
                Pengulitan Selesai! 🥩
              </h3>
              <p className="text-green-700 mb-6">
                Daging sudah siap untuk diolah menjadi makanan lezat!
              </p>
              <div className="grid grid-cols-3 gap-4 text-3xl">
                <div className="animate-bounce">🥩</div>
                <div
                  className="animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                >
                  🥩
                </div>
                <div
                  className="animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                >
                  🥩
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Skinning;
