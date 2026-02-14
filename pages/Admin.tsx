
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useProjectStore, useContactStore } from '../store';
import { Category, Project, ContactInfo } from '../types';

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const { projects, addProject, updateProject, deleteProject } = useProjectStore();
  const { contact, updateContact } = useContactStore();
  
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [localThumbnail, setLocalThumbnail] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [contactDraft, setContactDraft] = useState<ContactInfo>(contact);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1111') {
      setIsAuthenticated(true);
    } else {
      alert('비밀번호가 틀렸습니다.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLocalThumbnail(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProjectSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const finalThumbnail = localThumbnail || (formData.get('thumbnailUrl') as string) || editingProject?.thumbnail || '';

    const data: Partial<Project> = {
      artist: formData.get('artist') as string,
      title: formData.get('title') as string,
      client: formData.get('client') as string,
      production: formData.get('production') as string,
      category: formData.get('category') as Category,
      role: formData.get('role') as string,
      company: formData.get('company') as string,
      camera: formData.get('camera') as string,
      lens: formData.get('lens') as string,
      year: formData.get('year') as string,
      videoUrl: formData.get('videoUrl') as string,
      thumbnail: finalThumbnail,
      isSelectedWork: formData.get('isSelectedWork') === 'on',
    };

    if (editingProject) {
      updateProject(editingProject.id, { ...editingProject, ...data } as Project);
      setEditingProject(null);
    } else {
      const newProject: Project = {
        ...data as Project,
        id: Date.now().toString(),
      };
      addProject(newProject);
    }
    
    e.currentTarget.reset();
    setLocalThumbnail(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    alert('저장되었습니다.');
  };

  const handleContactSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateContact(contactDraft);
    alert('연락처 정보가 수정되었습니다.');
  };

  const startEdit = (p: Project) => {
    setEditingProject(p);
    setLocalThumbnail(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isAuthenticated) {
    return (
      <div className="h-screen flex items-center justify-center bg-black px-6">
        <form onSubmit={handleLogin} className="max-w-md w-full space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold tracking-tighter uppercase">FLIPS ADMIN</h1>
            <p className="text-[10px] text-[#555] tracking-[0.3em]">PROTECTED AREA</p>
          </div>
          <input
            type="password"
            placeholder="PASSWORD"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-zinc-900 border border-white/10 py-4 px-4 outline-none text-center tracking-[0.5em] focus:border-white/40 transition-colors text-white"
          />
          <button type="submit" className="w-full bg-white text-black py-4 text-xs font-bold tracking-[0.2em] hover:bg-zinc-200 transition-colors uppercase">
            ENTER
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-32 px-6 md:px-12 bg-[#000] min-h-screen text-white">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-white/10 pb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter uppercase">ADMIN DASHBOARD</h1>
            <p className="text-[10px] text-[#555] tracking-widest mt-1 uppercase">Management Mode</p>
          </div>
          <div className="flex gap-6 items-center">
            <Link to="/" className="text-[10px] tracking-widest text-[#555] hover:text-white transition-colors">GO TO SITE</Link>
            <button onClick={() => setIsAuthenticated(false)} className="bg-zinc-900 text-[10px] tracking-widest px-6 py-2 hover:bg-zinc-800 transition-colors uppercase font-bold">LOGOUT</button>
          </div>
        </div>

        {/* Contact Edit Section */}
        <section>
          <h2 className="text-[11px] tracking-[0.3em] text-[#AAAAAA] mb-8 uppercase font-bold border-b border-white/10 pb-4">MANAGE CONTACT INFO</h2>
          <form onSubmit={handleContactSave} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-zinc-950 p-8 border border-white/5">
            <AdminInput 
              name="email" 
              label="EMAIL" 
              defaultValue={contact.email} 
              onChange={(v) => setContactDraft(prev => ({ ...prev, email: v }))}
            />
            <AdminInput 
              name="instagram" 
              label="INSTAGRAM" 
              defaultValue={contact.instagram} 
              onChange={(v) => setContactDraft(prev => ({ ...prev, instagram: v }))}
            />
            <AdminInput 
              name="vimeo" 
              label="VIMEO URL" 
              defaultValue={contact.vimeo} 
              onChange={(v) => setContactDraft(prev => ({ ...prev, vimeo: v }))}
            />
            <AdminInput 
              name="phone" 
              label="PHONE" 
              defaultValue={contact.phone} 
              onChange={(v) => setContactDraft(prev => ({ ...prev, phone: v }))}
            />
            <div className="md:col-span-2 lg:col-span-4 flex justify-end">
              <button type="submit" className="bg-white text-black px-10 py-3 text-[10px] font-bold tracking-widest uppercase hover:bg-zinc-200 transition-colors">
                SAVE CONTACT INFO
              </button>
            </div>
          </form>
        </section>

        {/* Project Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-1 bg-zinc-950 p-8 border border-white/5 rounded-sm h-fit">
            <h2 className="text-[11px] tracking-[0.3em] text-white mb-8 uppercase font-bold border-b border-white/10 pb-4">
              {editingProject ? 'EDIT PROJECT' : 'ADD NEW PROJECT'}
            </h2>
            <form onSubmit={handleProjectSave} className="space-y-5">
              <AdminInput name="artist" label="ARTIST / BRAND" defaultValue={editingProject?.artist} required />
              <AdminInput name="title" label="PROJECT TITLE" defaultValue={editingProject?.title} required />
              
              <div className="space-y-1">
                <label className="text-[9px] text-[#555] uppercase tracking-widest font-bold">CATEGORY</label>
                <select name="category" defaultValue={editingProject?.category} className="w-full bg-zinc-900 border border-white/5 p-3 text-xs outline-none focus:border-white/20 text-white">
                  {Object.values(Category).filter(c => c !== Category.ALL).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <AdminInput name="year" label="YEAR" defaultValue={editingProject?.year} />
                <AdminInput name="role" label="ROLE" defaultValue={editingProject?.role} />
              </div>
              
              <AdminInput name="camera" label="CAMERA" defaultValue={editingProject?.camera} />
              <AdminInput name="lens" label="LENS" defaultValue={editingProject?.lens} />
              <AdminInput name="videoUrl" label="VIMEO URL (PLAYER LINK)" defaultValue={editingProject?.videoUrl} />
              
              <div className="space-y-2">
                <label className="text-[9px] text-[#555] uppercase tracking-widest font-bold">THUMBNAIL IMAGE</label>
                <div className="flex flex-col gap-3">
                  {(localThumbnail || editingProject?.thumbnail) && (
                    <div className="w-full aspect-video bg-zinc-900 border border-white/5 overflow-hidden">
                      <img src={localThumbnail || editingProject?.thumbnail} className="w-full h-full object-cover grayscale" alt="Preview" />
                    </div>
                  )}
                  <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="text-[10px] text-[#555] file:mr-4 file:py-2 file:px-4 file:border-0 file:text-[10px] file:font-bold file:tracking-widest file:bg-zinc-800 file:text-white cursor-pointer" />
                  <input name="thumbnailUrl" placeholder="OR URL: https://..." className="w-full bg-zinc-900 border border-white/10 p-2 text-[10px] outline-none text-white" />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input type="checkbox" name="isSelectedWork" id="isSelectedWork" defaultChecked={editingProject?.isSelectedWork} className="w-4 h-4 accent-white" />
                <label htmlFor="isSelectedWork" className="text-[10px] tracking-widest uppercase text-[#AAAAAA]">FEATURE ON HOME</label>
              </div>

              <div className="flex gap-4 pt-6">
                <button type="submit" className="flex-1 bg-white text-black py-4 text-[10px] font-bold tracking-[0.2em] uppercase">
                  {editingProject ? 'UPDATE' : 'CREATE'}
                </button>
                {editingProject && (
                  <button type="button" onClick={() => { setEditingProject(null); setLocalThumbnail(null); }} className="flex-1 border border-white/10 text-white py-4 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-white/5">
                    CANCEL
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-[11px] tracking-[0.3em] text-[#AAAAAA] mb-8 uppercase font-bold">PROJECT LIST ({projects.length})</h2>
            <div className="space-y-3">
              {projects.length === 0 && <p className="text-[#555] text-xs py-20 text-center border border-dashed border-white/10 uppercase tracking-widest">No projects added yet.</p>}
              {projects.map(p => (
                <div key={p.id} className="bg-zinc-950 p-5 flex justify-between items-center group hover:border-white/20 border border-white/5 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-10 bg-zinc-900 overflow-hidden hidden sm:block">
                      <img src={p.thumbnail} className="w-full h-full object-cover grayscale" alt="" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                         <p className="text-[9px] text-[#555] tracking-widest uppercase">{p.category}</p>
                         {p.isSelectedWork && <span className="text-[8px] bg-white text-black px-1 tracking-tighter">FEATURED</span>}
                      </div>
                      <h3 className="text-sm font-medium tracking-tight">{p.artist} - {p.title} <span className="text-[#333] ml-2 text-xs">({p.year})</span></h3>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => startEdit(p)} className="text-[10px] tracking-widest text-[#555] hover:text-white uppercase font-bold transition-colors">Edit</button>
                    <button onClick={() => { if(confirm('정말 삭제하시겠습니까?')) deleteProject(p.id); }} className="text-[10px] tracking-widest text-zinc-800 hover:text-red-500 uppercase font-bold transition-colors">Del</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminInput: React.FC<{ name: string; label: string; defaultValue?: string; required?: boolean; onChange?: (v: string) => void }> = ({ name, label, defaultValue, required, onChange }) => (
  <div className="space-y-1">
    <label className="text-[9px] text-[#555] uppercase tracking-widest font-bold">{label}</label>
    <input 
      name={name} 
      key={defaultValue}
      defaultValue={defaultValue} 
      required={required}
      autoComplete="off"
      onChange={(e) => onChange && onChange(e.target.value)}
      className="w-full bg-zinc-900 border border-white/10 p-3 text-xs outline-none focus:border-white/30 transition-colors text-white"
    />
  </div>
);

export default Admin;
