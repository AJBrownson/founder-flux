'use client';

import { useGameStore } from '@/lib/gameStore';
import StartScreen from '@/components/StartScreen';
import GameBoard from '@/components/GameBoard';
import PlayerDashboard from '@/components/PlayerDashboard';
import GameActions from '@/components/GameActions';
import CardModal from '@/components/CardModal';

export default function Home() {
  const { isGameActive } = useGameStore();

  if (!isGameActive) {
    return <StartScreen />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <GameBoard />
          </div>
          
          {/* Right Sidebar - Player info and actions */}
          <div className="space-y-6">
            <PlayerDashboard />
            <GameActions />
          </div>
        </div>
      </div>
      <CardModal />
    </div>
  );
}