'use client';

import { motion } from 'framer-motion';
import { useGameStore } from '@/lib/gameStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Hammer, Car as CardIcon, ArrowRight, DollarSign, Battery, Zap } from 'lucide-react';

export default function GameActions() {
  const { performAction, nextTurn, players, currentPlayer, currentTurn } = useGameStore();
  const player = players[currentPlayer];

  if (!player) return null;

  const actions = [
    {
      id: 'freelance' as const,
      title: 'Freelance Work',
      description: 'Take on client work to earn money',
      icon: Briefcase,
      effects: [
        { icon: DollarSign, text: `+$${1000 + (player.skills.operations * 200)}`, positive: true },
        { icon: Battery, text: '-15 Energy', positive: false }
      ],
      color: 'from-blue-500/10 to-blue-600/5 border-blue-200',
      available: true
    },
    {
      id: 'build' as const,
      title: 'Build Product',
      description: 'Advance your startup progress',
      icon: Hammer,
      effects: [
        { icon: ArrowRight, text: 'Move Forward', positive: true },
        { icon: DollarSign, text: '-$500', positive: false },
        { icon: Battery, text: '-10 Energy', positive: false }
      ],
      color: 'from-green-500/10 to-green-600/5 border-green-200',
      available: player.stats.cash >= 500
    },
    {
      id: 'draw-card' as const,
      title: 'Draw Card',
      description: 'Draw an opportunity or event card',
      icon: CardIcon,
      effects: [
        { icon: Zap, text: 'Random Effect', positive: null }
      ],
      color: 'from-purple-500/10 to-purple-600/5 border-purple-200',
      available: true
    }
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Your Turn</h3>
          <p className="text-sm text-muted-foreground">Turn {currentTurn} • Choose an action</p>
        </div>
        <Badge variant="secondary">
          {player.name}
        </Badge>
      </div>

      <div className="grid gap-4 mb-6">
        {actions.map((action, index) => (
          <motion.div
            key={action.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Button
              onClick={() => performAction(action.id)}
              disabled={!action.available}
              variant="outline"
              className="w-full h-auto p-4 justify-start hover:scale-[1.02] transition-all"
            >
              <div className="flex items-start gap-4 w-full">
                <div className="p-2 rounded-lg bg-muted">
                  <action.icon className="w-5 h-5" />
                </div>
                
                <div className="flex-1 text-left">
                  <h4 className="font-semibold text-sm mb-1">{action.title}</h4>
                  <p className="text-xs text-muted-foreground mb-2">{action.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {action.effects.map((effect, effectIndex) => (
                      <div 
                        key={effectIndex}
                        className="flex items-center gap-1 text-xs"
                      >
                        <effect.icon className={`w-3 h-3 ${
                          effect.positive === true ? 'text-green-600' : 
                          effect.positive === false ? 'text-red-600' : 
                          'text-muted-foreground'
                        }`} />
                        <span className={
                          effect.positive === true ? 'text-green-600' : 
                          effect.positive === false ? 'text-red-600' : 
                          'text-muted-foreground'
                        }>
                          {effect.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Button>
          </motion.div>
        ))}
      </div>

      <Button 
        onClick={nextTurn}
        variant="secondary"
        className="w-full"
      >
        End Turn
      </Button>
    </Card>
  );
}