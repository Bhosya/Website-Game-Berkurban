
import React from 'react';
import { Star, Trophy } from 'lucide-react';
import { GameStage } from '../../types/game';

interface GameHeaderProps {
  score: number;
  stage: GameStage;
  animalName: string;
}

const GameHeader: React.FC<GameHeaderProps> = ({ score, stage, animalName }) => {
  const getStageDisplay = (stage: GameStage) => {
    switch (stage) {
      case 'selection': return 'Pilih Hewan';
      case 'naming': return 'Beri Nama';
      case 'slaughter': return 'Penyembelihan';
      case 'skinning': return 'Pengulitan';
      case 'cooking': return 'Memasak';
      case 'feast': return 'Makan Bersama';
      default: return '';
    }
  };

  const getProgressPercentage = (stage: GameStage) => {
    const stages = ['selection', 'naming', 'slaughter', 'skinning', 'cooking', 'feast'];
    const currentIndex = stages.indexOf(stage);
    return ((currentIndex + 1) / stages.length) * 100;
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-lg border-b-2 border-emerald-200 z-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <span className="font-bold text-emerald-800">{getStageDisplay(stage)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span className="font-bold text-emerald-700">{score}</span>
          </div>
        </div>
        
        {animalName && (
          <p className="text-sm text-emerald-600 mb-2">
            Hewan: {animalName}
          </p>
        )}
        
        <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-full transition-all duration-500"
            style={{ width: `${getProgressPercentage(stage)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default GameHeader;
