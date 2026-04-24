import React, { useState } from 'react';
import { ProfileProvider } from './contexts/ProfileContext';
import { JobSearchProvider } from './contexts/JobSearchContext';
import MainLayout from './components/Layout/MainLayout';
import ProfileBuilder from './components/KnowledgeBase/ProfileBuilder';
import SearchConfig from './components/JobSearch/SearchConfig';
import JobResults from './components/JobSearch/JobResults';
import { FileText, Search, User, TrendingUp } from 'lucide-react';

const TABS = [
  { id: 'profile', label: 'Knowledge Base', icon: User },
  { id: 'search', label: 'Job Search', icon: Search },
  { id: 'results', label: 'Results', icon: TrendingUp },
];

function App() {
  const [activeTab, setActiveTab] = useState('profile');
  const [showResults, setShowResults] = useState(false);

  return (
    <ProfileProvider>
      <JobSearchProvider>
        <MainLayout>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
              <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex items-center gap-3">
                  <div className="bg-primary-600 p-3 rounded-lg">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">RecFind</h1>
                    <p className="text-gray-600 text-sm">AI-Powered Job Profile Search Aggregator</p>
                  </div>
                </div>
              </div>
            </header>

            {/* Navigation Tabs */}
            <div className="max-w-7xl mx-auto px-4 mt-6">
              <div className="flex space-x-4 bg-white rounded-lg p-2 shadow-sm border border-gray-200">
                {TABS.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        if (tab.id === 'results') setShowResults(true);
                      }}
                      className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-200 font-medium ${
                        activeTab === tab.id
                          ? 'bg-primary-600 text-white shadow-md'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-8">
              {activeTab === 'profile' && <ProfileBuilder />}
              {activeTab === 'search' && <SearchConfig onSearchComplete={() => setActiveTab('results')} />}
              {activeTab === 'results' && showResults && <JobResults />}
            </main>
          </div>
        </MainLayout>
      </JobSearchProvider>
    </ProfileProvider>
  );
}

export default App;
