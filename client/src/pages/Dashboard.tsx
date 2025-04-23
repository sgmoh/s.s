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
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Command Usage Card */}
        <Card className="bg-white rounded-lg shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Command Usage</h2>
              <span className="material-icons text-[#7289DA]">bar_chart</span>
            </div>
            <p className="text-3xl font-bold text-gray-800">
              {loadingCommands ? "..." : commandUsage?.count || 0}
            </p>
            <p className="text-sm text-gray-500">Commands used today</p>
            <div className="mt-4 h-2 bg-gray-200 rounded-full">
              <Progress value={loadingCommands ? 0 : commandUsage?.percentage || 0} className="h-2 bg-[#7289DA] rounded-full" />
            </div>
          </CardContent>
        </Card>
        
        {/* AI Messages Card */}
        <Card className="bg-white rounded-lg shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-700">AI Messages</h2>
              <span className="material-icons text-[#FF6B6B]">smart_toy</span>
            </div>
            <p className="text-3xl font-bold text-gray-800">
              {loadingAI ? "..." : aiMessages?.count || 0}
            </p>
            <p className="text-sm text-gray-500">AI responses generated</p>
            <div className="mt-4 h-2 bg-gray-200 rounded-full">
              <Progress value={loadingAI ? 0 : aiMessages?.percentage || 0} className="h-2 bg-[#FF6B6B] rounded-full" />
            </div>
          </CardContent>
        </Card>
        
        {/* Good Morning Card */}
        <Card className="bg-white rounded-lg shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Good Morning</h2>
              <span className="material-icons text-[#FFD166]">wb_sunny</span>
            </div>
            <p className="text-3xl font-bold text-gray-800">
              {SCHEDULED_MESSAGES[0].time} AM
            </p>
            <p className="text-sm text-gray-500">Next message scheduled (UK time)</p>
            <div className="mt-4 flex items-center space-x-2">
              <span className="w-2 h-2 bg-[#43B581] rounded-full"></span>
              <span className="text-sm text-gray-600">Ready to send</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Current Time Display */}
      <Card className="bg-white rounded-lg shadow mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Current UK Time</h2>
              <p className="text-sm text-gray-500">Used for scheduling messages</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-800">{getUKTime()}</p>
              <p className="text-sm text-gray-500">London, United Kingdom</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Dashboard;
