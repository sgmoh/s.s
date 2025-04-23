import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SCHEDULED_MESSAGES } from "@/lib/constants";
import { getUKTime } from "@/lib/utils";

const Dashboard = () => {
  const { data: commandUsage, isLoading: loadingCommands } = useQuery({
    queryKey: ["/api/stats/commands"],
    staleTime: 60000,
  });

  const { data: aiMessages, isLoading: loadingAI } = useQuery({
    queryKey: ["/api/stats/ai"],
    staleTime: 60000,
  });

  return (
    <>
      <h2 className="love-gradient-text text-2xl font-bold mb-6">Dashboard</h2>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Command Usage Card */}
        <div className="bg-gradient-to-br from-purple-900/40 via-black/60 to-pink-900/40 border border-purple-500/30 rounded-xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-pink-100">Command Usage</h3>
            <span className="text-xl text-purple-400">📊</span>
          </div>
          <p className="text-3xl font-bold text-white">
            {loadingCommands ? "..." : commandUsage?.count || 0}
          </p>
          <p className="text-sm text-purple-200">Commands used today</p>
          <div className="mt-4 h-2 bg-gray-800 rounded-full">
            <Progress value={loadingCommands ? 0 : commandUsage?.percentage || 0} className="h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
          </div>
        </div>
        
        {/* AI Messages Card */}
        <div className="bg-gradient-to-br from-purple-900/40 via-black/60 to-pink-900/40 border border-purple-500/30 rounded-xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-pink-100">AI Messages</h3>
            <span className="text-xl text-pink-400">🤖</span>
          </div>
          <p className="text-3xl font-bold text-white">
            {loadingAI ? "..." : aiMessages?.count || 0}
          </p>
          <p className="text-sm text-purple-200">AI responses generated</p>
          <div className="mt-4 h-2 bg-gray-800 rounded-full">
            <Progress value={loadingAI ? 0 : aiMessages?.percentage || 0} className="h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" />
          </div>
        </div>
        
        {/* Good Morning Card */}
        <div className="bg-gradient-to-br from-purple-900/40 via-black/60 to-pink-900/40 border border-purple-500/30 rounded-xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-pink-100">Good Morning</h3>
            <span className="text-xl text-yellow-400">☀️</span>
          </div>
          <p className="text-3xl font-bold text-white">
            {SCHEDULED_MESSAGES[0].time} AM
          </p>
          <p className="text-sm text-purple-200">Next message scheduled (UK time)</p>
          <div className="mt-4 flex items-center space-x-2">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            <span className="text-sm text-pink-100">Ready to send</span>
          </div>
        </div>
      </div>
      
      {/* Current Time Display */}
      <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-xl p-6 mb-8 shadow-lg">
        <div className="flex flex-col md:flex-row items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold text-pink-100">Current UK Time</h3>
            <p className="text-sm text-purple-200">Used for scheduling messages</p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-2xl font-bold text-white">{getUKTime()}</p>
            <p className="text-sm text-purple-200">London, United Kingdom</p>
          </div>
        </div>
      </div>
      
      {/* Discord Love Bot Info */}
      <div className="bg-gradient-to-br from-purple-900/40 via-black/60 to-pink-900/40 border border-purple-500/30 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-center mb-4">
          <h3 className="text-xl font-semibold text-center love-gradient-text">Your Love Bot is Ready</h3>
        </div>
        <p className="text-center text-pink-100 mb-4">
          Send lovely messages, play Truth or Dare, and brighten each other's day with automated greetings.
        </p>
        <div className="flex justify-center space-x-4 mt-6">
          <button className="love-btn">
            Check Commands
          </button>
          <button className="love-btn">
            Edit Schedule
          </button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
