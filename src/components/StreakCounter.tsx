import { Flame } from 'lucide-react';

interface StreakCounterProps {
  streak: number;
}

export function StreakCounter({ streak }: StreakCounterProps) {
  const getStreakColor = (days: number) => {
    if (days >= 30) return 'from-warning via-accent to-primary';
    if (days >= 14) return 'from-accent to-secondary';
    if (days >= 7) return 'from-primary to-accent';
    return 'from-success to-primary';
  };

  const getStreakEmoji = (days: number) => {
    if (days >= 30) return '🔥🏆';
    if (days >= 14) return '🔥⭐';
    if (days >= 7) return '🔥';
    return '✨';
  };

  return (
    <div className={`
      streak-counter bg-gradient-to-r ${getStreakColor(streak)}
      flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm
      animate-gaming-pulse hover:scale-110 transition-all duration-300
    `}>
      <Flame className="w-4 h-4" />
      <span>{streak} Day Streak!</span>
      <span className="text-base">{getStreakEmoji(streak)}</span>
    </div>
  );
}