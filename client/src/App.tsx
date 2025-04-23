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
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <Sidebar />
      <div className="flex-1 overflow-hidden">
        <Header />
        <main className="p-6">
          <Switch>
            <Route path="/" component={Dashboard} />
            <Route path="/commands" component={Commands} />
            <Route path="/schedule" component={Schedule} />
            <Route path="/ai" component={AISettings} />
            <Route path="/users" component={Users} />
            <Route component={NotFound} />
          </Switch>
        </main>
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
