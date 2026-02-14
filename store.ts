
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

export const useCategoryStore = () => {
  const [categories, setCategories] = useState<string[]>(() => {
    const saved = localStorage.getItem('flips_categories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

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

  const updateCategories = (newList: string[]) => {
    setCategories(newList);
  };

  return { categories, addCategory, deleteCategory, updateCategories };
};

export const useProjectStore = () => {
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('flips_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  useEffect(() => {
    localStorage.setItem('flips_projects', JSON.stringify(projects));
  }, [projects]);

  const addProject = (project: Project) => {
    setProjects(prev => [project, ...prev]);
  };

  const updateProject = (id: string, updated: Project) => {
    setProjects(prev => prev.map(p => p.id === id ? updated : p));
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const reorderProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
  };

  return { projects, addProject, updateProject, deleteProject, reorderProjects };
};

export const useHomeStore = () => {
  const [home, setHome] = useState<HomeInfo>(() => {
    const saved = localStorage.getItem('flips_home');
    return saved ? JSON.parse(saved) : INITIAL_HOME_INFO;
  });

  useEffect(() => {
    localStorage.setItem('flips_home', JSON.stringify(home));
  }, [home]);

  const updateHome = (newHome: HomeInfo) => setHome(newHome);
  return { home, updateHome };
};

export const useAboutStore = () => {
  const [about, setAbout] = useState<AboutInfo>(() => {
    const saved = localStorage.getItem('flips_about');
    return saved ? JSON.parse(saved) : INITIAL_ABOUT_INFO;
  });

  useEffect(() => {
    localStorage.setItem('flips_about', JSON.stringify(about));
  }, [about]);

  const updateAbout = (newAbout: AboutInfo) => setAbout(newAbout);
  return { about, updateAbout };
};

export const useClientStore = () => {
  const [clientData, setClientData] = useState<ClientList>(() => {
    const saved = localStorage.getItem('flips_clients');
    return saved ? JSON.parse(saved) : INITIAL_CLIENT_DATA;
  });

  useEffect(() => {
    localStorage.setItem('flips_clients', JSON.stringify(clientData));
  }, [clientData]);

  const updateClients = (newClients: ClientList) => setClientData(newClients);
  return { clientData, updateClients };
};

export const useContactStore = () => {
  const [contact, setContact] = useState<ContactInfo>(() => {
    const saved = localStorage.getItem('flips_contact');
    return saved ? JSON.parse(saved) : INITIAL_CONTACT_INFO;
  });

  useEffect(() => {
    localStorage.setItem('flips_contact', JSON.stringify(contact));
  }, [contact]);

  const updateContact = (newContact: ContactInfo) => {
    setContact(newContact);
  };

  return { contact, updateContact };
};
