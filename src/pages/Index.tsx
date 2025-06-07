
import React, { useState, useEffect } from 'react';
import WelcomeScreen from '../components/game/WelcomeScreen';
import AnimalSelection from '../components/game/AnimalSelection';
import NameAnimal from '../components/game/NameAnimal';
import Slaughter from '../components/game/Slaughter';
import Skinning from '../components/game/Skinning';
import CookingSelection from '../components/game/CookingSelection';
import FinalFeast from '../components/game/FinalFeast';
import GameHeader from '../components/game/GameHeader';
import { Animal, GameStage, GameState } from '../types/game';

const Index = () => {
  const [gameState, setGameState] = useState<GameState>({
    stage: 'welcome',
    selectedAnimal: null,
    animalName: '',
    score: 0,
    badges: [],
    selectedFood: null
  });

  const [showPrayer, setShowPrayer] = useState(false);

  const updateGameState = (newState: Partial<GameState>) => {
    setGameState(prev => ({ ...prev, ...newState }));
  };

  const nextStage = () => {
    const stages: GameStage[] = ['welcome', 'selection', 'naming', 'slaughter', 'skinning', 'cooking', 'feast'];
    const currentIndex = stages.indexOf(gameState.stage);
    if (currentIndex < stages.length - 1) {
      updateGameState({ stage: stages[currentIndex + 1] });
    }
  };

  const resetGame = () => {
    setGameState({
      stage: 'welcome',
      selectedAnimal: null,
      animalName: '',
      score: 0,
      badges: [],
      selectedFood: null
    });
  };

  const renderCurrentStage = () => {
    switch (gameState.stage) {
      case 'welcome':
        return <WelcomeScreen onStart={nextStage} />;
      case 'selection':
        return (
          <AnimalSelection 
            onSelect={(animal: Animal) => {
              updateGameState({ selectedAnimal: animal, score: gameState.score + 10 });
              nextStage();
            }}
          />
        );
      case 'naming':
        return (
          <NameAnimal 
            animal={gameState.selectedAnimal!}
            onName={(name: string) => {
              updateGameState({ animalName: name, score: gameState.score + 15 });
              setShowPrayer(true);
              setTimeout(() => {
                setShowPrayer(false);
                nextStage();
              }, 3000);
            }}
            showPrayer={showPrayer}
          />
        );
      case 'slaughter':
        return (
          <Slaughter 
            animal={gameState.selectedAnimal!}
            animalName={gameState.animalName}
            onComplete={() => {
              updateGameState({ score: gameState.score + 20 });
              nextStage();
            }}
          />
        );
      case 'skinning':
        return (
          <Skinning 
            animal={gameState.selectedAnimal!}
            onComplete={() => {
              updateGameState({ score: gameState.score + 25 });
              nextStage();
            }}
          />
        );
      case 'cooking':
        return (
          <CookingSelection 
            onSelect={(food: string) => {
              updateGameState({ selectedFood: food, score: gameState.score + 30 });
              nextStage();
            }}
          />
        );
      case 'feast':
        return (
          <FinalFeast 
            food={gameState.selectedFood!}
            score={gameState.score + 50}
            onRestart={resetGame}
          />
        );
      default:
        return <WelcomeScreen onStart={nextStage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-yellow-50 to-orange-50">
      {gameState.stage !== 'welcome' && (
        <GameHeader 
          score={gameState.score}
          stage={gameState.stage}
          animalName={gameState.animalName}
        />
      )}
      <div className="pb-safe">
        {renderCurrentStage()}
      </div>
    </div>
  );
};

export default Index;
