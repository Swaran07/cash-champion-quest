import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { TrendingUp, PieChart as PieChartIcon, BarChart3, Activity } from 'lucide-react';

const expenseData = [
  { name: 'Food', amount: 850, color: '#10b981' },
  { name: 'Transport', amount: 320, color: '#3b82f6' },
  { name: 'Entertainment', amount: 180, color: '#8b5cf6' },
  { name: 'Shopping', amount: 450, color: '#f59e0b' },
  { name: 'Bills', amount: 680, color: '#ef4444' },
  { name: 'Healthcare', amount: 220, color: '#06b6d4' },
];

const monthlyTrend = [
  { month: 'Jan', spent: 2100, budget: 2500, saved: 400 },
  { month: 'Feb', spent: 2300, budget: 2500, saved: 200 },
  { month: 'Mar', spent: 1900, budget: 2500, saved: 600 },
  { month: 'Apr', spent: 2200, budget: 2500, saved: 300 },
  { month: 'May', spent: 2000, budget: 2500, saved: 500 },
  { month: 'Jun', spent: 2400, budget: 2500, saved: 100 },
];

const weeklySpending = [
  { day: 'Mon', amount: 45 },
  { day: 'Tue', amount: 120 },
  { day: 'Wed', amount: 80 },
  { day: 'Thu', amount: 200 },
  { day: 'Fri', amount: 150 },
  { day: 'Sat', amount: 300 },
  { day: 'Sun', amount: 90 },
];

export function ExpenseChart() {
  const [chartType, setChartType] = useState<'pie' | 'bar' | 'line' | 'weekly'>('pie');

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="gaming-card p-3 border border-primary/20">
          <p className="text-foreground font-semibold">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-primary">
              {entry.name}: ${entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      {/* Chart Type Selector */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={chartType === 'pie' ? 'gaming' : 'neon'}
          size="sm"
          onClick={() => setChartType('pie')}
        >
          <PieChartIcon className="w-4 h-4" />
          Categories
        </Button>
        <Button
          variant={chartType === 'bar' ? 'gaming' : 'neon'}
          size="sm"
          onClick={() => setChartType('bar')}
        >
          <BarChart3 className="w-4 h-4" />
          Monthly
        </Button>
        <Button
          variant={chartType === 'line' ? 'gaming' : 'neon'}
          size="sm"
          onClick={() => setChartType('line')}
        >
          <TrendingUp className="w-4 h-4" />
          Trends
        </Button>
        <Button
          variant={chartType === 'weekly' ? 'gaming' : 'neon'}
          size="sm"
          onClick={() => setChartType('weekly')}
        >
          <Activity className="w-4 h-4" />
          Weekly
        </Button>
      </div>

      {/* Chart Display */}
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'pie' ? (
            <PieChart>
              <Pie
                data={expenseData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="amount"
                label={({ name, value }) => `${name}: $${value}`}
              >
                {expenseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          ) : chartType === 'bar' ? (
            <BarChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--foreground))" />
              <YAxis stroke="hsl(var(--foreground))" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="spent" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="saved" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
            </BarChart>
          ) : chartType === 'line' ? (
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--foreground))" />
              <YAxis stroke="hsl(var(--foreground))" />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="spent" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="saved" 
                stroke="hsl(var(--success))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--success))', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          ) : (
            <BarChart data={weeklySpending}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" stroke="hsl(var(--foreground))" />
              <YAxis stroke="hsl(var(--foreground))" />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="amount" 
                fill="hsl(var(--accent))" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Chart Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="gaming-card p-4 text-center">
          <p className="text-2xl font-bold text-primary">$2,480</p>
          <p className="text-sm text-muted-foreground">This Month</p>
        </div>
        <div className="gaming-card p-4 text-center">
          <p className="text-2xl font-bold text-success">$520</p>
          <p className="text-sm text-muted-foreground">Saved</p>
        </div>
        <div className="gaming-card p-4 text-center">
          <p className="text-2xl font-bold text-warning">Food</p>
          <p className="text-sm text-muted-foreground">Top Category</p>
        </div>
      </div>
    </div>
  );
}