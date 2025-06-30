export interface GamePlayer {
  id: string;
  name: string;
  archetype: PlayerArchetype;
  position: number;
  phase: GamePhase;
  stats: PlayerStats;
  skills: PlayerSkills;
  products: Product[];
  cards: Card[];
}

export interface PlayerStats {
  cash: number;
  mrr: number;
  energy: number;
  reputation: number;
  burnRate: number;
  users: number;
}

export interface PlayerSkills {
  development: number;
  design: number;
  growth: number;
  operations: number;
}

export type PlayerArchetype = 'developer' | 'designer' | 'growth-hacker' | 'operator';

export type GamePhase = 'indie-hustler' | 'launch' | 'growth' | 'exit';

export interface Product {
  id: string;
  name: string;
  type: 'saas' | 'marketplace' | 'content';
  quality: number;
  users: number;
  mrr: number;
}

export interface Card {
  id: string;
  title: string;
  description: string;
  type: 'opportunity' | 'event';
  cost?: number;
  effects: CardEffect[];
  tags: string[];
  phase?: GamePhase;
}

export interface CardEffect {
  type: 'cash' | 'mrr' | 'energy' | 'reputation' | 'users' | 'skill' | 'product';
  value: number;
  delay?: number;
  duration?: number;
}

export interface GameTile {
  id: string;
  type: 'start' | 'milestone' | 'crisis' | 'opportunity' | 'event';
  title: string;
  description: string;
  phase: GamePhase;
  position: number;
  effects?: CardEffect[];
}

export interface GameState {
  currentPlayer: number;
  players: GamePlayer[];
  currentTurn: number;
  gamePhase: GamePhase;
  selectedCard: Card | null;
  gameBoard: GameTile[];
  isGameActive: boolean;
}

export type GameAction = 'freelance' | 'build' | 'draw-card';