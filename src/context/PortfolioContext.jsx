// src/context/PortfolioContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PERSONAL_INFO as DEFAULT_PERSONAL_INFO,
  FEATURED_PROJECTS as DEFAULT_FEATURED_PROJECTS,
  OTHER_PROJECTS as DEFAULT_OTHER_PROJECTS,
  SKILL_CATEGORIES as DEFAULT_SKILL_CATEGORIES,
  EXPERIENCES as DEFAULT_EXPERIENCES,
  EDUCATION as DEFAULT_EDUCATION,
} from '../data/portfolioData';

// Bundled image imports for presets
import scoreLiveImg from '../assets/images/ScoreLivePRO.png';
import hireNearbyImg from '../assets/images/HireNearby.png';
import spartstImg from '../assets/images/spartst.png';
import quranAzkarImg from '../assets/images/quran_azkar.png';
import profilePic from '../assets/images/ismail_potrait.jpg';

export const IMAGE_PRESETS = [
  { id: 'scorelive', label: 'ScoreLivePRO Screenshot', src: scoreLiveImg },
  { id: 'hirenearby', label: 'HireNearby Screenshot', src: hireNearbyImg },
  { id: 'spartst', label: 'SPARTS Screenshot', src: spartstImg },
  { id: 'quranazkar', label: 'Quran & Azkar Screenshot', src: quranAzkarImg },
  { id: 'portrait', label: 'Ismail Portrait', src: profilePic }
];

const ADMIN_EMAIL = 'mdismail.cse59@gmail.com';
const ADMIN_PASS = '586908@sH';

const STORAGE_KEYS = {
  DATA: 'ismail_portfolio_cms_v1',
  AUTH: 'ismail_portfolio_admin_auth',
  SETTINGS: 'ismail_portfolio_settings_v1'
};

const DEFAULT_SETTINGS = {
  sections: {
    hero: true,
    streak: true,
    projects: true,
    experience: true,
    skills: true,
    resume: true,
    about: true,
    contact: true
  },
  swarm: {
    enabled: true,
    ambientCursors: false,
    soundEnabled: true,
    defaultSpeed: 1
  }
};

const PortfolioContext = createContext(null);

export const PortfolioProvider = ({ children }) => {
  // Authentication State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    try {
      const savedAuth = localStorage.getItem(STORAGE_KEYS.AUTH) || sessionStorage.getItem(STORAGE_KEYS.AUTH);
      return savedAuth === 'true';
    } catch {
      return false;
    }
  });

  // Portfolio Data State
  const [portfolioState, setPortfolioState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DATA);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          personalInfo: parsed.personalInfo || DEFAULT_PERSONAL_INFO,
          featuredProjects: parsed.featuredProjects || DEFAULT_FEATURED_PROJECTS,
          otherProjects: parsed.otherProjects || DEFAULT_OTHER_PROJECTS,
          skillCategories: parsed.skillCategories || DEFAULT_SKILL_CATEGORIES,
          experiences: parsed.experiences || DEFAULT_EXPERIENCES,
          education: parsed.education || DEFAULT_EDUCATION
        };
      }
    } catch (e) {
      console.error('Failed to parse portfolio data from localStorage:', e);
    }
    return {
      personalInfo: DEFAULT_PERSONAL_INFO,
      featuredProjects: DEFAULT_FEATURED_PROJECTS,
      otherProjects: DEFAULT_OTHER_PROJECTS,
      skillCategories: DEFAULT_SKILL_CATEGORIES,
      experiences: DEFAULT_EXPERIENCES,
      education: DEFAULT_EDUCATION
    };
  });

  // Site Settings (Section Visibility, etc.)
  const [siteSettings, setSiteSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse site settings:', e);
    }
    return DEFAULT_SETTINGS;
  });

  // Save to localStorage whenever state updates
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.DATA, JSON.stringify(portfolioState));
    } catch (e) {
      console.error('Failed to persist portfolio data:', e);
    }
  }, [portfolioState]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(siteSettings));
    } catch (e) {
      console.error('Failed to persist site settings:', e);
    }
  }, [siteSettings]);

  // Auth Methods
  const login = (email, password, remember = true) => {
    const trimmedEmail = (email || '').trim().toLowerCase();
    if (trimmedEmail === ADMIN_EMAIL.toLowerCase() && password === ADMIN_PASS) {
      setIsAdminLoggedIn(true);
      if (remember) {
        localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
      } else {
        sessionStorage.setItem(STORAGE_KEYS.AUTH, 'true');
      }
      return { success: true };
    }
    return { success: false, message: 'Invalid admin email or password.' };
  };

  const logout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem(STORAGE_KEYS.AUTH);
    sessionStorage.removeItem(STORAGE_KEYS.AUTH);
  };

  // --- CRUD: Featured Projects ---
  const addFeaturedProject = (project) => {
    const newProj = {
      ...project,
      id: project.id || `project-${Date.now()}`
    };
    setPortfolioState((prev) => ({
      ...prev,
      featuredProjects: [newProj, ...prev.featuredProjects]
    }));
  };

  const updateFeaturedProject = (id, updated) => {
    setPortfolioState((prev) => ({
      ...prev,
      featuredProjects: prev.featuredProjects.map((p) => (p.id === id ? { ...p, ...updated } : p))
    }));
  };

  const deleteFeaturedProject = (id) => {
    setPortfolioState((prev) => ({
      ...prev,
      featuredProjects: prev.featuredProjects.filter((p) => p.id !== id)
    }));
  };

  const reorderFeaturedProjects = (fromIndex, toIndex) => {
    setPortfolioState((prev) => {
      const list = [...prev.featuredProjects];
      const [moved] = list.splice(fromIndex, 1);
      list.splice(toIndex, 0, moved);
      return { ...prev, featuredProjects: list };
    });
  };

  const moveToOtherProjects = (id) => {
    setPortfolioState((prev) => {
      const proj = prev.featuredProjects.find((p) => p.id === id);
      if (!proj) return prev;
      const otherItem = {
        id: proj.id,
        name: proj.name,
        category: proj.category || 'live',
        badge: proj.badge || 'Showcase',
        tagline: proj.tagline || '',
        description: proj.problem || proj.solution || proj.tagline || '',
        tech: proj.tech || [],
        links: proj.links || []
      };
      return {
        ...prev,
        featuredProjects: prev.featuredProjects.filter((p) => p.id !== id),
        otherProjects: [otherItem, ...prev.otherProjects]
      };
    });
  };

  // --- CRUD: Other Projects ---
  const addOtherProject = (project) => {
    const newProj = {
      ...project,
      id: project.id || `other-${Date.now()}`
    };
    setPortfolioState((prev) => ({
      ...prev,
      otherProjects: [newProj, ...prev.otherProjects]
    }));
  };

  const updateOtherProject = (id, updated) => {
    setPortfolioState((prev) => ({
      ...prev,
      otherProjects: prev.otherProjects.map((p) => (p.id === id ? { ...p, ...updated } : p))
    }));
  };

  const deleteOtherProject = (id) => {
    setPortfolioState((prev) => ({
      ...prev,
      otherProjects: prev.otherProjects.filter((p) => p.id !== id)
    }));
  };

  const reorderOtherProjects = (fromIndex, toIndex) => {
    setPortfolioState((prev) => {
      const list = [...prev.otherProjects];
      const [moved] = list.splice(fromIndex, 1);
      list.splice(toIndex, 0, moved);
      return { ...prev, otherProjects: list };
    });
  };

  const promoteToFeatured = (id) => {
    setPortfolioState((prev) => {
      const proj = prev.otherProjects.find((p) => p.id === id);
      if (!proj) return prev;
      const featuredItem = {
        id: proj.id,
        name: proj.name,
        badge: proj.badge || 'Live on Stores',
        category: proj.category || 'live',
        tagline: proj.tagline || proj.description || '',
        image: scoreLiveImg,
        rating: '4.8 ★',
        platform: 'iOS · Android',
        role: 'Lead Flutter Developer',
        problem: proj.description || 'Engineering challenging real-time mobile capabilities.',
        solution: proj.description || 'Delivered high-performance solution with Clean Architecture.',
        keyFeatures: [
          'High frame rate zero jank interface',
          'Clean Architecture with robust state management'
        ],
        tech: proj.tech || ['Flutter', 'Clean Architecture'],
        links: proj.links || []
      };
      return {
        ...prev,
        otherProjects: prev.otherProjects.filter((p) => p.id !== id),
        featuredProjects: [...prev.featuredProjects, featuredItem]
      };
    });
  };

  // --- CRUD: Experiences ---
  const addExperience = (exp) => {
    setPortfolioState((prev) => ({
      ...prev,
      experiences: [exp, ...prev.experiences]
    }));
  };

  const updateExperience = (index, updated) => {
    setPortfolioState((prev) => {
      const updatedList = [...prev.experiences];
      updatedList[index] = { ...updatedList[index], ...updated };
      return { ...prev, experiences: updatedList };
    });
  };

  const deleteExperience = (index) => {
    setPortfolioState((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((_, idx) => idx !== index)
    }));
  };

  const reorderExperiences = (fromIndex, toIndex) => {
    setPortfolioState((prev) => {
      const list = [...prev.experiences];
      const [moved] = list.splice(fromIndex, 1);
      list.splice(toIndex, 0, moved);
      return { ...prev, experiences: list };
    });
  };

  // --- CRUD: Skill Categories ---
  const addSkillCategory = (category) => {
    const newCat = {
      ...category,
      id: category.id || `cat-${Date.now()}`,
      skills: category.skills || []
    };
    setPortfolioState((prev) => ({
      ...prev,
      skillCategories: [...prev.skillCategories, newCat]
    }));
  };

  const updateSkillCategory = (categoryId, updated) => {
    setPortfolioState((prev) => ({
      ...prev,
      skillCategories: prev.skillCategories.map((c) =>
        c.id === categoryId ? { ...c, ...updated } : c
      )
    }));
  };

  const deleteSkillCategory = (categoryId) => {
    setPortfolioState((prev) => ({
      ...prev,
      skillCategories: prev.skillCategories.filter((c) => c.id !== categoryId)
    }));
  };

  const reorderSkillCategories = (fromIndex, toIndex) => {
    setPortfolioState((prev) => {
      const list = [...prev.skillCategories];
      const [moved] = list.splice(fromIndex, 1);
      list.splice(toIndex, 0, moved);
      return { ...prev, skillCategories: list };
    });
  };

  // --- CRUD: Education ---
  const addEducation = (edu) => {
    setPortfolioState((prev) => ({
      ...prev,
      education: [...prev.education, edu]
    }));
  };

  const updateEducation = (index, updated) => {
    setPortfolioState((prev) => {
      const list = [...prev.education];
      list[index] = { ...list[index], ...updated };
      return { ...prev, education: list };
    });
  };

  const deleteEducation = (index) => {
    setPortfolioState((prev) => ({
      ...prev,
      education: prev.education.filter((_, idx) => idx !== index)
    }));
  };

  const reorderEducation = (fromIndex, toIndex) => {
    setPortfolioState((prev) => {
      const list = [...prev.education];
      const [moved] = list.splice(fromIndex, 1);
      list.splice(toIndex, 0, moved);
      return { ...prev, education: list };
    });
  };

  // --- Update Personal Info ---
  const updatePersonalInfo = (updated) => {
    setPortfolioState((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...updated }
    }));
  };

  // --- Section Visibility Settings ---
  const toggleSection = (sectionKey) => {
    setSiteSettings((prev) => ({
      ...prev,
      sections: {
        ...prev.sections,
        [sectionKey]: !prev.sections[sectionKey]
      }
    }));
  };

  // --- Swarm Cursors Settings & Trigger ---
  const updateSwarmSettings = (updated) => {
    setSiteSettings((prev) => ({
      ...prev,
      swarm: {
        ...(prev.swarm || DEFAULT_SETTINGS.swarm),
        ...updated
      }
    }));
  };

  const triggerSwarmRebuild = () => {
    window.dispatchEvent(new CustomEvent('ismail-swarm-trigger'));
  };

  // --- Reset to Factory Defaults ---
  const resetToDefaults = () => {
    setPortfolioState({
      personalInfo: DEFAULT_PERSONAL_INFO,
      featuredProjects: DEFAULT_FEATURED_PROJECTS,
      otherProjects: DEFAULT_OTHER_PROJECTS,
      skillCategories: DEFAULT_SKILL_CATEGORIES,
      experiences: DEFAULT_EXPERIENCES,
      education: DEFAULT_EDUCATION
    });
    setSiteSettings(DEFAULT_SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.DATA);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
  };

  // --- Import / Export JSON ---
  const exportAsJson = () => {
    const payload = JSON.stringify(
      {
        exportedAt: new Date().toISOString(),
        version: '1.0',
        portfolioState,
        siteSettings
      },
      null,
      2
    );
    const blob = new Blob([payload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ismail-portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importFromJson = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      const stateToLoad = parsed.portfolioState || parsed;
      if (stateToLoad.personalInfo || stateToLoad.featuredProjects) {
        setPortfolioState({
          personalInfo: stateToLoad.personalInfo || DEFAULT_PERSONAL_INFO,
          featuredProjects: stateToLoad.featuredProjects || DEFAULT_FEATURED_PROJECTS,
          otherProjects: stateToLoad.otherProjects || DEFAULT_OTHER_PROJECTS,
          skillCategories: stateToLoad.skillCategories || DEFAULT_SKILL_CATEGORIES,
          experiences: stateToLoad.experiences || DEFAULT_EXPERIENCES,
          education: stateToLoad.education || DEFAULT_EDUCATION
        });
        if (parsed.siteSettings) {
          setSiteSettings(parsed.siteSettings);
        }
        return { success: true };
      }
      return { success: false, message: 'JSON format does not match expected portfolio schema.' };
    } catch (e) {
      return { success: false, message: 'Invalid JSON file: ' + e.message };
    }
  };

  // --- Code Generator: Download portfolioData.js ---
  const generatePortfolioDataCode = () => {
    const {
      personalInfo,
      featuredProjects,
      otherProjects,
      skillCategories,
      experiences,
      education
    } = portfolioState;

    // Detect image assignments
    const code = `// src/data/portfolioData.js
// Generated by Ismail Portfolio Admin CMS on ${new Date().toLocaleString()}
import scoreLiveImg from '../assets/images/ScoreLivePRO.png';
import hireNearbyImg from '../assets/images/HireNearby.png';
import spartstImg from '../assets/images/spartst.png';
import quranAzkarImg from '../assets/images/quran_azkar.png';
import profilePic from '../assets/images/ismail_potrait.jpg';

export const PERSONAL_INFO = ${JSON.stringify(personalInfo, null, 2).replace(
      /"profilePhoto":\s*".*?"/,
      'profilePhoto: profilePic'
    )};

export const FEATURED_PROJECTS = ${JSON.stringify(
      featuredProjects.map((p) => {
        // If image matches a preset, preserve the identifier or handle
        return p;
      }),
      null,
      2
    )
      // Replace known image string paths with the variable imports if applicable
      .replace(/"image":\s*"\/static\/media\/ScoreLivePRO\.[a-z0-9]+\.png"/g, '"image": scoreLiveImg')
      .replace(/"image":\s*"\/static\/media\/HireNearby\.[a-z0-9]+\.png"/g, '"image": hireNearbyImg')
      .replace(/"image":\s*"\/static\/media\/spartst\.[a-z0-9]+\.png"/g, '"image": spartstImg')
      .replace(/"image":\s*"\/static\/media\/quran_azkar\.[a-z0-9]+\.png"/g, '"image": quranAzkarImg')};

export const OTHER_PROJECTS = ${JSON.stringify(otherProjects, null, 2)};

export const SKILL_CATEGORIES = ${JSON.stringify(skillCategories, null, 2)};

export const EXPERIENCES = ${JSON.stringify(experiences, null, 2)};

export const EDUCATION = ${JSON.stringify(education, null, 2)};
`;
    return code;
  };

  const downloadPortfolioDataJs = () => {
    const code = generatePortfolioDataCode();
    const blob = new Blob([code], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'portfolioData.js';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <PortfolioContext.Provider
      value={{
        isAdminLoggedIn,
        login,
        logout,
        portfolioState,
        siteSettings,
        toggleSection,
        updateSwarmSettings,
        triggerSwarmRebuild,
        // Projects CRUD
        addFeaturedProject,
        updateFeaturedProject,
        deleteFeaturedProject,
        reorderFeaturedProjects,
        moveToOtherProjects,
        addOtherProject,
        updateOtherProject,
        deleteOtherProject,
        reorderOtherProjects,
        promoteToFeatured,
        // Experience CRUD
        addExperience,
        updateExperience,
        deleteExperience,
        reorderExperiences,
        // Skills CRUD
        addSkillCategory,
        updateSkillCategory,
        deleteSkillCategory,
        reorderSkillCategories,
        // Education CRUD
        addEducation,
        updateEducation,
        deleteEducation,
        reorderEducation,
        // Personal Info
        updatePersonalInfo,
        // Utilities
        resetToDefaults,
        exportAsJson,
        importFromJson,
        generatePortfolioDataCode,
        downloadPortfolioDataJs
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
