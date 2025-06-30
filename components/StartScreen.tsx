'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/lib/gameStore';
import { PLAYER_ARCHETYPES } from '@/lib/gameData';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Code, 
  Palette, 
  Zap, 
  Settings, 
  Rocket,
  Sparkles
} from 'lucide-react';
import { PlayerArchetype } from '@/lib/types';
import { cn } from '@/lib/utils';

const archetypeIcons = {
  'developer': Code,
  'designer': Palette,
  'growth-hacker': Zap,
  'operator': Settings
};

const archetypeColors = {
  'developer': 'from-blue-500/20 to-blue-600/10 border-blue-300',
  'designer': 'from-purple-500/20 to-purple-600/10 border-purple-300',
  'growth-hacker': 'from-green-500/20 to-green-600/10 border-green-300',
  'operator': 'from-orange-500/20 to-orange-600/10 border-orange-300'
};

export default function StartScreen() {
  const { createPlayer, startGame, players } = useGameStore();
  const [playerName, setPlayerName] = useState('');
  const [selectedArchetype, setSelectedArchetype] = useState<PlayerArchetype | null>(null);

  const handleCreatePlayer = () => {
    if (playerName.trim() && selectedArchetype) {
      createPlayer(playerName.trim(), selectedArchetype);
      setPlayerName('');
      setSelectedArchetype(null);
    }
  };

  const handleStartGame = () => {
    if (players.length > 0) {
      startGame();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <Rocket className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Founder Flux
            </h1>
            <Sparkles className="w-6 h-6 text-accent" />
          </motion.div>
          <p className="text-xl text-muted-foreground mb-2">
            Build your startup empire, one strategic decision at a time
          </p>
          <p className="text-sm text-muted-foreground">
            Navigate through phases of indie hustle, product launch, growth, and exit
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Player Creation */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Create Your Founder</h2>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="playerName" className="text-sm font-medium">
                  Founder Name
                </Label>
                <Input
                  id="playerName"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Enter your name"
                  className="mt-2"
                />
              </div>

              <div>
                <Label className="text-sm font-medium mb-4 block">
                  Choose Your Archetype
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(PLAYER_ARCHETYPES).map(([key, archetype]) => {
                    const Icon = archetypeIcons[key as PlayerArchetype];
                    const isSelected = selectedArchetype === key;
                    
                    return (
                      <motion.div
                        key={key}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Card
                          className={cn(
                            'p-4 cursor-pointer transition-all border-2',
                            isSelected 
                              ? 'ring-2 ring-primary border-primary' 
                              : 'hover:border-primary/50',
                            archetypeColors[key as PlayerArchetype]
                          )}
                          onClick={() => setSelectedArchetype(key as PlayerArchetype)}
                        >
                          <div className="text-center">
                            <Icon className="w-8 h-8 mx-auto mb-2 text-foreground" />
                            <h3 className="font-semibold text-sm mb-1">
                              {archetype.name}
                            </h3>
                            <p className="text-xs text-muted-foreground leading-tight">
                              {archetype.description}
                            </p>
                          </div>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <Button
                onClick={handleCreatePlayer}
                disabled={!playerName.trim() || !selectedArchetype}
                className="w-full"
              >
                Add Player
              </Button>
            </div>
          </Card>

          {/* Game Setup */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Game Setup</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">Players ({players.length})</h3>
                {players.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Add at least one player to start the game
                  </p>
                ) : (
                  <div className="space-y-2">
                    {players.map((player, index) => (
                      <div key={player.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <Badge variant="outline">
                          {index + 1}
                        </Badge>
                        <span className="font-medium">{player.name}</span>
                        <Badge variant="secondary" className="ml-auto">
                          {PLAYER_ARCHETYPES[player.archetype].name}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-medium mb-3">Game Features</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Turn-based strategic gameplay
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Energy and burnout mechanics
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    Opportunity and event cards
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    Multiple paths to success
                  </div>
                </div>
              </div>

              <Button
                onClick={handleStartGame}
                disabled={players.length === 0}
                className="w-full"
                size="lg"
              >
                Start Game
              </Button>
            </div>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}