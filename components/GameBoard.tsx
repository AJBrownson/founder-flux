'use client';

import { motion } from 'framer-motion';
import { useGameStore } from '@/lib/gameStore';
import { GameTile } from '@/lib/types';
import { cn } from '@/lib/utils';
import { 
  Lightbulb, 
  Code, 
  Zap, 
  Users, 
  Trophy, 
  AlertTriangle,
  TrendingUp,
  Target,
  Rocket,
  Star
} from 'lucide-react';

const getTileIcon = (type: string) => {
  switch (type) {
    case 'start': return Lightbulb;
    case 'milestone': return Trophy;
    case 'crisis': return AlertTriangle;
    case 'opportunity': return Star;
    case 'event': return Zap;
    default: return Target;
  }
};

const getTileColors = (type: string) => {
  switch (type) {
    case 'start': return 'from-purple-500/20 to-purple-600/10 border-purple-300';
    case 'milestone': return 'from-yellow-500/20 to-yellow-600/10 border-yellow-300';
    case 'crisis': return 'from-red-500/20 to-red-600/10 border-red-300';
    case 'opportunity': return 'from-green-500/20 to-green-600/10 border-green-300';
    case 'event': return 'from-blue-500/20 to-blue-600/10 border-blue-300';
    default: return 'from-gray-500/20 to-gray-600/10 border-gray-300';
  }
};

interface BoardTileProps {
  tile: GameTile;
  isPlayerHere: boolean;
  playerCount: number;
}

function BoardTile({ tile, isPlayerHere, playerCount }: BoardTileProps) {
  const Icon = getTileIcon(tile.type);
  const colors = getTileColors(tile.type);

  return (
    <motion.div
      className={cn(
        'game-tile min-w-[200px] h-32 p-4 border-2 bg-gradient-to-br',
        colors,
        isPlayerHere && 'game-tile-active'
      )}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col h-full justify-between">
        <div className="flex items-start justify-between">
          <Icon className="w-6 h-6 text-foreground/70" />
          {isPlayerHere && (
            <div className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
              {playerCount} player{playerCount > 1 ? 's' : ''}
            </div>
          )}
        </div>
        
        <div>
          <h3 className="font-semibold text-sm leading-tight mb-1">
            {tile.title}
          </h3>
          <p className="text-xs text-muted-foreground leading-tight">
            {tile.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function GameBoard() {
  const { gameBoard, players } = useGameStore();

  const getPhaseTitle = (phase: string) => {
    switch (phase) {
      case 'indie-hustler': return '🎯 Indie Hustler Phase';
      case 'launch': return '🚀 Launch Phase';
      case 'growth': return '📈 Growth Phase';
      case 'exit': return '🎉 Exit Phase';
      default: return phase;
    }
  };

  const phaseGroups = gameBoard.reduce((acc, tile) => {
    if (!acc[tile.phase]) {
      acc[tile.phase] = [];
    }
    acc[tile.phase].push(tile);
    return acc;
  }, {} as Record<string, GameTile[]>);

  return (
    <div className="bg-card rounded-xl border shadow-sm p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Startup Journey</h2>
        <p className="text-muted-foreground">Navigate through the phases of building your startup</p>
      </div>

      <div className="space-y-8">
        {Object.entries(phaseGroups).map(([phase, tiles]) => (
          <div key={phase} className="space-y-4">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold text-foreground">
                {getPhaseTitle(phase)}
              </h3>
              <div className="flex-1 h-px bg-border"></div>
            </div>
            
            <div className="phase-track">
              {tiles.map((tile) => {
                const playersHere = players.filter(p => p.position === tile.position);
                return (
                  <BoardTile
                    key={tile.id}
                    tile={tile}
                    isPlayerHere={playersHere.length > 0}
                    playerCount={playersHere.length}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}