import { createContext, useContext, useState, useCallback } from 'react';

const JobSearchContext = createContext();

export const useJobSearch = () => {
  const context = useContext(JobSearchContext);
  if (!context) {
    throw new Error('useJobSearch must be used within JobSearchProvider');
  }
  return context;
};

export const JobSearchProvider = ({ children }) => {
  const [apiKey, setApiKey] = useState('');
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

  const updateSearchConfig = useCallback((config) => {
    setSearchConfig(prev => ({ ...prev, ...config }));
  }, []);

  const performSearch = useCallback(async (profile) => {
    setIsSearching(true);
    setError(null);
    setSearchProgress(0);

    try {
      // This will be implemented with OpenRouter API
      console.log('Searching with config:', searchConfig);
      console.log('Profile:', profile);

      // Simulate search progress
      for (let i = 0; i <= 100; i += 20) {
        setSearchProgress(i);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      // Placeholder for actual API implementation
      setJobs([]);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSearching(false);
    }
  }, [searchConfig]);

  return (
    <JobSearchContext.Provider value={{
      apiKey,
      setApiKey,
      searchConfig,
      jobs,
      isSearching,
      searchProgress,
      error,
      updateSearchConfig,
      performSearch,
      setJobs,
      setIsSearching,
    }}>
      {children}
    </JobSearchContext.Provider>
  );
};
