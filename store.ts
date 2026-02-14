
import { useState, useEffect, useCallback } from 'react';
import { Project, ContactInfo, HomeInfo, AboutInfo, ClientList } from './types';
import { 
  INITIAL_PROJECTS, 
  INITIAL_CONTACT_INFO, 
  INITIAL_HOME_INFO, 
  INITIAL_ABOUT_INFO, 
  INITIAL_CLIENT_DATA,
  INITIAL_CATEGORIES
} from './constants';

const createStore = <T>(key: string, initialValue: T) => {
  const eventName = `store_update_${key}`;

  return () => {
    const [state, setState] = useState<T>(() => {
      try {
        const saved = localStorage.getItem(key);
        if (!saved) return initialValue;
        const parsed = JSON.parse(saved);
        
        // 배열인 경우 그대로 반환, 객체인 경우 초기값과 병합하여 새로운 필드 누락 방지
        if (Array.isArray(initialValue)) {
          return parsed;
        }
        return { ...initialValue, ...parsed };
      } catch (e) {
        console.error(`Failed to load ${key} from localStorage`, e);
        return initialValue;
      }
    });

    const updateState = useCallback((newValue: T | ((prev: T) => T)) => {
      setState((prev) => {
        const next = typeof newValue === 'function' ? (newValue as Function)(prev) : newValue;
        localStorage.setItem(key, JSON.stringify(next));
        window.dispatchEvent(new CustomEvent(eventName, { detail: next }));
        return next;
      });
    }, []);

    useEffect(() => {
      const handleUpdate = (e: any) => {
        setState(e.detail);
      };
      
      const handleStorage = (e: StorageEvent) => {
        if (e.key === key && e.newValue) {
          try {
            const parsed = JSON.parse(e.newValue);
            setState(Array.isArray(initialValue) ? parsed : { ...initialValue, ...parsed });
          } catch (err) {
            console.error(err);
          }
        }
      };

      window.addEventListener(eventName, handleUpdate);
      window.addEventListener('storage', handleStorage);
      return () => {
        window.removeEventListener(eventName, handleUpdate);
        window.removeEventListener('storage', handleStorage);
      };
    }, []);

    return [state, updateState] as const;
  };
};

const useCategoriesInternal = createStore('flips_categories', INITIAL_CATEGORIES);
export const useCategoryStore = () => {
  const [categories, setCategories] = useCategoriesInternal();
  
  const addCategory = (name: string) => {
    if (!categories.includes(name)) {
      setCategories([...categories, name]);
    }
  };

  const deleteCategory = (name: string) => {
    setCategories(categories.filter(c => c !== name));
  };

  const updateCategories = (newList: string[]) => {
    setCategories(newList);
  };

  return { categories: categories || [], addCategory, deleteCategory, updateCategories };
};

const useProjectsInternal = createStore('flips_projects', INITIAL_PROJECTS);
export const useProjectStore = () => {
  const [projects, setProjects] = useProjectsInternal();

  const addProject = (project: Project) => {
    setProjects([project, ...(projects || [])]);
  };

  const updateProject = (id: string, updated: Project) => {
    setProjects((projects || []).map(p => p.id === id ? updated : p));
  };

  const deleteProject = (id: string) => {
    setProjects((projects || []).filter(p => p.id !== id));
  };

  const reorderProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
  };

  return { projects: projects || [], addProject, updateProject, deleteProject, reorderProjects };
};

const useHomeInternal = createStore('flips_home', INITIAL_HOME_INFO);
export const useHomeStore = () => {
  const [home, setHome] = useHomeInternal();
  const updateHome = (newHome: HomeInfo) => setHome(newHome);
  return { home, updateHome };
};

const useAboutInternal = createStore('flips_about', INITIAL_ABOUT_INFO);
export const useAboutStore = () => {
  const [about, setAbout] = useAboutInternal();
  const updateAbout = (newAbout: AboutInfo) => setAbout(newAbout);
  return { about, updateAbout };
};

const useClientsInternal = createStore('flips_clients', INITIAL_CLIENT_DATA);
export const useClientStore = () => {
  const [clientData, setClientData] = useClientsInternal();
  const updateClients = (newClients: ClientList) => setClientData(newClients);
  return { clientData, updateClients };
};

const useContactInternal = createStore('flips_contact', INITIAL_CONTACT_INFO);
export const useContactStore = () => {
  const [contact, setContact] = useContactInternal();
  const updateContact = (newContact: ContactInfo) => setContact(newContact);
  return { contact, updateContact };
};
