'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/lib/gameStore';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  DollarSign, 
  TrendingUp, 
  Battery, 
  Heart, 
  Users, 
  Zap,
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

const getEffectIcon = (type: string) => {
  switch (type) {
    case 'cash': return DollarSign;
    case 'mrr': return TrendingUp;
    case 'energy': return Battery;
    case 'reputation': return Heart;
    case 'users': return Users;
    default: return Zap;
  }
};

const getEffectColor = (type: string, value: number) => {
  const isPositive = value > 0;
  
  switch (type) {
    case 'cash':
    case 'mrr':
    case 'users':
    case 'reputation':
      return isPositive ? 'text-green-600' : 'text-red-600';
    case 'energy':
      return isPositive ? 'text-blue-600' : 'text-orange-600';
    default:
      return isPositive ? 'text-green-600' : 'text-red-600';
  }
};

export default function CardModal() {
  const { selectedCard, selectCard, playCard, players, currentPlayer } = useGameStore();
  const player = players[currentPlayer];

  const handlePlayCard = () => {
    if (selectedCard) {
      playCard(selectedCard.id);
    }
  };

  const canAffordCard = selectedCard?.cost ? (player?.stats.cash || 0) >= selectedCard.cost : true;

  return (
    <Dialog open={!!selectedCard} onOpenChange={() => selectCard(null)}>
      <DialogContent className="max-w-md">
        <AnimatePresence>
          {selectedCard && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {selectedCard.type === 'opportunity' ? (
                    <Sparkles className="w-5 h-5 text-green-600" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  )}
                  {selectedCard.title}
                </DialogTitle>
              </DialogHeader>

              <Card className={cn(
                'mt-4 p-4 border-2',
                selectedCard.type === 'opportunity' ? 'opportunity-card' : 'event-card'
              )}>
                <div className="space-y-4">
                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedCard.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {selectedCard.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag.replace('_', ' ')}
                      </Badge>
                    ))}
                  </div>

                  <Separator />

                  {/* Effects */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">Effects:</h4>
                    {selectedCard.effects.map((effect, index) => {
                      const Icon = getEffectIcon(effect.type);
                      const color = getEffectColor(effect.type, effect.value);
                      
                      return (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <Icon className={cn('w-4 h-4', color)} />
                          <span className={color}>
                            {effect.value > 0 ? '+' : ''}{effect.value} {effect.type}
                            {effect.delay && ` (in ${effect.delay} turns)`}
                            {effect.duration && ` (for ${effect.duration} turns)`}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Cost */}
                  {selectedCard.cost && (
                    <>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Cost:</span>
                        <span className={cn(
                          'text-sm font-bold',
                          canAffordCard ? 'text-foreground' : 'text-destructive'
                        )}>
                          ${selectedCard.cost.toLocaleString()}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </Card>

              {/* Actions */}
              <div className="flex gap-3 mt-6">
                <Button
                  onClick={handlePlayCard}
                  disabled={!canAffordCard}
                  className="flex-1"
                >
                  {selectedCard.type === 'opportunity' ? 'Take Opportunity' : 'Accept Event'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => selectCard(null)}
                  className="flex-1"
                >
                  {selectedCard.type === 'opportunity' ? 'Pass' : 'Dismiss'}
                </Button>
              </div>

              {!canAffordCard && selectedCard.cost && (
                <p className="text-sm text-destructive text-center mt-2">
                  Insufficient funds (Need ${selectedCard.cost.toLocaleString()})
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}