import { create } from 'zustand';
import { GameState, GamePlayer, Card, GameAction, PlayerArchetype } from './types';
import { OPPORTUNITY_CARDS, EVENT_CARDS, GAME_BOARD, PLAYER_ARCHETYPES } from './gameData';

interface GameStore extends GameState {
  // Actions
  createPlayer: (name: string, archetype: PlayerArchetype) => void;
  selectCard: (card: Card | null) => void;
  playCard: (cardId: string) => void;
  performAction: (action: GameAction) => void;
  nextTurn: () => void;
  movePlayer: (playerId: string, position: number) => void;
  updatePlayerStats: (playerId: string, updates: Partial<GamePlayer['stats']>) => void;
  resetGame: () => void;
  startGame: () => void;
}

const createInitialPlayer = (name: string, archetype: PlayerArchetype): GamePlayer => {
  const archetypeData = PLAYER_ARCHETYPES[archetype];
  
  return {
    id: `player-${Date.now()}`,
    name,
    archetype,
    position: 0,
    phase: 'indie-hustler',
    stats: {
      cash: 5000,
      mrr: 0,
      energy: 100,
      reputation: 0,
      burnRate: 500,
      users: 0
    },
    skills: {
      development: archetypeData.startingSkills.development,
      design: archetypeData.startingSkills.design,
      growth: archetypeData.startingSkills.growth,
      operations: archetypeData.startingSkills.operations
    },
    products: [],
    cards: []
  };
};

const initialState: GameState = {
  currentPlayer: 0,
  players: [],
  currentTurn: 1,
  gamePhase: 'indie-hustler',
  selectedCard: null,
  gameBoard: GAME_BOARD,
  isGameActive: false
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,

  createPlayer: (name: string, archetype: PlayerArchetype) => {
    const newPlayer = createInitialPlayer(name, archetype);
    set((state) => ({
      players: [...state.players, newPlayer]
    }));
  },

  selectCard: (card: Card | null) => {
    set({ selectedCard: card });
  },

  playCard: (cardId: string) => {
    const state = get();
    const currentPlayer = state.players[state.currentPlayer];
    const card = [...OPPORTUNITY_CARDS, ...EVENT_CARDS].find(c => c.id === cardId);
    
    if (!card || !currentPlayer) return;

    // Apply card effects
    const updatedStats = { ...currentPlayer.stats };
    
    card.effects.forEach(effect => {
      switch (effect.type) {
        case 'cash':
          updatedStats.cash += effect.value;
          break;
        case 'mrr':
          updatedStats.mrr += effect.value;
          break;
        case 'energy':
          updatedStats.energy = Math.max(0, Math.min(100, updatedStats.energy + effect.value));
          break;
        case 'reputation':
          updatedStats.reputation += effect.value;
          break;
        case 'users':
          updatedStats.users = Math.max(0, updatedStats.users + effect.value);
          break;
      }
    });

    // Deduct card cost if applicable
    if (card.cost) {
      updatedStats.cash -= card.cost;
    }

    set((state) => ({
      players: state.players.map((player, index) =>
        index === state.currentPlayer
          ? { ...player, stats: updatedStats }
          : player
      ),
      selectedCard: null
    }));
  },

  performAction: (action: GameAction) => {
    const state = get();
    const currentPlayer = state.players[state.currentPlayer];
    
    if (!currentPlayer) return;

    const updatedStats = { ...currentPlayer.stats };

    switch (action) {
      case 'freelance':
        // Gain money but lose energy
        updatedStats.cash += 1000 + (currentPlayer.skills.operations * 200);
        updatedStats.energy = Math.max(0, updatedStats.energy - 15);
        break;
        
      case 'build':
        // Advance position and build product
        const newPosition = Math.min(currentPlayer.position + 1, GAME_BOARD.length - 1);
        const buildCost = 500;
        
        if (updatedStats.cash >= buildCost) {
          updatedStats.cash -= buildCost;
          updatedStats.energy = Math.max(0, updatedStats.energy - 10);
          
          set((state) => ({
            players: state.players.map((player, index) =>
              index === state.currentPlayer
                ? { ...player, stats: updatedStats, position: newPosition }
                : player
            )
          }));
        }
        return;
        
      case 'draw-card':
        // Draw a random card
        const allCards = [...OPPORTUNITY_CARDS, ...EVENT_CARDS];
        const availableCards = allCards.filter(card => 
          !card.phase || card.phase === currentPlayer.phase
        );
        const randomCard = availableCards[Math.floor(Math.random() * availableCards.length)];
        
        set({ selectedCard: randomCard });
        return;
    }

    set((state) => ({
      players: state.players.map((player, index) =>
        index === state.currentPlayer
          ? { ...player, stats: updatedStats }
          : player
      )
    }));
  },

  nextTurn: () => {
    const state = get();
    const nextPlayer = (state.currentPlayer + 1) % state.players.length;
    const nextTurn = nextPlayer === 0 ? state.currentTurn + 1 : state.currentTurn;

    set({
      currentPlayer: nextPlayer,
      currentTurn: nextTurn,
      selectedCard: null
    });
  },

  movePlayer: (playerId: string, position: number) => {
    set((state) => ({
      players: state.players.map(player =>
        player.id === playerId
          ? { ...player, position }
          : player
      )
    }));
  },

  updatePlayerStats: (playerId: string, updates: Partial<GamePlayer['stats']>) => {
    set((state) => ({
      players: state.players.map(player =>
        player.id === playerId
          ? { ...player, stats: { ...player.stats, ...updates } }
          : player
      )
    }));
  },

  resetGame: () => {
    set(initialState);
  },

  startGame: () => {
    set({ isGameActive: true });
  }
}));