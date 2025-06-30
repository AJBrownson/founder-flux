'use client';

import { motion } from 'framer-motion';
import { useGameStore } from '@/lib/gameStore';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  TrendingUp, 
  Battery, 
  Heart, 
  Users, 
  Flame,
  Code,
  Palette,
  Zap,
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';

const getArchetypeIcon = (archetype: string) => {
  switch (archetype) {
    case 'developer': return Code;
    case 'designer': return Palette;
    case 'growth-hacker': return Zap;
    case 'operator': return Settings;
    default: return Code;
  }
};

const getArchetypeColor = (archetype: string) => {
  switch (archetype) {
    case 'developer': return 'bg-blue-500';
    case 'designer': return 'bg-purple-500';
    case 'growth-hacker': return 'bg-green-500';
    case 'operator': return 'bg-orange-500';
    default: return 'bg-gray-500';
  }
};

export default function PlayerDashboard() {
  const { players, currentPlayer } = useGameStore();
  const player = players[currentPlayer];

  if (!player) {
    return (
      <Card className="p-6">
        <p className="text-muted-foreground text-center">No active player</p>
      </Card>
    );
  }

  const ArchetypeIcon = getArchetypeIcon(player.archetype);
  const archetypeColor = getArchetypeColor(player.archetype);

  const metrics = [
    {
      label: 'Cash',
      value: `$${player.stats.cash.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      label: 'MRR',
      value: `$${player.stats.mrr.toLocaleString()}`,
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      label: 'Users',
      value: player.stats.users.toLocaleString(),
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      label: 'Reputation',
      value: player.stats.reputation,
      icon: Heart,
      color: 'text-pink-600',
      bgColor: 'bg-pink-100'
    }
  ];

  const skills = [
    { name: 'Development', value: player.skills.development, max: 5 },
    { name: 'Design', value: player.skills.design, max: 5 },
    { name: 'Growth', value: player.skills.growth, max: 5 },
    { name: 'Operations', value: player.skills.operations, max: 5 }
  ];

  return (
    <div className="space-y-6">
      {/* Player Info */}
      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className={cn('p-3 rounded-full', archetypeColor)}>
            <ArchetypeIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">{player.name}</h2>
            <Badge variant="secondary" className="mt-1">
              {player.archetype.split('-').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ')}
            </Badge>
          </div>
        </div>

        {/* Energy & Burn Rate */}
        <div className="space-y-4 mb-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <Battery className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Energy</span>
              </div>
              <span className="text-sm text-muted-foreground">{player.stats.energy}/100</span>
            </div>
            <Progress 
              value={player.stats.energy} 
              className="h-2"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-destructive" />
                <span className="text-sm font-medium">Monthly Burn</span>
              </div>
              <span className="text-sm text-muted-foreground">${player.stats.burnRate}/mo</span>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                className={cn('metric-card', metric.bgColor)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">{metric.label}</p>
                    <p className="text-lg font-bold text-foreground">{metric.value}</p>
                  </div>
                  <Icon className={cn('w-5 h-5', metric.color)} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </Card>

      {/* Skills */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Skills</h3>
        <div className="space-y-4">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">{skill.name}</span>
                <span className="text-sm text-muted-foreground">{skill.value}/{skill.max}</span>
              </div>
              <Progress value={(skill.value / skill.max) * 100} className="h-2" />
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Current Phase */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Current Phase</h3>
        <Badge variant="outline" className="text-sm">
          {player.phase.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' ')} Phase
        </Badge>
        <p className="text-sm text-muted-foreground mt-2">
          Position: {player.position + 1}
        </p>
      </Card>
    </div>
  );
}
