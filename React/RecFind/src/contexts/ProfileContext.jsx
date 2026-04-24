import React, { createContext, useContext, useState, useCallback } from 'react';

const ProfileContext = createContext();

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within ProfileProvider');
  }
  return context;
};

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      portfolio: '',
    },
    education: [],
    experience: [],
    skills: {
      technical: [],
      soft: [],
      languages: [],
    },
    research: {
      interests: [],
      publications: [],
      projects: [],
    },
    preferences: {
      locations: [],
      industries: [],
      jobTypes: [],
      remote: false,
      salaryRange: { min: 0, max: 0 },
    },
  });

  const [isComplete, setIsComplete] = useState(false);

  const updateProfile = useCallback((section, data) => {
    setProfile(prev => ({
      ...prev,
      [section]: data
    }));
  }, []);

  const addEducation = useCallback((education) => {
    setProfile(prev => ({
      ...prev,
      education: [...prev.education, { ...education, id: Date.now() }]
    }));
  }, []);

  const addExperience = useCallback((experience) => {
    setProfile(prev => ({
      ...prev,
      experience: [...prev.experience, { ...experience, id: Date.now() }]
    }));
  }, []);

  const addSkill = useCallback((category, skill) => {
    setProfile(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: [...prev.skills[category], skill]
      }
    }));
  }, []);

  const removeEducation = useCallback((id) => {
    setProfile(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  }, []);

  const removeExperience = useCallback((id) => {
    setProfile(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  }, []);

  const removeSkill = useCallback((category, skillToRemove) => {
    setProfile(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: prev.skills[category].filter(skill => skill !== skillToRemove)
      }
    }));
  }, []);

  const validateProfile = useCallback(() => {
    const required = profile.personalInfo.name && 
                    profile.personalInfo.email && 
                    profile.education.length > 0 &&
                    profile.skills.technical.length > 0;
    setIsComplete(!!required);
    return !!required;
  }, [profile]);

  const exportProfile = useCallback(() => {
    return JSON.stringify(profile, null, 2);
  }, [profile]);

  const importProfile = useCallback((jsonString) => {
    try {
      const importedProfile = JSON.parse(jsonString);
      setProfile(importedProfile);
      return true;
    } catch (error) {
      console.error('Error importing profile:', error);
      return false;
    }
  }, []);

  return (
    <ProfileContext.Provider value={{
      profile,
      isComplete,
      updateProfile,
      addEducation,
      addExperience,
      addSkill,
      removeEducation,
      removeExperience,
      removeSkill,
      validateProfile,
      exportProfile,
      importProfile,
    }}>
      {children}
    </ProfileContext.Provider>
  );
};
