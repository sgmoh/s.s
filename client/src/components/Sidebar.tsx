import { useLocation, Link } from "wouter";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Dashboard", icon: "dashboard" },
    { href: "/commands", label: "Commands", icon: "code" },
    { href: "/schedule", label: "Scheduling", icon: "schedule" },
    { href: "/ai", label: "AI Settings", icon: "smart_toy" },
    { href: "/users", label: "Users", icon: "people" },
  ];

  return (
    <div className="w-full md:w-64 bg-[#2C2F33] text-white flex flex-col">
      {/* Bot Profile */}
      <div className="p-4 flex items-center space-x-3 border-b border-gray-700">
        <div className="w-12 h-12 rounded-full bg-[#7289DA] flex items-center justify-center">
          <span className="material-icons text-white">favorite</span>
        </div>
        <div>
          <h2 className="font-['Poppins'] font-semibold text-lg">Love Bot</h2>
          <div className="flex items-center">
            <span className="w-2 h-2 bg-[#43B581] rounded-full mr-2"></span>
            <span className="text-xs text-gray-300">Online</span>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>
                <a className={cn(
                  "flex items-center space-x-3 p-2 rounded-md transition-colors",
                  location === item.href 
                    ? "bg-[#7289DA] text-white" 
                    : "hover:bg-gray-700 text-gray-300 hover:text-white"
                )}>
                  <span className="material-icons">{item.icon}</span>
                  <span>{item.label}</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Bot Status */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold">Bot Status</span>
          <span className="px-2 py-1 bg-[#43B581] text-white text-xs rounded-full">Active</span>
        </div>
        <div className="text-xs text-gray-400">
          <p>Uptime: 99.8%</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
