import React, { useState } from 'react';
import { FileText, Menu, X, Github, Briefcase, Settings } from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-primary-600 text-white p-2 rounded-lg"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative w-64 h-screen bg-gray-900 text-white p-6 transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8 mt-12 lg:mt-0">
          <div className="bg-primary-600 p-2 rounded">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-lg">RecFind</h1>
            <p className="text-xs text-gray-400">Job Aggregator</p>
          </div>
        </div>

        {/* Quick Links */}
        <nav className="space-y-4">
          <div className="text-gray-400 text-xs font-semibold uppercase tracking-wide">Quick Links</div>
          <a
            href="#profile"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Briefcase className="w-5 h-5" />
            <span>Build Profile</span>
          </a>
          <a
            href="#search"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <FileText className="w-5 h-5" />
            <span>Search Jobs</span>
          </a>
        </nav>

        {/* Info Section */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-gray-800 rounded-lg p-4 mb-4 text-sm">
            <h3 className="font-semibold mb-2">💡 Tip</h3>
            <p className="text-gray-300 text-xs">Complete your profile first for better job matches</p>
          </div>

          <div className="flex gap-3">
            <a
              href="https://github.com/nskai1994/Web-Dev-Projects"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-xs"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
            <button className="flex items-center justify-center p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
