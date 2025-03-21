
import React from 'react';
import { BookText, Layout, MessageSquare, PhoneCall } from 'lucide-react';

interface NavigationProps {
  activeSection: number;
  onNavigate: (index: number) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, onNavigate }) => {
  const navItems = [
    { name: 'Overview', icon: <BookText className="h-4 w-4 mr-1.5" /> },
    { name: 'Features', icon: <Layout className="h-4 w-4 mr-1.5" /> },
    { name: 'Philosophy', icon: <MessageSquare className="h-4 w-4 mr-1.5" /> },
    { name: 'Contact', icon: <PhoneCall className="h-4 w-4 mr-1.5" /> }
  ];

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 p-2 glass-panel rounded-full shadow-xl bg-white/80 backdrop-blur-lg border border-white/40">
      <ul className="flex space-x-1">
        {navItems.map((item, index) => (
          <li key={index}>
            <button 
              onClick={() => onNavigate(index)}
              className={`px-4 py-2.5 rounded-full text-sm font-medium flex items-center transition-all duration-300 ${
                activeSection === index 
                  ? 'bg-gradient-to-r from-wisdom-500 to-wisdom-600 text-white shadow-md scale-105' 
                  : 'hover:bg-wisdom-100/70 text-slate-700 hover:text-wisdom-700 hover:scale-105'
              }`}
            >
              {item.icon}
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
