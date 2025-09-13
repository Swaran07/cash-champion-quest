import { LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface AchievementBadgeProps {
  title: string;
  icon: LucideIcon;
  color: 'primary' | 'secondary' | 'warning' | 'accent' | 'success';
  unlocked?: boolean;
}

export function AchievementBadge({ title, icon: Icon, color, unlocked = true }: AchievementBadgeProps) {
  const colorClasses = {
    primary: 'bg-gradient-to-r from-primary to-accent text-primary-foreground',
    secondary: 'bg-gradient-to-r from-secondary to-primary text-secondary-foreground',
    warning: 'bg-gradient-to-r from-warning to-accent text-warning-foreground',
    accent: 'bg-gradient-to-r from-accent to-secondary text-accent-foreground',
    success: 'bg-gradient-to-r from-success to-primary text-success-foreground',
  };

  return (
    <div className={`
      flex items-center gap-3 p-3 rounded-lg border
      ${unlocked 
        ? `${colorClasses[color]} border-${color}/30 gaming-glow animate-gaming-pulse` 
        : 'bg-muted text-muted-foreground border-muted opacity-50'
      }
      transition-all duration-300 hover:scale-105
    `}>
      <div className={`
        p-2 rounded-full 
        ${unlocked ? 'bg-background/20' : 'bg-background/10'}
      `}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <p className="font-semibold text-sm">{title}</p>
        <p className="text-xs opacity-80">
          {unlocked ? 'Completed! 🎉' : 'Locked 🔒'}
        </p>
      </div>
      {unlocked && (
        <div className="text-xl animate-bounce">
          ⭐
        </div>
      )}
    </div>
  );
}