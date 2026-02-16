
import { useState, useEffect } from 'react';
import { Project, ContactInfo, HomeInfo, AboutInfo, ClientList } from './types';
import { 
  INITIAL_PROJECTS, 
  INITIAL_CONTACT_INFO, 
  INITIAL_HOME_INFO, 
  INITIAL_ABOUT_INFO, 
  INITIAL_CLIENT_DATA,
  INITIAL_CATEGORIES
} from './constants';

const safeParse = (key: string, fallback: any) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error parsing localStorage key "${key}":`, e);
    return fallback;
  }
};

export const useCategoryStore = () => {
  const [categories, setCategories] = useState<string[]>(() => safeParse('flips_categories', INITIAL_CATEGORIES));

  useEffect(() => {
    localStorage.setItem('flips_categories', JSON.stringify(categories));
  }, [categories]);

  const addCategory = (name: string) => {
    if (!categories.includes(name)) {
      setCategories(prev => [...prev, name]);
    }
  };

  const deleteCategory = (name: string) => {
    setCategories(prev => prev.filter(c => c !== name));
  };

  return { categories, addCategory, deleteCategory };
};

export const useProjectStore = () => {
  const [projects, setProjects] = useState<Project[]>(() => safeParse('flips_projects', INITIAL_PROJECTS));

  useEffect(() => {
    localStorage.setItem('flips_projects', JSON.stringify(projects));
  }, [projects]);

  const addProject = (project: Project) => setProjects(prev => [project, ...prev]);
  const updateProject = (id: string, updated: Project) => setProjects(prev => prev.map(p => p.id === id ? updated : p));
  const deleteProject = (id: string) => setProjects(prev => prev.filter(p => p.id !== id));

  return { projects, addProject, updateProject, deleteProject };
};

export const useHomeStore = () => {
  const [home, setHome] = useState<HomeInfo>(() => safeParse('flips_home', INITIAL_HOME_INFO));
  useEffect(() => { localStorage.setItem('flips_home', JSON.stringify(home)); }, [home]);
  return { home, updateHome: setHome };
};

export const useAboutStore = () => {
  const [about, setAbout] = useState<AboutInfo>(() => safeParse('flips_about', INITIAL_ABOUT_INFO));
  useEffect(() => { localStorage.setItem('flips_about', JSON.stringify(about)); }, [about]);
  return { about, updateAbout: setAbout };
};

export const useClientStore = () => {
  const [clientData, setClientData] = useState<ClientList>(() => safeParse('flips_clients', INITIAL_CLIENT_DATA));
  useEffect(() => { localStorage.setItem('flips_clients', JSON.stringify(clientData)); }, [clientData]);
  return { clientData, updateClients: setClientData };
};

export const useContactStore = () => {
  const [contact, setContact] = useState<ContactInfo>(() => safeParse('flips_contact', INITIAL_CONTACT_INFO));
  useEffect(() => { localStorage.setItem('flips_contact', JSON.stringify(contact)); }, [contact]);
  return { contact, updateContact: setContact };
};

export const syncAppData = (jsonString: string) => {
  try {
    const data = JSON.parse(jsonString);
    const keys = ['projects', 'categories', 'home', 'about', 'clients', 'contact'];
    keys.forEach(key => {
      if (data[key]) localStorage.setItem(`flips_${key}`, JSON.stringify(data[key]));
    });
    window.location.reload();
  } catch (e) {
    alert('Invalid Sync Code.');
  }
};

export const exportAppData = () => {
  const data = {
    projects: safeParse('flips_projects', INITIAL_PROJECTS),
    categories: safeParse('flips_categories', INITIAL_CATEGORIES),
    home: safeParse('flips_home', INITIAL_HOME_INFO),
    about: safeParse('flips_about', INITIAL_ABOUT_INFO),
    clients: safeParse('flips_clients', INITIAL_CLIENT_DATA),
    contact: safeParse('flips_contact', INITIAL_CONTACT_INFO),
  };
  return JSON.stringify(data);
};
