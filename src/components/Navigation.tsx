
import React from 'react';

interface NavigationProps {
  activeSection: number;
  onNavigate: (index: number) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, onNavigate }) => {
  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 flex items-center p-2 glass-panel rounded-full shadow-lg bg-white/70 backdrop-blur-md border border-white/30">
      <ul className="flex space-x-2">
        {['Overview', 'Features', 'Reports', 'Contact'].map((item, index) => (
          <li key={index}>
            <button 
              onClick={() => onNavigate(index)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeSection === index 
                  ? 'bg-emerald-500 text-white shadow-md' 
                  : 'hover:bg-emerald-100 text-slate-700'
              }`}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
