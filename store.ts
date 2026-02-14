
import { useState, useEffect } from 'react';
import { Project, ContactInfo } from './types';
import { INITIAL_PROJECTS, INITIAL_CONTACT_INFO } from './constants';

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

  return { projects, addProject, updateProject, deleteProject };
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
