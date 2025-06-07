import React, { useState } from "react";
import { Scissors, Book, Check } from "lucide-react";
import { Animal } from "../../types/game";

interface SlaughterProps {
  animal: Animal;
  animalName: string;
  onComplete: () => void;
}

const SlaughterProps: React.FC<SlaughterProps> = ({
  animal,
  animalName,
  onComplete,
}) => {
  const [showEducation, setShowEducation] = useState(true);
  const [slaughterProgress, setSlaughterProgress] = useState(0);
  const [isSlaughtering, setIsSlaughtering] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleSlaughter = () => {
    if (!isSlaughtering) {
      setIsSlaughtering(true);
      const interval = setInterval(() => {
        setSlaughterProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setCompleted(true);
            setTimeout(() => onComplete(), 2000);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
  };

  if (showEducation) {
    return (
      <div className="min-h-screen p-4 pt-20 mt-20">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <Book className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-emerald-800 mb-2">
              Tata Cara Penyembelihan
            </h2>
            <p className="text-emerald-600">
              Mari belajar cara menyembelih yang benar menurut Islam
            </p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="bg-white p-4 rounded-2xl border-4 border-emerald-200 shadow-lg">
              <h3 className="font-bold text-emerald-800 mb-3 flex items-center gap-2">
                <span className="text-emerald-500">📖</span>
                Doa Menyembelih:
              </h3>
              <div className="bg-emerald-50 p-3 rounded-xl">
                <p
                  className="text-right text-emerald-800 font-semibold mb-2"
                  dir="rtl"
                >
                  بِسْمِ اللّهِ وَاللّهُ أَكْبَرُ
                </p>
                <p className="text-emerald-700 text-sm">
                  "Bismillahi wallahu akbar"
                </p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border-4 border-blue-200 shadow-lg">
              <h3 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                <span className="text-blue-500">⚔️</span>
                Bagian yang Dipotong:
              </h3>
              <ul className="space-y-2 text-blue-700">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Tenggorokan (halqum)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Kerongkongan (mari')</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Urat leher (wadajain)</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-2xl border-4 border-yellow-200 shadow-lg">
              <h3 className="font-bold text-yellow-800 mb-3 flex items-center gap-2">
                <span className="text-yellow-500">💡</span>
                Fakta Menarik:
              </h3>
              <ul className="space-y-2 text-yellow-700 text-sm">
                <li>• Pisau harus tajam agar tidak menyiksa hewan</li>
                <li>• Hewan tidak boleh melihat pisau sebelumnya</li>
                <li>• Penyembelihan harus cepat dan tepat</li>
                <li>• Menghadap kiblat saat menyembelih</li>
              </ul>
            </div>
          </div>

          <button
            onClick={() => setShowEducation(false)}
            className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95"
          >
            Lanjut ke Penyembelihan
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 pt-20 mt-20">
      <div className="max-w-md mx-auto text-center">
        <h2 className="text-2xl font-bold text-emerald-800 mb-2">
          Penyembelihan {animalName}
        </h2>
        <p className="text-emerald-600 mb-6">
          Tap dan tahan untuk memulai penyembelihan
        </p>

        <div className="mb-8">
          <div className="text-8xl mb-4 transition-all duration-300">
            {completed ? "✅" : animal.image}
          </div>

          {!completed && (
            <div className="mb-4">
              <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-full transition-all duration-200"
                  style={{ width: `${slaughterProgress}%` }}
                ></div>
              </div>
              <p className="text-emerald-700 text-sm mt-2">
                {slaughterProgress}% selesai
              </p>
            </div>
          )}
        </div>

        {!completed ? (
          <div className="space-y-4">
            <button
              onMouseDown={handleSlaughter}
              onTouchStart={handleSlaughter}
              disabled={isSlaughtering}
              className={`w-full py-6 px-6 rounded-2xl shadow-lg transform transition-all duration-200 font-bold text-lg ${
                isSlaughtering
                  ? "bg-orange-400 text-white scale-95"
                  : "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white hover:scale-105 active:scale-95"
              }`}
            >
              <div className="flex items-center justify-center gap-3">
                <Scissors className="h-6 w-6" />
                <span>
                  {isSlaughtering ? "Sedang menyembelih..." : "Tap dan Tahan"}
                </span>
              </div>
            </button>

            <div className="bg-emerald-50 p-3 rounded-xl border-2 border-emerald-200">
              <p className="text-emerald-700 text-sm">
                🤲 Ingat: Baca doa dan lakukan dengan penuh rasa syukur
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-green-50 p-6 rounded-2xl border-4 border-green-200">
              <h3 className="text-xl font-bold text-green-800 mb-2">
                Penyembelihan Selesai! ✅
              </h3>
              <p className="text-green-700">
                {animalName} telah disembelih dengan cara yang benar dan penuh
                berkah.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SlaughterProps;
