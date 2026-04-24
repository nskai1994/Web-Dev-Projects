import React, { createContext, useContext, useState, useCallback } from 'react';

const JobSearchContext = createContext();

export const useJobSearch = () => {
  const context = useContext(JobSearchContext);
  if (!context) {
    throw new Error('useJobSearch must be used within JobSearchProvider');
  }
  return context;
};

export const JobSearchProvider = ({ children }) => {
  const [searchConfig, setSearchConfig] = useState({
    keywords: [],
    industries: [],
    locations: [],
    experienceLevel: '',
    jobType: '',
    customPrompt: '',
  });

  const [jobs, setJobs] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchProgress, setSearchProgress] = useState(0);
  const [error, setError] = useState(null);
  const [lastSearchTime, setLastSearchTime] = useState(null);

  const updateSearchConfig = useCallback((config) => {
    setSearchConfig(prev => ({ ...prev, ...config }));
  }, []);

  const resetSearch = useCallback(() => {
    setJobs([]);
    setSearchProgress(0);
    setError(null);
  }, []);

  const performSearch = useCallback(async (profile, apiKey) => {
    setIsSearching(true);
    setError(null);
    setSearchProgress(0);
    
    try {
      console.log('Searching with config:', searchConfig);
      console.log('Profile:', profile);
      
      // Simulate search progress
      for (let i = 0; i <= 90; i += 15) {
        setSearchProgress(i);
        await new Promise(resolve => setTimeout(resolve, 800));
      }
      
      setSearchProgress(100);
      setLastSearchTime(new Date());
      setJobs([]);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSearching(false);
    }
  }, [searchConfig]);

  return (
    <JobSearchContext.Provider value={{
      searchConfig,
      jobs,
      isSearching,
      searchProgress,
      error,
      lastSearchTime,
      updateSearchConfig,
      performSearch,
      setJobs,
      resetSearch,
    }}>
      {children}
    </JobSearchContext.Provider>
  );
};
