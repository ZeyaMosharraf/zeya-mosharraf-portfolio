import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X, Bot, User } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface PortfolioAssistantProps {
  className?: string;
}

const PortfolioAssistant: React.FC<PortfolioAssistantProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your Portfolio Assistant. Ask me about Zeya's work, skills, projects, or experience. I can help you learn more about his data analytics expertise!",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Portfolio knowledge base
  const portfolioKnowledge = {
    skills: {
      technical: ['Python', 'SQL', 'Power BI', 'Tableau', 'Excel', 'Machine Learning', 'Data Visualization', 'Statistical Analysis'],
      analytics: ['Data Analysis', 'Business Intelligence', 'Predictive Modeling', 'Data Mining', 'Dashboard Creation'],
      tools: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Scikit-learn', 'PostgreSQL', 'MySQL']
    },
    projects: [
      {
        name: 'SQL Database Optimization',
        description: 'Optimized database queries and improved performance by 40%',
        technologies: ['SQL', 'PostgreSQL', 'Query Optimization']
      },
      {
        name: 'Python Data Analysis Pipeline',
        description: 'Built automated data processing pipelines for business analytics',
        technologies: ['Python', 'Pandas', 'Data Processing']
      },
      {
        name: 'Power BI Executive Dashboard',
        description: 'Created interactive dashboards for executive decision making',
        technologies: ['Power BI', 'DAX', 'Data Modeling']
      },
      {
        name: 'Machine Learning Predictive Models',
        description: 'Developed predictive models for business forecasting',
        technologies: ['Python', 'Scikit-learn', 'Machine Learning']
      }
    ],
    experience: {
      role: 'Data Analyst',
      expertise: 'Business Intelligence, Data Visualization, and Analytics',
      focus: 'Turning data into actionable business insights'
    }
  };

  // AI response generator
  const generateResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    // Greeting responses
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return "Hello! I'm here to help you learn about Zeya's portfolio. You can ask me about his projects, skills, experience, or any specific technology he works with.";
    }

    // Skills queries
    if (input.includes('skill') || input.includes('technology') || input.includes('tech')) {
      if (input.includes('python')) {
        return "Zeya is highly skilled in Python! He uses it for data analysis, building automated pipelines, machine learning models, and statistical analysis. His Python projects include data processing pipelines and predictive modeling systems.";
      }
      if (input.includes('sql')) {
        return "SQL is one of Zeya's core strengths! He specializes in database optimization, complex query writing, and has successfully improved database performance by 40% in previous projects. He works with PostgreSQL and MySQL.";
      }
      if (input.includes('power bi') || input.includes('powerbi')) {
        return "Zeya is expert in Power BI! He creates interactive executive dashboards, uses advanced DAX functions, and specializes in data modeling. His Power BI dashboards help executives make data-driven decisions.";
      }
      if (input.includes('tableau')) {
        return "Zeya is a Tableau Desktop Specialist! He creates compelling data visualizations and interactive dashboards that make complex data easy to understand for stakeholders.";
      }
      if (input.includes('machine learning') || input.includes('ml')) {
        return "Zeya has strong machine learning expertise! He builds predictive models for business forecasting, uses scikit-learn, and develops models that provide real-world business impact.";
      }
      return `Zeya's technical skills include: ${portfolioKnowledge.skills.technical.join(', ')}. His analytics expertise covers: ${portfolioKnowledge.skills.analytics.join(', ')}. Would you like to know more about any specific skill?`;
    }

    // Project queries
    if (input.includes('project') || input.includes('work') || input.includes('portfolio')) {
      if (input.includes('sql') || input.includes('database')) {
        return "Zeya's SQL Database Optimization project showcased his ability to improve database performance by 40% through query optimization and efficient database design using PostgreSQL.";
      }
      if (input.includes('python') || input.includes('pipeline')) {
        return "His Python Data Analysis Pipeline project demonstrates automated data processing capabilities, where he built scalable pipelines for business analytics using Pandas and advanced data processing techniques.";
      }
      if (input.includes('power bi') || input.includes('dashboard')) {
        return "The Power BI Executive Dashboard project highlights Zeya's ability to create interactive, business-critical dashboards using DAX and advanced data modeling for executive decision-making.";
      }
      if (input.includes('machine learning') || input.includes('predictive')) {
        return "His Machine Learning Predictive Models project shows expertise in developing forecasting models using Python and scikit-learn that deliver real business value and insights.";
      }
      return "Zeya's top projects include SQL database optimization, Python data analysis pipelines, Power BI executive dashboards, and machine learning predictive models. Each project demonstrates real-world business impact. Which project interests you most?";
    }

    // Experience queries
    if (input.includes('experience') || input.includes('background') || input.includes('role')) {
      return "Zeya is a skilled Data Analyst specializing in business intelligence, data visualization, and analytics. His expertise focuses on turning complex data into actionable business insights that drive decision-making.";
    }

    // Contact or hiring queries
    if (input.includes('contact') || input.includes('hire') || input.includes('work with')) {
      return "You can reach out to Zeya through the contact section of his portfolio. He's always interested in discussing data analytics opportunities and how he can help solve business challenges with data-driven solutions.";
    }

    // Certificates queries
    if (input.includes('certificate') || input.includes('certification') || input.includes('credential')) {
      return "Zeya holds several professional certifications including Data Analysis Professional (Google), Power BI Data Analyst (Microsoft), and Tableau Desktop Specialist. These certifications validate his expertise in data analytics and visualization.";
    }

    // Default response for unmatched queries
    const responses = [
      "That's an interesting question! Zeya's expertise spans SQL database optimization, Python data analysis pipelines, Power BI executive dashboards, and machine learning predictive models. Which area would you like to explore?",
      "I'd be happy to help you learn more about Zeya's work! His portfolio showcases expertise in data analytics, business intelligence, and visualization. What specific aspect interests you?",
      "Great question! Zeya specializes in turning data into actionable business insights. His projects demonstrate real-world impact across SQL, Python, Power BI, and machine learning. What would you like to know more about?"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(inputValue),
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "What are Zeya's top skills?",
    "Tell me about his projects",
    "What's his experience?",
    "How can I contact him?"
  ];

  return (
    <>
      {/* Floating Chat Button */}
      <motion.div
        className={`fixed bottom-6 right-6 z-50 ${className}`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          size="lg"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 z-50 w-80 h-96 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bot className="h-5 w-5" />
                  <div>
                    <h3 className="font-semibold">Portfolio Assistant</h3>
                    <p className="text-xs opacity-90">Ask me about Zeya's work</p>
                  </div>
                </div>
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20 p-1 h-auto"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 h-64">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${message.isBot ? '' : 'flex-row-reverse space-x-reverse'}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      message.isBot 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}>
                      {message.isBot ? (
                        <Bot className="h-3 w-3 text-white" />
                      ) : (
                        <User className="h-3 w-3 text-gray-600 dark:text-gray-300" />
                      )}
                    </div>
                    <div
                      className={`rounded-lg p-3 text-sm ${
                        message.isBot
                          ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                          : 'bg-blue-500 text-white'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                      <Bot className="h-3 w-3 text-white" />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length === 1 && (
              <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                <div className="space-y-1">
                  {quickQuestions.slice(0, 2).map((question, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setInputValue(question);
                        setTimeout(handleSendMessage, 100);
                      }}
                      className="w-full text-left text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 p-2 rounded bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about skills, projects..."
                  className="flex-1 text-sm"
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PortfolioAssistant;