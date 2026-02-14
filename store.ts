
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

// 커스텀 이벤트 시스템을 통해 여러 탭이나 컴포넌트 간 상태를 동기화합니다.
const createStore = <T>(key: string, initialValue: T) => {
  const eventName = `store_update_${key}`;

  return () => {
    const [state, setState] = useState<T>(() => {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
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
          setState(JSON.parse(e.newValue));
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

  return { categories, addCategory, deleteCategory, updateCategories };
};

const useProjectsInternal = createStore('flips_projects', INITIAL_PROJECTS);
export const useProjectStore = () => {
  const [projects, setProjects] = useProjectsInternal();

  const addProject = (project: Project) => {
    setProjects([project, ...projects]);
  };

  const updateProject = (id: string, updated: Project) => {
    setProjects(projects.map(p => p.id === id ? updated : p));
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const reorderProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
  };

  return { projects, addProject, updateProject, deleteProject, reorderProjects };
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
