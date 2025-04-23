import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FLOWER_IMAGE_URL } from "@/lib/constants";

const Commands = () => {
  const { data: commands, isLoading } = useQuery({
    queryKey: ["/api/commands"],
    staleTime: 60000,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p>Loading commands...</p>
      </div>
    );
  }

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Bot Commands</h2>
        <Button className="px-4 py-2 bg-[#7289DA] text-white rounded-md flex items-center space-x-2 hover:bg-blue-600 transition-colors">
          <span className="material-icons text-sm">add</span>
          <span>Add New</span>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* ILY Command Card */}
        <Card className="bg-white rounded-lg shadow p-5 transition-all duration-200 hover:translate-y-[-3px] hover:shadow-md border-l-4 border-[#FF6B6B]">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-2">
              <span className="material-icons text-[#FF6B6B]">favorite</span>
              <h3 className="font-semibold text-gray-800">/ily</h3>
            </div>
            <Switch id="ily-active" defaultChecked />
          </div>
          <p className="mt-3 text-sm text-gray-600">Sends a beautiful image of flowers with a loving message</p>
          <div className="mt-4 bg-gray-50 p-3 rounded-md">
            <div className="text-xs font-mono text-gray-700">/ily [optional message]</div>
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <div className="w-16 h-16 rounded-md overflow-hidden">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#FF6B6B]">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor" />
              </svg>
            </div>
            <div className="text-sm text-gray-500">
              <p>Usage: 12 times today</p>
              <p className="text-[#43B581]">Active</p>
            </div>
          </div>
        </Card>
        
        {/* Truth or Dare Command Card */}
        <Card className="bg-white rounded-lg shadow p-5 transition-all duration-200 hover:translate-y-[-3px] hover:shadow-md border-l-4 border-[#FFD166]">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-2">
              <span className="material-icons text-[#FFD166]">casino</span>
              <h3 className="font-semibold text-gray-800">/truthordare</h3>
            </div>
            <Switch id="tod-active" defaultChecked />
          </div>
          <p className="mt-3 text-sm text-gray-600">Generates a random truth question or dare challenge</p>
          <div className="mt-4 bg-gray-50 p-3 rounded-md">
            <div className="text-xs font-mono text-gray-700">/truthordare [truth|dare] [spicy?]</div>
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <div className="w-16 h-16 bg-[#FFD166] bg-opacity-20 rounded-md flex items-center justify-center">
              <span className="material-icons text-[#FFD166] text-2xl">help_outline</span>
            </div>
            <div className="text-sm text-gray-500">
              <p>Usage: 8 times today</p>
              <p className="text-[#43B581]">Active</p>
            </div>
          </div>
        </Card>
        
        {/* Good Morning Command Card */}
        <Card className="bg-white rounded-lg shadow p-5 transition-all duration-200 hover:translate-y-[-3px] hover:shadow-md border-l-4 border-[#43B581]">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-2">
              <span className="material-icons text-[#43B581]">wb_sunny</span>
              <h3 className="font-semibold text-gray-800">Auto Good Morning</h3>
            </div>
            <Switch id="gm-active" defaultChecked />
          </div>
          <p className="mt-3 text-sm text-gray-600">Automatically sends good morning messages in UK time</p>
          <div className="mt-4 bg-gray-50 p-3 rounded-md">
            <div className="text-xs font-mono text-gray-700">Time: 7:00 AM (UK)</div>
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <div className="w-16 h-16 bg-[#43B581] bg-opacity-20 rounded-md flex items-center justify-center">
              <span className="material-icons text-[#43B581] text-2xl">schedule</span>
            </div>
            <div className="text-sm text-gray-500">
              <p>Sends to: 2 users</p>
              <p className="text-[#43B581]">Scheduled</p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Commands;
