import React, { useState } from "react";
import { Info, CheckCircle } from "lucide-react";
import { Animal } from "../../types/game";

interface AnimalSelectionProps {
  onSelect: (animal: Animal) => void;
}

const animals: Animal[] = [
  {
    id: "kambing",
    name: "Goat",
    nameIndonesian: "Kambing",
    image: "🐐",
    minAge: "1 tahun",
    facts: ["Mudah dipelihara", "Dagingnya lezat", "Ramah lingkungan"],
    conditions: [
      "Sehat dan tidak cacat",
      "Tidak buta atau pincang",
      "Tidak kurus berlebihan",
    ],
  },
  {
    id: "domba",
    name: "Sheep",
    nameIndonesian: "Domba",
    image: "🐑",
    minAge: "6 bulan",
    facts: [
      "Bulunya bisa dimanfaatkan",
      "Mudah dijinakkan",
      "Suka hidup berkelompok",
    ],
    conditions: ["Gemuk dan sehat", "Mata jernih", "Tidak sakit kulit"],
  },
  {
    id: "sapi",
    name: "Cow",
    nameIndonesian: "Sapi",
    image: "🐄",
    minAge: "2 tahun",
    facts: [
      "Menghasilkan daging banyak",
      "Bisa untuk 7 orang",
      "Memberikan susu",
    ],
    conditions: ["Berat minimal 200kg", "Sehat dan kuat", "Tidak hamil"],
  },
  {
    id: "unta",
    name: "Camel",
    nameIndonesian: "Unta",
    image: "🐪",
    minAge: "5 tahun",
    facts: ["Tahan hidup di gurun", "Bisa untuk 10 orang", "Sangat kuat"],
    conditions: ["Tinggi dan besar", "Sehat sempurna", "Tidak sedang sakit"],
  },
];

const AnimalSelection: React.FC<AnimalSelectionProps> = ({ onSelect }) => {
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [showInfo, setShowInfo] = useState<string | null>(null);

  return (
    <div className="min-h-screen p-4 pt-20">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-emerald-800 mb-2">
            Pilih Hewan Kurban
          </h2>
          <p className="text-emerald-600">
            Pilih hewan yang ingin kamu kurbankan
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {animals.map((animal) => (
            <div key={animal.id} className="relative">
              <button
                onClick={() => setSelectedAnimal(animal)}
                className={`w-full p-4 rounded-2xl border-4 transition-all duration-200 ${
                  selectedAnimal?.id === animal.id
                    ? "border-emerald-500 bg-emerald-50 scale-105"
                    : "border-emerald-200 bg-white hover:border-emerald-300 hover:scale-105"
                }`}
              >
                <div className="text-4xl mb-2">{animal.image}</div>
                <h3 className="font-bold text-emerald-800">
                  {animal.nameIndonesian}
                </h3>
                <p className="text-xs text-emerald-600">Min: {animal.minAge}</p>
                {selectedAnimal?.id === animal.id && (
                  <CheckCircle className="absolute -top-2 -right-2 h-6 w-6 text-emerald-500 fill-emerald-100" />
                )}
              </button>

              <button
                onClick={() =>
                  setShowInfo(showInfo === animal.id ? null : animal.id)
                }
                className="absolute top-2 right-2 p-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
              >
                <Info className="h-3 w-3" />
              </button>

              {showInfo === animal.id && (
                <div className="absolute top-12 left-0 right-0 bg-white border-2 border-blue-200 rounded-lg p-3 shadow-lg z-10 animate-fade-in">
                  <h4 className="font-bold text-blue-800 mb-2">
                    Syarat {animal.nameIndonesian}:
                  </h4>
                  <ul className="text-xs text-blue-700 space-y-1">
                    {animal.conditions.map((condition, index) => (
                      <li key={index}>• {condition}</li>
                    ))}
                  </ul>
                  <h4 className="font-bold text-blue-800 mb-1 mt-2">
                    Fakta Menarik:
                  </h4>
                  <ul className="text-xs text-blue-700 space-y-1">
                    {animal.facts.map((fact, index) => (
                      <li key={index}>• {fact}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {selectedAnimal && (
          <div className="animate-fade-in">
            <div className="bg-emerald-50 p-4 rounded-2xl border-2 border-emerald-200 mb-4">
              <p className="text-emerald-800 font-semibold mb-2">
                Kamu memilih: {selectedAnimal.nameIndonesian}{" "}
                {selectedAnimal.image}
              </p>
              <p className="text-emerald-700 text-sm">
                Umur minimal: {selectedAnimal.minAge}
              </p>
            </div>

            <button
              onClick={() => onSelect(selectedAnimal)}
              className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95"
            >
              Lanjutkan dengan {selectedAnimal.nameIndonesian}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimalSelection;
