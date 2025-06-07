
export type GameStage = 'welcome' | 'selection' | 'naming' | 'slaughter' | 'skinning' | 'cooking' | 'feast';

export interface Animal {
  id: string;
  name: string;
  nameIndonesian: string;
  image: string;
  minAge: string;
  facts: string[];
  conditions: string[];
}

export interface GameState {
  stage: GameStage;
  selectedAnimal: Animal | null;
  animalName: string;
  score: number;
  badges: string[];
  selectedFood: string | null;
}

export interface Food {
  id: string;
  name: string;
  image: string;
  description: string;
  ingredients: string[];
}
