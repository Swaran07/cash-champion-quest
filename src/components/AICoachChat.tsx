import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send, Bot, User } from 'lucide-react';
import aiCoachMascot from '@/assets/ai-coach-mascot.jpg';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const gamifiedResponses = [
  "🎉 Great question! Let me help you level up your finances!",
  "💰 Nice! Here's a power-up tip for your money game:",
  "🚀 Excellent! You're on fire with these financial moves!",
  "⭐ Achievement unlocked: Smart Money Question! Here's what I suggest:",
  "🏆 Pro tip incoming! This will boost your financial XP:",
];

const sampleQuestions = [
  "How can I save more money?",
  "What's my spending pattern?",
  "Set a budget goal",
  "Show me investment tips"
];

export function AICoachChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "🎮 Hey Financial Warrior! I'm your AI coach ready to help you dominate your money game! What's your next move? 💪",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response with gaming elements
    setTimeout(() => {
      const randomResponse = gamifiedResponses[Math.floor(Math.random() * gamifiedResponses.length)];
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `${randomResponse} Based on your spending patterns, I notice you're doing great with budgeting! Here's my suggestion: Try the 50/30/20 rule - 50% needs, 30% wants, 20% savings. You'll earn bonus XP for every week you stick to it! 🎯`,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickQuestion = (question: string) => {
    sendMessage(question);
  };

  return (
    <Card className="gaming-card h-96 flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <img src={aiCoachMascot} alt="AI Coach" className="w-6 h-6 rounded-full" />
          AI Financial Coach
          <div className="ml-auto w-2 h-2 bg-success rounded-full animate-gaming-pulse"></div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-4 space-y-4">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-2 ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.sender === 'ai' && (
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
              )}
              
              <div
                className={`max-w-[80%] p-3 rounded-lg text-sm ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground ml-auto'
                    : 'bg-muted text-foreground'
                }`}
              >
                {message.content}
              </div>
              
              {message.sender === 'user' && (
                <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-accent" />
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div className="bg-muted p-3 rounded-lg">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Quick questions:</p>
          <div className="grid grid-cols-2 gap-1">
            {sampleQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs p-2 h-auto"
                onClick={() => handleQuickQuestion(question)}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your AI coach..."
            onKeyPress={(e) => e.key === 'Enter' && sendMessage(input)}
            className="flex-1"
          />
          <Button 
            variant="gaming"
            size="icon"
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isTyping}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}