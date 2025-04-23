import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import Commands from "@/pages/Commands";
import Schedule from "@/pages/Schedule";
import AISettings from "@/pages/AISettings";
import Users from "@/pages/Users";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

function Router() {
  return (
    <div className="min-h-screen bg-black">
      <div className="love-container">
        {/* Purple Heart Header */}
        <div className="relative mb-8 flex items-center justify-center">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-900/20 via-pink-800/20 to-purple-900/20 rounded-lg"></div>
          <h1 className="love-gradient-text text-4xl md:text-5xl font-bold text-center py-4 relative z-10">
            Discord Love Bot
          </h1>
        </div>
        
        {/* One-section layout with navigation tabs at top */}
        <div className="love-card">
          <div className="mb-6 border-b border-purple-500/30 pb-4">
            <div className="flex flex-wrap gap-2">
              <a href="/" className="love-btn">Dashboard</a>
              <a href="/commands" className="love-btn">Commands</a>
              <a href="/schedule" className="love-btn">Schedule</a>
              <a href="/ai" className="love-btn">AI Settings</a>
              <a href="/users" className="love-btn">Users</a>
            </div>
          </div>
          
          <div className="p-2">
            <Switch>
              <Route path="/" component={Dashboard} />
              <Route path="/commands" component={Commands} />
              <Route path="/schedule" component={Schedule} />
              <Route path="/ai" component={AISettings} />
              <Route path="/users" component={Users} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
