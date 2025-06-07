import React, { useState } from "react";
import { ChefHat, Users, Heart } from "lucide-react";

interface CookingSelectionProps {
  onSelect: (food: string) => void;
}

const foods = [
  {
    id: "sate",
    name: "Sate",
    emoji: "🍢",
    description: "Daging ditusuk dan dibakar dengan bumbu kacang",
    ingredients: [
      "Daging potong dadu",
      "Bumbu kacang",
      "Kecap manis",
      "Tusuk sate",
    ],
    difficulty: "Mudah",
    time: "30 menit",
  },
  {
    id: "rendang",
    name: "Rendang",
    emoji: "🍛",
    description: "Masakan khas Padang yang kaya rempah",
    ingredients: ["Daging sapi", "Santan", "Cabai", "Rempah-rempah"],
    difficulty: "Sulit",
    time: "3 jam",
  },
  {
    id: "gulai",
    name: "Gulai",
    emoji: "🍲",
    description: "Masakan berkuah santan yang gurih",
    ingredients: ["Daging kambing", "Santan", "Bumbu halus", "Daun jeruk"],
    difficulty: "Sedang",
    time: "1 jam",
  },
  {
    id: "tongseng",
    name: "Tongseng",
    emoji: "🥘",
    description: "Masakan berkuah manis pedas khas Solo",
    ingredients: ["Daging kambing", "Kol", "Tomat", "Bumbu tongseng"],
    difficulty: "Sedang",
    time: "45 menit",
  },
];

const CookingSelection: React.FC<CookingSelectionProps> = ({ onSelect }) => {
  const [selectedFood, setSelectedFood] = useState<string | null>(null);
  const [showIngredients, setShowIngredients] = useState<string | null>(null);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Mudah":
        return "text-green-600 bg-green-100";
      case "Sedang":
        return "text-yellow-600 bg-yellow-100";
      case "Sulit":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="min-h-screen p-4 pt-20 mt-20">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-6">
          <ChefHat className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-emerald-800 mb-2">
            Pilih Olahan Daging
          </h2>
          <p className="text-emerald-600">
            Apa yang ingin kamu masak hari ini?
          </p>
        </div>

        {/* Educational note about sharing */}
        <div className="bg-blue-50 p-4 rounded-2xl border-2 border-blue-200 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-5 w-5 text-blue-600" />
            <span className="font-bold text-blue-800">
              Ingat! Daging Kurban:
            </span>
          </div>
          <div className="space-y-1 text-blue-700 text-sm">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-red-500" />
              <span>1/3 untuk keluarga</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-red-500" />
              <span>1/3 untuk tetangga</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-red-500" />
              <span>1/3 untuk fakir miskin</span>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          {foods.map((food) => (
            <div key={food.id} className="relative">
              <button
                onClick={() =>
                  setSelectedFood(selectedFood === food.id ? null : food.id)
                }
                className={`w-full p-4 rounded-2xl border-4 transition-all duration-200 text-left ${
                  selectedFood === food.id
                    ? "border-emerald-500 bg-emerald-50 scale-105"
                    : "border-emerald-200 bg-white hover:border-emerald-300 hover:scale-102"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{food.emoji}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-emerald-800 text-lg">
                      {food.name}
                    </h3>
                    <p className="text-emerald-600 text-sm mb-2">
                      {food.description}
                    </p>
                    <div className="flex gap-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(
                          food.difficulty
                        )}`}
                      >
                        {food.difficulty}
                      </span>
                      <span className="px-2 py-1 rounded-full text-xs font-semibold text-gray-600 bg-gray-100">
                        {food.time}
                      </span>
                    </div>
                  </div>
                </div>
              </button>

              <button
                onClick={() =>
                  setShowIngredients(
                    showIngredients === food.id ? null : food.id
                  )
                }
                className="absolute top-2 right-2 p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors text-xs"
              >
                📝
              </button>

              {showIngredients === food.id && (
                <div className="absolute top-16 left-0 right-0 bg-white border-2 border-yellow-200 rounded-lg p-4 shadow-lg z-10 animate-fade-in">
                  <h4 className="font-bold text-yellow-800 mb-2">
                    Bahan-bahan {food.name}:
                  </h4>
                  <ul className="space-y-1">
                    {food.ingredients.map((ingredient, index) => (
                      <li
                        key={index}
                        className="text-sm text-yellow-700 flex items-center gap-2"
                      >
                        <span className="text-yellow-500">•</span>
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {selectedFood && (
          <div className="animate-fade-in">
            <div className="bg-emerald-50 p-4 rounded-2xl border-2 border-emerald-200 mb-4">
              <p className="text-emerald-800 font-semibold mb-2">
                Kamu akan memasak:{" "}
                {foods.find((f) => f.id === selectedFood)?.name}{" "}
                {foods.find((f) => f.id === selectedFood)?.emoji}
              </p>
              <p className="text-emerald-700 text-sm">
                Siap-siap untuk mini game memasak yang seru!
              </p>
            </div>

            <button
              onClick={() => onSelect(selectedFood)}
              className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95"
            >
              Mulai Masak {foods.find((f) => f.id === selectedFood)?.name}!
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookingSelection;
