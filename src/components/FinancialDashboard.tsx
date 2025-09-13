import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Upload, TrendingUp, Target, Award, MessageCircle, Zap, Trophy, Star, Crown, Gem } from "lucide-react";
import financialHero from "@/assets/financial-gaming-hero.jpg";
import achievementIcons from "@/assets/achievement-icons.jpg";
import aiCoachMascot from "@/assets/ai-coach-mascot.jpg";
import { ExpenseChart } from "./ExpenseChart";
import { AchievementBadge } from "./AchievementBadge";
import { StreakCounter } from "./StreakCounter";
import { FileUploadZone } from "./FileUploadZone";
import { AICoachChat } from "./AICoachChat";
import { DailyChallenge } from "./DailyChallenge";

interface UserStats {
  level: number;
  xp: number;
  xpToNext: number;
  streak: number;
  totalSaved: number;
  monthlyBudget: number;
  spent: number;
  achievements: string[];
}

export function FinancialDashboard() {
  const [userStats, setUserStats] = useState<UserStats>({
    level: 12,
    xp: 2840,
    xpToNext: 3000,
    streak: 23,
    totalSaved: 12450,
    monthlyBudget: 5000,
    spent: 3200,
    achievements: ["First Upload", "Budget Master", "Saving Streak", "Challenge Complete"]
  });

  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedTab, setSelectedTab] = useState("dashboard");

  const progressPercentage = (userStats.xp / userStats.xpToNext) * 100;
  const budgetUsed = (userStats.spent / userStats.monthlyBudget) * 100;

  const triggerCelebration = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute inset-0 animate-achievement-bounce">
            🎉🎊✨🏆💰⭐
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative gaming-card p-6 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={financialHero} alt="Financial Gaming Dashboard" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="level-badge text-lg">
                Level {userStats.level}
              </div>
              <StreakCounter streak={userStats.streak} />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Financial Warrior
            </h1>
            <p className="text-muted-foreground text-lg">
              Master your money, level up your life! 🚀
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>XP Progress</span>
                <span>{userStats.xp}/{userStats.xpToNext}</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>
          <div className="mt-6 md:mt-0">
            <img src={aiCoachMascot} alt="AI Coach" className="w-32 h-32 animate-float" />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="gaming-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Saved</p>
                <p className="text-3xl font-bold text-success">${userStats.totalSaved.toLocaleString()}</p>
              </div>
              <div className="gaming-glow p-3 bg-success/20 rounded-full">
                <TrendingUp className="w-8 h-8 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gaming-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Budget Used</p>
                <p className="text-3xl font-bold text-warning">{budgetUsed.toFixed(0)}%</p>
              </div>
              <div className="gaming-glow p-3 bg-warning/20 rounded-full">
                <Target className="w-8 h-8 text-warning" />
              </div>
            </div>
            <div className="mt-4">
              <Progress value={budgetUsed} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="gaming-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Achievements</p>
                <p className="text-3xl font-bold text-accent">{userStats.achievements.length}</p>
              </div>
              <div className="gaming-glow p-3 bg-accent/20 rounded-full">
                <Award className="w-8 h-8 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload & Charts Section */}
        <div className="lg:col-span-2 space-y-6">
          <FileUploadZone onUpload={(file) => {
            console.log("File uploaded:", file);
            triggerCelebration();
          }} />
          
          <Card className="gaming-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Spending Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ExpenseChart />
            </CardContent>
          </Card>

          <DailyChallenge onComplete={triggerCelebration} />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Achievements */}
          <Card className="gaming-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-warning" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {userStats.achievements.map((achievement, index) => (
                <AchievementBadge 
                  key={index}
                  title={achievement}
                  icon={[Trophy, Star, Crown, Gem][index % 4]}
                  color={["warning", "accent", "secondary", "primary"][index % 4] as any}
                />
              ))}
            </CardContent>
          </Card>

          {/* AI Coach */}
          <AICoachChat />

          {/* Quick Actions */}
          <Card className="gaming-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="gaming" className="w-full justify-start">
                <Upload className="w-4 h-4" />
                Upload Bank Statement
              </Button>
              <Button variant="neon" className="w-full justify-start">
                <Target className="w-4 h-4" />
                Set New Budget Goal
              </Button>
              <Button variant="achievement" className="w-full justify-start">
                <MessageCircle className="w-4 h-4" />
                Chat with AI Coach
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}