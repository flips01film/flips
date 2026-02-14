
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  useProjectStore, 
  useContactStore, 
  useHomeStore, 
  useAboutStore, 
  useClientStore,
  useCategoryStore
} from '../store';
import { Project, ContactInfo, HomeInfo, AboutInfo, ClientList, Category } from '../types';

type AdminTab = 'PROJECTS' | 'CATEGORIES' | 'HOME' | 'ABOUT' | 'CLIENTS' | 'CONTACT';

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<AdminTab>('PROJECTS');
  
  const { projects, addProject, updateProject, deleteProject, reorderProjects } = useProjectStore();
  const { contact, updateContact } = useContactStore();
  const { home, updateHome } = useHomeStore();
  const { about, updateAbout } = useAboutStore();
  const { clientData, updateClients } = useClientStore();
  const { categories, addCategory, deleteCategory } = useCategoryStore();

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [localThumbnail, setLocalThumbnail] = useState<string | null>(null);
  const [localHomeImage, setLocalHomeImage] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const homeImageInputRef = useRef<HTMLInputElement>(null);

  // Drafts for direct form control
  const [contactDraft, setContactDraft] = useState<ContactInfo>(contact);
  const [homeDraft, setHomeDraft] = useState<HomeInfo>(home);
  const [aboutDraft, setAboutDraft] = useState<AboutInfo>(about);
  const [clientsInput, setClientsInput] = useState(clientData.clients.join(', '));
  const [artistsInput, setArtistsInput] = useState(clientData.artists.join(', '));

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1111') {
      setIsAuthenticated(true);
    } else {
      alert('비밀번호가 틀렸습니다.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'project' | 'home') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'project') setLocalThumbnail(reader.result as string);
        else {
          setLocalHomeImage(reader.result as string);
          setHomeDraft(p => ({ ...p, heroImage: reader.result as string }));
        }
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

  const handleMoveProject = (index: number, direction: 'up' | 'down') => {
    const newProjects = [...projects];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newProjects.length) return;
    
    [newProjects[index], newProjects[targetIndex]] = [newProjects[targetIndex], newProjects[index]];
    reorderProjects(newProjects);
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategoryName.trim()) {
      addCategory(newCategoryName.trim());
      setNewCategoryName('');
      alert('카테고리가 추가되었습니다.');
    }
  };

  const handleSaveHome = (e: React.FormEvent) => {
    e.preventDefault();
    updateHome(homeDraft);
    alert('Home 정보가 수정되었습니다.');
  };

  const handleSaveAbout = (e: React.FormEvent) => {
    e.preventDefault();
    updateAbout(aboutDraft);
    alert('About 정보가 수정되었습니다.');
  };

  const handleSaveClients = (e: React.FormEvent) => {
    e.preventDefault();
    const newClients = clientsInput.split(',').map(s => s.trim()).filter(Boolean);
    const newArtists = artistsInput.split(',').map(s => s.trim()).filter(Boolean);
    updateClients({ clients: newClients, artists: newArtists });
    alert('클라이언트/아티스트 정보가 수정되었습니다.');
  };

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    updateContact(contactDraft);
    alert('연락처 정보가 수정되었습니다.');
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

  const tabs: AdminTab[] = ['PROJECTS', 'CATEGORIES', 'HOME', 'ABOUT', 'CLIENTS', 'CONTACT'];

  return (
    <div className="pt-32 pb-32 px-6 md:px-12 bg-[#000] min-h-screen text-white">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/10 pb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter uppercase">ADMIN DASHBOARD</h1>
            <p className="text-[10px] text-[#555] tracking-widest mt-1 uppercase">Management Mode</p>
          </div>
          <div className="flex gap-6 items-center">
            <Link to="/" className="text-[10px] tracking-widest text-[#555] hover:text-white transition-colors">GO TO SITE</Link>
            <button onClick={() => setIsAuthenticated(false)} className="bg-zinc-900 text-[10px] tracking-widest px-6 py-2 hover:bg-zinc-800 transition-colors uppercase font-bold">LOGOUT</button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-4 border-b border-white/5 pb-4">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-[10px] tracking-[0.2em] px-4 py-2 uppercase transition-all ${
                activeTab === tab ? 'text-white border-b-2 border-white' : 'text-[#555] hover:text-[#AAAAAA]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="pt-8">
          {activeTab === 'PROJECTS' && (
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
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <AdminInput name="year" label="YEAR" defaultValue={editingProject?.year} />
                    <AdminInput name="role" label="ROLE" defaultValue={editingProject?.role} />
                  </div>
                  <AdminInput name="camera" label="CAMERA" defaultValue={editingProject?.camera} />
                  <AdminInput name="videoUrl" label="VIMEO URL (PLAYER LINK)" defaultValue={editingProject?.videoUrl} />
                  <div className="space-y-2">
                    <label className="text-[9px] text-[#555] uppercase tracking-widest font-bold">THUMBNAIL IMAGE</label>
                    <div className="flex flex-col gap-3">
                      {(localThumbnail || editingProject?.thumbnail) && (
                        <div className="w-full aspect-video bg-zinc-900 border border-white/5 overflow-hidden">
                          <img src={localThumbnail || editingProject?.thumbnail} className="w-full h-full object-cover grayscale" alt="Preview" />
                        </div>
                      )}
                      <input type="file" accept="image/*" ref={fileInputRef} onChange={(e) => handleFileChange(e, 'project')} className="text-[10px] text-[#555] file:mr-4 file:py-2 file:px-4 file:border-0 file:text-[10px] file:font-bold file:tracking-widest file:bg-zinc-800 file:text-white cursor-pointer" />
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
                <div className="flex justify-between items-end mb-8">
                  <h2 className="text-[11px] tracking-[0.3em] text-[#AAAAAA] uppercase font-bold">PROJECT LIST ({projects.length})</h2>
                  <p className="text-[9px] text-[#555] uppercase tracking-widest">ORDER: RECENT (TOP) TO OLD (BOTTOM)</p>
                </div>
                <div className="space-y-3">
                  {projects.length === 0 && <p className="text-[#555] text-xs py-20 text-center border border-dashed border-white/10 uppercase tracking-widest">No projects added yet.</p>}
                  {projects.map((p, index) => (
                    <div key={p.id} className="bg-zinc-950 p-5 flex justify-between items-center group hover:border-white/20 border border-white/5 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col gap-1 pr-2 border-r border-white/5 mr-2">
                          <button 
                            disabled={index === 0}
                            onClick={() => handleMoveProject(index, 'up')}
                            className={`text-[12px] ${index === 0 ? 'text-zinc-800' : 'text-[#555] hover:text-white'} transition-colors`}
                          >
                            ▲
                          </button>
                          <button 
                            disabled={index === projects.length - 1}
                            onClick={() => handleMoveProject(index, 'down')}
                            className={`text-[12px] ${index === projects.length - 1 ? 'text-zinc-800' : 'text-[#555] hover:text-white'} transition-colors`}
                          >
                            ▼
                          </button>
                        </div>
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
                        <button onClick={() => { setEditingProject(p); setActiveTab('PROJECTS'); window.scrollTo(0,0); }} className="text-[10px] tracking-widest text-[#555] hover:text-white uppercase font-bold transition-colors">Edit</button>
                        <button onClick={() => { if(confirm('정말 삭제하시겠습니까?')) deleteProject(p.id); }} className="text-[10px] tracking-widest text-zinc-800 hover:text-red-500 uppercase font-bold transition-colors">Del</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'CATEGORIES' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="bg-zinc-950 p-8 border border-white/5 rounded-sm h-fit">
                <h2 className="text-[11px] tracking-[0.3em] text-white mb-8 uppercase font-bold border-b border-white/10 pb-4">ADD CATEGORY</h2>
                <form onSubmit={handleAddCategory} className="space-y-5">
                  <AdminInput 
                    label="CATEGORY NAME" 
                    defaultValue={newCategoryName} 
                    onChange={v => setNewCategoryName(v)}
                    required 
                  />
                  <button type="submit" className="w-full bg-white text-black py-4 text-[10px] font-bold tracking-[0.2em] uppercase">
                    ADD CATEGORY
                  </button>
                </form>
              </div>
              <div>
                <h2 className="text-[11px] tracking-[0.3em] text-[#AAAAAA] mb-8 uppercase font-bold">EXISTING CATEGORIES</h2>
                <div className="space-y-3">
                  {categories.map(cat => (
                    <div key={cat} className="bg-zinc-950 p-5 flex justify-between items-center border border-white/5">
                      <span className="text-sm tracking-widest uppercase">{cat}</span>
                      <button 
                        onClick={() => { if(confirm('정말 삭제하시겠습니까?')) deleteCategory(cat); }}
                        className="text-[10px] tracking-widest text-zinc-800 hover:text-red-500 uppercase font-bold transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'HOME' && (
            <section className="bg-zinc-950 p-8 border border-white/5 max-w-2xl mx-auto">
              <h2 className="text-[11px] tracking-[0.3em] text-white mb-8 uppercase font-bold border-b border-white/10 pb-4">HOME SETTINGS</h2>
              <form onSubmit={handleSaveHome} className="space-y-6">
                <AdminInput label="HERO VIDEO URL (MP4)" defaultValue={home.heroVideo} onChange={v => setHomeDraft(p => ({...p, heroVideo: v}))} />
                
                <div className="space-y-2">
                    <label className="text-[9px] text-[#555] uppercase tracking-widest font-bold">HERO BACKGROUND IMAGE</label>
                    <div className="flex flex-col gap-3">
                      {(localHomeImage || home.heroImage) && (
                        <div className="w-full aspect-video bg-zinc-900 border border-white/5 overflow-hidden">
                          <img src={localHomeImage || home.heroImage} className="w-full h-full object-cover grayscale" alt="Home Hero Preview" />
                        </div>
                      )}
                      <input type="file" accept="image/*" ref={homeImageInputRef} onChange={(e) => handleFileChange(e, 'home')} className="text-[10px] text-[#555] file:mr-4 file:py-2 file:px-4 file:border-0 file:text-[10px] file:font-bold file:tracking-widest file:bg-zinc-800 file:text-white cursor-pointer" />
                      <AdminInput label="OR IMAGE URL" defaultValue={home.heroImage} onChange={v => setHomeDraft(p => ({...p, heroImage: v}))} />
                    </div>
                </div>

                <AdminInput label="HERO TITLE" defaultValue={home.title} onChange={v => setHomeDraft(p => ({...p, title: v}))} />
                <AdminInput label="HERO SUBTITLE" defaultValue={home.subtitle} onChange={v => setHomeDraft(p => ({...p, subtitle: v}))} />
                <AdminInput label="LOCATION TEXT" defaultValue={home.location} onChange={v => setHomeDraft(p => ({...p, location: v}))} />
                <div className="space-y-1">
                  <label className="text-[9px] text-[#555] uppercase tracking-widest font-bold">HERO CATEGORIES (Comma separated)</label>
                  <input 
                    className="w-full bg-zinc-900 border border-white/10 p-3 text-xs outline-none focus:border-white/30 text-white"
                    defaultValue={home.categories.join(', ')} 
                    onChange={e => setHomeDraft(p => ({...p, categories: e.target.value.split(',').map(s => s.trim())}))} 
                  />
                </div>
                <button type="submit" className="w-full bg-white text-black py-4 text-[10px] font-bold tracking-[0.2em] uppercase">SAVE HOME SETTINGS</button>
              </form>
            </section>
          )}

          {activeTab === 'ABOUT' && (
            <section className="bg-zinc-950 p-8 border border-white/5 max-w-3xl mx-auto">
              <h2 className="text-[11px] tracking-[0.3em] text-white mb-8 uppercase font-bold border-b border-white/10 pb-4">ABOUT SETTINGS</h2>
              <form onSubmit={handleSaveAbout} className="space-y-6">
                <AdminInput label="PROFILE IMAGE URL" defaultValue={about.profileImage} onChange={v => setAboutDraft(p => ({...p, profileImage: v}))} />
                <div className="space-y-1">
                  <label className="text-[9px] text-[#555] uppercase tracking-widest font-bold">BIO PARAGRAPH 1 (LARGE TEXT)</label>
                  <textarea 
                    className="w-full bg-zinc-900 border border-white/10 p-4 text-xs outline-none focus:border-white/30 text-white min-h-[100px]"
                    defaultValue={about.description1} 
                    onChange={e => setAboutDraft(p => ({...p, description1: e.target.value}))}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] text-[#555] uppercase tracking-widest font-bold">BIO PARAGRAPH 2 (SMALL TEXT)</label>
                  <textarea 
                    className="w-full bg-zinc-900 border border-white/10 p-4 text-xs outline-none focus:border-white/30 text-white min-h-[150px]"
                    defaultValue={about.description2} 
                    onChange={e => setAboutDraft(p => ({...p, description2: e.target.value}))}
                  />
                </div>
                <AdminInput label="GEAR LIST" defaultValue={about.gearList} onChange={v => setAboutDraft(p => ({...p, gearList: v}))} />
                <button type="submit" className="w-full bg-white text-black py-4 text-[10px] font-bold tracking-[0.2em] uppercase">SAVE ABOUT SETTINGS</button>
              </form>
            </section>
          )}

          {activeTab === 'CLIENTS' && (
            <section className="bg-zinc-950 p-8 border border-white/5 max-w-3xl mx-auto">
              <h2 className="text-[11px] tracking-[0.3em] text-white mb-8 uppercase font-bold border-b border-white/10 pb-4">CLIENTS & ARTISTS</h2>
              <form onSubmit={handleSaveClients} className="space-y-8">
                <div className="space-y-1">
                  <label className="text-[9px] text-[#555] uppercase tracking-widest font-bold">ARTIST NAMES (Comma separated)</label>
                  <textarea 
                    className="w-full bg-zinc-900 border border-white/10 p-4 text-xs outline-none focus:border-white/30 text-white min-h-[150px]"
                    value={artistsInput} 
                    onChange={e => setArtistsInput(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] text-[#555] uppercase tracking-widest font-bold">CLIENT NAMES (Comma separated)</label>
                  <textarea 
                    className="w-full bg-zinc-900 border border-white/10 p-4 text-xs outline-none focus:border-white/30 text-white min-h-[150px]"
                    value={clientsInput} 
                    onChange={e => setClientsInput(e.target.value)}
                  />
                </div>
                <button type="submit" className="w-full bg-white text-black py-4 text-[10px] font-bold tracking-[0.2em] uppercase">SAVE LISTS</button>
              </form>
            </section>
          )}

          {activeTab === 'CONTACT' && (
            <section className="bg-zinc-950 p-8 border border-white/5 max-w-2xl mx-auto">
              <h2 className="text-[11px] tracking-[0.3em] text-white mb-8 uppercase font-bold border-b border-white/10 pb-4">CONTACT INFO</h2>
              <form onSubmit={handleSaveContact} className="space-y-6">
                <AdminInput label="EMAIL" defaultValue={contact.email} onChange={v => setContactDraft(p => ({...p, email: v}))} />
                <AdminInput label="INSTAGRAM" defaultValue={contact.instagram} onChange={v => setContactDraft(p => ({...p, instagram: v}))} />
                <AdminInput label="VIMEO URL" defaultValue={contact.vimeo} onChange={v => setContactDraft(p => ({...p, vimeo: v}))} />
                <AdminInput label="PHONE" defaultValue={contact.phone} onChange={v => setContactDraft(p => ({...p, phone: v}))} />
                <button type="submit" className="w-full bg-white text-black py-4 text-[10px] font-bold tracking-[0.2em] uppercase">SAVE CONTACT INFO</button>
              </form>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

const AdminInput: React.FC<{ label: string; defaultValue?: string; required?: boolean; onChange?: (v: string) => void; name?: string }> = ({ label, defaultValue, required, onChange, name }) => (
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
