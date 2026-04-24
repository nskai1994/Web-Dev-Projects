import React, { useState } from 'react';
import { useProfile } from '../../contexts/ProfileContext';
import { useJobSearch } from '../../contexts/JobSearchContext';
import { Search, Loader2, AlertCircle, Key, Wand2 } from 'lucide-react';

const SearchConfig = ({ onSearchComplete }) => {
  const { profile, validateProfile, isComplete } = useProfile();
  const { searchConfig, updateSearchConfig, isSearching } = useJobSearch();
  
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);
  
  const handleSearch = async () => {
    // Validate profile
    if (!validateProfile()) {
      setError('Please complete your profile before searching');
      return;
    }
    
    // Validate API key
    if (!apiKey.trim()) {
      setError('Please enter your OpenRouter API key');
      return;
    }
    
    setError('');
    setProgress(0);
    
    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 500);
      
      // TODO: Implement actual API call to OpenRouter
      // const jobs = await searchJobsWithAI(profile, searchConfig, apiKey);
      
      clearInterval(progressInterval);
      setProgress(100);
      
      // Notify parent component
      if (onSearchComplete) {
        onSearchComplete();
      }
    } catch (err) {
      setError(err.message || 'Failed to search for jobs. Please try again.');
    }
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      {/* API Key Configuration */}
      <div className="card border border-gray-200">
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <Key className="w-5 h-5 text-primary-600" />
          API Configuration
        </h2>
        
        <div>
          <label className="block text-sm font-medium mb-1">
            OpenRouter API Key
          </label>
          <input
            type="password"
            className="input-field"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-or-v1-..."
          />
          <p className="text-xs text-gray-500 mt-2">
            Get your API key from{' '}
            <a 
              href="https://openrouter.ai/keys" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-600 hover:underline font-semibold"
            >
              openrouter.ai/keys
            </a>
          </p>
        </div>
      </div>
      
      {/* Search Configuration */}
      <div className="card border border-gray-200">
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <Search className="w-5 h-5 text-primary-600" />
          Search Configuration
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Search Keywords</label>
            <input
              type="text"
              className="input-field"
              value={searchConfig.keywords.join(', ')}
              onChange={(e) => {
                const keywords = e.target.value.split(',').map(k => k.trim()).filter(Boolean);
                updateSearchConfig({ keywords });
              }}
              placeholder="Machine Learning Engineer, Data Scientist..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Industries</label>
            <input
              type="text"
              className="input-field"
              value={searchConfig.industries.join(', ')}
              onChange={(e) => {
                const industries = e.target.value.split(',').map(i => i.trim()).filter(Boolean);
                updateSearchConfig({ industries });
              }}
              placeholder="Technology, AI/ML, Healthcare..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Locations</label>
            <input
              type="text"
              className="input-field"
              value={searchConfig.locations.join(', ')}
              onChange={(e) => {
                const locations = e.target.value.split(',').map(l => l.trim()).filter(Boolean);
                updateSearchConfig({ locations });
              }}
              placeholder="San Francisco, New York, Remote..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Experience Level</label>
            <select
              className="input-field"
              value={searchConfig.experienceLevel}
              onChange={(e) => updateSearchConfig({ experienceLevel: e.target.value })}
            >
              <option value="">Any Level</option>
              <option value="entry">Entry Level</option>
              <option value="mid">Mid Level</option>
              <option value="senior">Senior Level</option>
              <option value="lead">Lead / Manager</option>
              <option value="executive">Executive</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Job Type</label>
            <select
              className="input-field"
              value={searchConfig.jobType}
              onChange={(e) => updateSearchConfig({ jobType: e.target.value })}
            >
              <option value="">Any Type</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
              <option value="remote">Remote</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Custom Search Prompt (Optional)</label>
            <input
              type="text"
              className="input-field"
              value={searchConfig.customPrompt}
              onChange={(e) => updateSearchConfig({ customPrompt: e.target.value })}
              placeholder="Additional search instructions..."
            />
          </div>
        </div>
      </div>
      
      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3 animate-slide-up">
          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-red-800">Error</h3>
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        </div>
      )}
      
      {/* Progress Bar */}
      {isSearching && (
        <div className="card border border-gray-200 animate-slide-up">
          <div className="flex items-center gap-3 mb-2">
            <Loader2 className="w-5 h-5 animate-spin text-primary-600" />
            <span className="font-medium">Searching for jobs...</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Analyzing profile and finding optimal matches... {progress}%
          </p>
        </div>
      )}
      
      {/* Search Button */}
      <div className="flex justify-center pt-4">
        <button
          onClick={handleSearch}
          disabled={isSearching || !isComplete}
          className="btn-primary text-lg px-8 py-3 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSearching ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Searching...
            </>
          ) : (
            <>
              <Wand2 className="w-5 h-5" />
              Search 100 Jobs with AI
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default SearchConfig;
