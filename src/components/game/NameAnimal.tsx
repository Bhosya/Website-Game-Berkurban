import React, { useState } from "react";
import { Heart } from "lucide-react";
import { Animal } from "../../types/game";

interface NameAnimalProps {
  animal: Animal;
  onName: (name: string) => void;
  showPrayer: boolean;
}

const NameAnimal: React.FC<NameAnimalProps> = ({
  animal,
  onName,
  showPrayer,
}) => {
  const [animalName, setAnimalName] = useState("");

  const handleSubmit = () => {
    if (animalName.trim()) {
      onName(animalName.trim());
    }
  };

  if (showPrayer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-sm w-full text-center animate-fade-in">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-4 border-emerald-200">
            <div className="text-6xl mb-4 animate-bounce">{animal.image}</div>
            <h3 className="text-xl font-bold text-emerald-800 mb-4">
              Doa Berkurban
            </h3>

            <div className="bg-emerald-50 p-4 rounded-2xl border-2 border-emerald-200 mb-4">
              <p
                className="text-right text-emerald-800 font-semibold text-lg mb-2"
                dir="rtl"
              >
                بِسْمِ اللّهِ وَاللّهُ أَكْبَرُ
              </p>
              <p
                className="text-right text-emerald-800 font-semibold text-sm mb-3"
                dir="rtl"
              >
                اللَّهُمَّ هَذَا مِنْكَ وَلَكَ
              </p>
              <hr className="border-emerald-300 my-3" />
              <p className="text-emerald-700 text-sm">
                "Bismillahi wallahu akbar, Allahumma hadza minka wa laka"
              </p>
              <p className="text-emerald-600 text-xs mt-2">
                (Dengan nama Allah, Allah Maha Besar, Ya Allah ini dari-Mu dan
                untuk-Mu)
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 pt-20 mt-20">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4 animate-bounce">{animal.image}</div>
          <h2 className="text-2xl font-bold text-emerald-800 mb-2">
            Beri Nama {animal.nameIndonesian}mu
          </h2>
          <p className="text-emerald-600">
            Berikan nama yang lucu untuk {animal.nameIndonesian} pilihanmu
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="bg-white rounded-2xl p-4 border-4 border-emerald-200 shadow-lg">
            <label className="block text-emerald-800 font-semibold mb-2">
              Nama {animal.nameIndonesian}:
            </label>
            <input
              type="text"
              value={animalName}
              onChange={(e) => setAnimalName(e.target.value)}
              placeholder={`Contoh: Si ${animal.nameIndonesian} Lucu`}
              className="w-full p-3 border-2 border-emerald-300 rounded-xl focus:border-emerald-500 focus:outline-none text-emerald-800"
              maxLength={20}
            />
          </div>

          {animalName && (
            <div className="bg-yellow-50 p-4 rounded-2xl border-2 border-yellow-200 animate-fade-in">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                <span className="font-semibold text-yellow-800">
                  Pratinjau:
                </span>
              </div>
              <p className="text-yellow-700">
                "Hai {animalName}! Kamu akan menjadi kurban yang berkah hari ini{" "}
                {animal.image}"
              </p>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <button
            onClick={handleSubmit}
            disabled={!animalName.trim()}
            className={`w-full font-bold py-4 px-6 rounded-2xl shadow-lg transform transition-all duration-200 ${
              animalName.trim()
                ? "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white hover:scale-105 active:scale-95"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {animalName.trim()
              ? `Lanjutkan dengan ${animalName}`
              : "Masukkan nama dulu"}
          </button>

          <div className="text-center">
            <p className="text-xs text-emerald-600">
              Setelah memberi nama, kamu akan membaca doa berkurban
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NameAnimal;
