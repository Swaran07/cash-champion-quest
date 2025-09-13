import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Target, Clock, Star, Gift } from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  reward: string;
  timeLeft: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface DailyChallengeProps {
  onComplete: () => void;
}

const challenges: Challenge[] = [
  {
    id: '1',
    title: 'Coffee Shop Warrior',
    description: 'Skip buying coffee today and make it at home',
    target: 1,
    current: 0,
    reward: '50 XP + $5 saved',
    timeLeft: '8h 30m',
    difficulty: 'easy'
  },
  {
    id: '2',
    title: 'Receipt Scanner',
    description: 'Upload and categorize 3 expense receipts',
    target: 3,
    current: 1,
    reward: '100 XP + Badge',
    timeLeft: '12h 15m',
    difficulty: 'medium'
  },
  {
    id: '3',
    title: 'Budget Boss',
    description: 'Stay under $50 spending today',
    target: 50,
    current: 23,
    reward: '200 XP + Achievement',
    timeLeft: '6h 45m',
    difficulty: 'hard'
  }
];

export function DailyChallenge({ onComplete }: DailyChallengeProps) {
  const [currentChallenges, setChallenges] = useState<Challenge[]>(challenges);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-success border-success/30 bg-success/10';
      case 'medium': return 'text-warning border-warning/30 bg-warning/10';
      case 'hard': return 'text-destructive border-destructive/30 bg-destructive/10';
      default: return 'text-primary border-primary/30 bg-primary/10';
    }
  };

  const getDifficultyEmoji = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '🌱';
      case 'medium': return '⚡';
      case 'hard': return '🔥';
      default: return '⭐';
    }
  };

  const completeChallenge = (challengeId: string) => {
    setChallenges(prev => prev.map(challenge => 
      challenge.id === challengeId 
        ? { ...challenge, current: challenge.target }
        : challenge
    ));
    onComplete();
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <Card className="gaming-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          Daily Challenges
          <div className="ml-auto flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            Resets in 18h
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {currentChallenges.map((challenge) => {
          const isCompleted = challenge.current >= challenge.target;
          const progressPercentage = getProgressPercentage(challenge.current, challenge.target);
          
          return (
            <div
              key={challenge.id}
              className={`
                p-4 rounded-lg border transition-all duration-300
                ${isCompleted 
                  ? 'bg-success/20 border-success/30 animate-achievement-bounce' 
                  : 'bg-card border-border hover:border-primary/50'
                }
              `}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{challenge.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs border ${getDifficultyColor(challenge.difficulty)}`}>
                      {getDifficultyEmoji(challenge.difficulty)} {challenge.difficulty}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {challenge.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Gift className="w-3 h-3" />
                      {challenge.reward}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {challenge.timeLeft}
                    </span>
                  </div>
                </div>
                
                {isCompleted && (
                  <div className="text-2xl animate-bounce">
                    🏆
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress</span>
                  <span className="font-semibold">
                    {challenge.current}/{challenge.target}
                  </span>
                </div>
                
                <Progress 
                  value={progressPercentage} 
                  className="h-2"
                />
                
                {!isCompleted && (
                  <Button
                    variant="gaming"
                    size="sm"
                    onClick={() => completeChallenge(challenge.id)}
                    className="w-full mt-3"
                  >
                    <Star className="w-4 h-4" />
                    Complete Challenge
                  </Button>
                )}
                
                {isCompleted && (
                  <div className="text-center p-2 bg-success/10 rounded-lg">
                    <p className="text-success font-semibold text-sm">
                      🎉 Challenge Completed! 
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        
        <div className="text-center pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground mb-2">
            Complete challenges to earn XP and unlock achievements!
          </p>
          <Button variant="neon" size="sm">
            <Target className="w-4 h-4" />
            View All Challenges
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}