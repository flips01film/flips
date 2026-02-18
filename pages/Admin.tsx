
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  useProjectStore, 
  useContactStore, 
  useHomeStore, 
  useAboutStore, 
  useClientStore,
  useCategoryStore,
  exportAppData,
  syncAppData
} from '../store';
import { Project, ContactInfo, HomeInfo, AboutInfo, Category } from '../types';

type AdminTab = 'PROJECTS' | 'CATEGORIES' | 'HOME' | 'ABOUT' | 'CLIENTS' | 'CONTACT' | 'SYNC';

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<AdminTab>('PROJECTS');
  
  const { projects, addProject, updateProject, deleteProject, moveProject } = useProjectStore();
  const { contact, updateContact } = useContactStore();
  const { home, updateHome } = useHomeStore();
  const { about, updateAbout } = useAboutStore();
  const { clientData, updateClients } = useClientStore();
  const { categories, addCategory, deleteCategory } = useCategoryStore();

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [thumbnailInput, setThumbnailInput] = useState<string>('');
  
  // Local drafts for forms to prevent unnecessary store updates during typing
  const [contactDraft, setContactDraft] = useState<ContactInfo>(contact);
  const [homeDraft, setHomeDraft] = useState<HomeInfo>(home);
  const [homeHeroImageBase64, setHomeHeroImageBase64] = useState<string>(home.heroImage);
  const [homeCategoriesInput, setHomeCategoriesInput] = useState(home.categories.join(', '));
  
  const [aboutDraft, setAboutDraft] = useState<AboutInfo>(about);
  const [aboutProfileBase64, setAboutProfileBase64] = useState<string>(about.profileImage);
  
  const [artistsInput, setArtistsInput] = useState(clientData.artists.join(', '));
  const [clientsInput, setClientsInput] = useState(clientData.clients.join(', '));
  
  const [newCatInput, setNewCatInput] = useState('');
  const [syncInput, setSyncInput] = useState('');

  useEffect(() => {
    if (editingProject) {
      setThumbnailInput(editingProject.thumbnail || '');
    } else {
      setThumbnailInput('');
    }
  }, [editingProject]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '6718') setIsAuthenticated(true);
    else alert('Wrong password');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, target: 'thumbnail' | 'about' | 'home') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        if (target === 'thumbnail') setThumbnailInput(base64);
        else if (target === 'about') {
          setAboutProfileBase64(base64);
          setAboutDraft(prev => ({ ...prev, profileImage: base64 }));
        } else if (target === 'home') {
          setHomeHeroImageBase64(base64);
          setHomeDraft(prev => ({ ...prev, heroImage: base64 }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProjectSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (!thumbnailInput) return alert('Please provide a thumbnail (URL or Upload).');

    const data: Partial<Project> = {
      artist: formData.get('artist') as string,
      title: formData.get('title') as string,
      client: formData.get('client') as string,
      production: formData.get('production') as string,
      category: formData.get('category') as Category,
      role: formData.get('role') as string,
      camera: formData.get('camera') as string,
      year: formData.get('year') as string,
      videoUrl: formData.get('videoUrl') as string,
      thumbnail: thumbnailInput,
      isSelectedWork: formData.get('isSelectedWork') === 'on',
    };

    if (editingProject) {
      updateProject(editingProject.id, { ...editingProject, ...data } as Project);
      setEditingProject(null);
    } else {
      addProject({ ...data as Project, id: Date.now().toString() });
    }
    e.currentTarget.reset();
    setThumbnailInput('');
    alert('Project Saved');
  };

  if (!isAuthenticated) {
    return (
      <div className="h-screen flex items-center justify-center bg-black px-6">
        <form onSubmit={handleLogin} className="max-w-sm w-full space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-extrabold tracking-tighter uppercase">ADMIN</h1>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-zinc-950 border border-white/10 py-4 px-4 outline-none text-center tracking-[1em] focus:border-white/30 text-white"
            autoFocus
          />
          <button type="submit" className="w-full bg-white text-black py-4 text-[10px] font-bold tracking-[0.3em] uppercase">Access Dashboard</button>
        </form>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-40 pb-40 px-6 md:px-12 bg-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto space-y-12">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tighter uppercase">Dashboard</h1>
          <div className="flex gap-6 items-center">
            <Link to="/" className="text-[10px] tracking-widest text-[#555] hover:text-white font-bold uppercase">View Site</Link>
            <button onClick={() => setIsAuthenticated(false)} className="bg-zinc-900 px-6 py-3 text-[10px] font-bold tracking-widest uppercase">Logout</button>
          </div>
        </header>

        <nav className="flex flex-wrap gap-4 md:gap-10 border-b border-white/5 pb-4 overflow-x-auto no-scrollbar">
          {(['PROJECTS', 'CATEGORIES', 'HOME', 'ABOUT', 'CLIENTS', 'CONTACT', 'SYNC'] as AdminTab[]).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-[10px] tracking-widest uppercase py-2 border-b-2 transition-all ${
                activeTab === tab ? 'text-white border-white' : 'text-[#555] border-transparent'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>

        <main className="min-h-[500px]">
          {activeTab === 'PROJECTS' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-5 bg-zinc-950 p-6 md:p-10 rounded-sm border border-white/5 h-fit sticky top-24">
                <form onSubmit={handleProjectSave} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <AdminInput name="artist" label="Artist" defaultValue={editingProject?.artist} required />
                    <AdminInput name="title" label="Title" defaultValue={editingProject?.title} required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] text-[#555] font-bold uppercase tracking-widest">Category</label>
                    <select name="category" defaultValue={editingProject?.category} className="w-full bg-zinc-900 border border-white/10 p-4 text-xs text-white outline-none focus:border-white/30 uppercase tracking-widest">
                      {[ ...categories].map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <AdminInput name="year" label="Year" defaultValue={editingProject?.year} />
                    <AdminInput name="role" label="Role" defaultValue={editingProject?.role} />
                  </div>
                  <AdminInput name="camera" label="Camera" defaultValue={editingProject?.camera} />
                  <AdminInput name="videoUrl" label="Video URL" defaultValue={editingProject?.videoUrl} />
                  
                  <div className="space-y-4 pt-4 border-t border-white/5">
                    <h3 className="text-[10px] tracking-widest font-bold uppercase text-white/40">Thumbnail Setting</h3>
                    <div className="space-y-2">
                      <label className="text-[9px] text-[#555] uppercase tracking-widest font-bold">Thumbnail URL</label>
                      <input 
                        type="text" 
                        value={thumbnailInput} 
                        onChange={(e) => setThumbnailInput(e.target.value)} 
                        placeholder="https://example.com/image.jpg"
                        className="w-full bg-zinc-900 border border-white/10 p-4 text-xs text-white outline-none focus:border-white/30 tracking-widest"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] text-[#555] uppercase tracking-widest font-bold">Or Upload File</label>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => handleFileChange(e, 'thumbnail')} 
                        className="w-full bg-zinc-900 border border-white/10 p-4 text-[9px] file:bg-white file:text-black file:border-none file:px-2 file:py-1 file:mr-4 font-bold" 
                      />
                    </div>
                    {thumbnailInput && (
                      <div className="space-y-2">
                        <label className="text-[9px] text-[#555] uppercase tracking-widest font-bold">Preview</label>
                        <img src={thumbnailInput} className="w-full aspect-video object-cover border border-white/10" alt="Thumbnail Preview" />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4 bg-zinc-900/50 p-4 border border-white/5">
                    <input type="checkbox" name="isSelectedWork" id="featured" defaultChecked={editingProject?.isSelectedWork} className="w-5 h-5 accent-white" />
                    <label htmlFor="featured" className="text-[10px] tracking-widest uppercase font-bold text-[#AAA]">Feature on Home</label>
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" className="flex-grow bg-white text-black py-4 text-xs font-bold tracking-widest uppercase">{editingProject ? 'Update' : 'Publish'}</button>
                    {editingProject && (
                      <button type="button" onClick={() => { setEditingProject(null); setThumbnailInput(''); }} className="bg-zinc-800 text-white px-6 text-xs font-bold uppercase">Cancel</button>
                    )}
                  </div>
                </form>
              </div>
              <div className="lg:col-span-7 space-y-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-[10px] tracking-[0.3em] text-[#555] font-bold uppercase">Project List ({projects.length})</h2>
                  <p className="text-[8px] text-[#333] tracking-widest uppercase">Use arrows to reorder</p>
                </div>
                {projects.map((p, idx) => (
                  <div key={p.id} className="bg-zinc-950 p-5 flex justify-between items-center border border-white/5 group hover:border-white/20 transition-all">
                    <div className="flex items-center gap-6">
                      <div className="flex flex-col gap-1">
                        <button 
                          disabled={idx === 0} 
                          onClick={() => moveProject(p.id, 'up')}
                          className={`text-xs ${idx === 0 ? 'text-zinc-800' : 'text-[#555] hover:text-white'}`}
                        >▲</button>
                        <button 
                          disabled={idx === projects.length - 1} 
                          onClick={() => moveProject(p.id, 'down')}
                          className={`text-xs ${idx === projects.length - 1 ? 'text-zinc-800' : 'text-[#555] hover:text-white'}`}
                        >▼</button>
                      </div>
                      <img src={p.thumbnail} className="w-16 md:w-20 aspect-video object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
                      <div>
                        <p className="text-[9px] text-[#555] uppercase tracking-widest">{p.category} | {p.year}</p>
                        <h3 className="text-xs font-bold uppercase truncate max-w-[150px] md:max-w-none">{p.artist} — {p.title}</h3>
                        {p.isSelectedWork && <span className="text-[8px] text-white/30 border border-white/10 px-1 mt-1 inline-block uppercase tracking-tighter">Featured</span>}
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button onClick={() => { setEditingProject(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-[9px] text-[#AAA] hover:text-white uppercase font-bold tracking-widest">Edit</button>
                      <button onClick={() => { if(confirm('Delete project?')) deleteProject(p.id); }} className="text-[9px] text-red-900 hover:text-red-500 uppercase font-bold tracking-widest">Del</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'CATEGORIES' && (
            <div className="max-w-xl bg-zinc-950 p-8 border border-white/5 space-y-10">
              <div className="flex gap-4">
                <input value={newCatInput} onChange={e => setNewCatInput(e.target.value)} placeholder="NEW CATEGORY" className="flex-grow bg-zinc-900 border border-white/10 p-4 text-xs uppercase tracking-widest" />
                <button onClick={() => { if(newCatInput) { addCategory(newCatInput.toUpperCase()); setNewCatInput(''); }}} className="bg-white text-black px-6 text-[10px] font-bold uppercase">Add</button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {categories.map(c => (
                  <div key={c} className="bg-zinc-900 p-4 flex justify-between items-center text-[10px] uppercase border border-white/5 group">
                    <span className="truncate">{c}</span>
                    <button onClick={() => deleteCategory(c)} className="text-red-900 opacity-0 group-hover:opacity-100 transition-opacity">Del</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'HOME' && (
            <div className="max-w-xl bg-zinc-950 p-8 border border-white/5 space-y-8">
              <div className="space-y-4">
                <label className="text-[9px] text-[#555] uppercase tracking-widest font-bold">Background Hero Image</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => handleFileChange(e, 'home')} 
                  className="w-full bg-zinc-900 border border-white/10 p-4 text-[9px] file:bg-white file:text-black file:border-none file:px-2 file:py-1 file:mr-4 font-bold" 
                />
                {homeHeroImageBase64 && (
                  <img src={homeHeroImageBase64} className="w-full aspect-video object-cover border border-white/10" alt="Home Hero Preview" />
                )}
              </div>
              <AdminInput label="Title" defaultValue={homeDraft.title} onChange={v => setHomeDraft({...homeDraft, title: v})} />
              <AdminInput label="Subtitle" defaultValue={homeDraft.subtitle} onChange={v => setHomeDraft({...homeDraft, subtitle: v})} />
              <AdminInput label="Location" defaultValue={homeDraft.location} onChange={v => setHomeDraft({...homeDraft, location: v})} />
              <div className="space-y-2">
                <label className="text-[9px] text-[#555] uppercase tracking-widest font-bold">Hero Categories (Comma Separated)</label>
                <textarea 
                  value={homeCategoriesInput} 
                  onChange={e => setHomeCategoriesInput(e.target.value)} 
                  className="w-full bg-zinc-900 border border-white/10 p-4 text-xs text-white outline-none focus:border-white/30 uppercase tracking-widest h-24"
                />
              </div>
              <button onClick={() => { 
                updateHome({
                  ...homeDraft, 
                  categories: homeCategoriesInput.split(',').map(s => s.trim()).filter(s => s !== '')
                }); 
                alert('Home updated.'); 
              }} className="w-full bg-white text-black py-4 text-xs font-bold uppercase">Apply</button>
            </div>
          )}

          {activeTab === 'ABOUT' && (
            <div className="max-w-xl bg-zinc-950 p-8 border border-white/5 space-y-8">
              <div className="space-y-4">
                <label className="text-[9px] text-[#555] uppercase tracking-widest font-bold">Profile Image</label>
                <input type="file" accept="image/*" onChange={e => handleFileChange(e, 'about')} className="w-full bg-zinc-900 border border-white/10 p-4 text-[9px] file:bg-white file:text-black file:border-none file:px-2 file:py-1 font-bold" />
                {aboutProfileBase64 && <img src={aboutProfileBase64} className="w-32 aspect-[4/5] object-cover border border-white/10" />}
              </div>
              <AdminInput label="Image Size Width (%)" defaultValue={aboutDraft.profileImageSize?.toString()} onChange={v => setAboutDraft({...aboutDraft, profileImageSize: parseInt(v) || 100})} />
              <div className="space-y-2">
                <label className="text-[9px] text-[#555] uppercase tracking-widest font-bold">Description (Bold)</label>
                <textarea value={aboutDraft.description1} onChange={e => setAboutDraft({...aboutDraft, description1: e.target.value})} className="w-full bg-zinc-900 border border-white/10 p-4 text-xs h-32" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] text-[#555] uppercase tracking-widest font-bold">Description (Light)</label>
                <textarea value={aboutDraft.description2} onChange={e => setAboutDraft({...aboutDraft, description2: e.target.value})} className="w-full bg-zinc-900 border border-white/10 p-4 text-xs h-32" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] text-[#555] uppercase tracking-widest font-bold">Gear List</label>
                <textarea value={aboutDraft.gearList} onChange={e => setAboutDraft({...aboutDraft, gearList: e.target.value})} className="w-full bg-zinc-900 border border-white/10 p-4 text-xs h-24" />
              </div>
              <button onClick={() => { updateAbout(aboutDraft); alert('About saved.'); }} className="w-full bg-white text-black py-4 text-xs font-bold uppercase">Save About</button>
            </div>
          )}

          {activeTab === 'CLIENTS' && (
            <div className="max-w-xl bg-zinc-950 p-8 border border-white/5 space-y-8">
              <div className="space-y-2">
                <label className="text-[9px] text-[#555] uppercase tracking-widest font-bold">Artists (Comma Separated)</label>
                <textarea value={artistsInput} onChange={e => setArtistsInput(e.target.value)} className="w-full bg-zinc-900 border border-white/10 p-4 text-xs h-40" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] text-[#555] uppercase tracking-widest font-bold">Clients (Comma Separated)</label>
                <textarea value={clientsInput} onChange={e => setClientsInput(e.target.value)} className="w-full bg-zinc-900 border border-white/10 p-4 text-xs h-40" />
              </div>
              <button onClick={() => { 
                updateClients({
                  artists: artistsInput.split(',').map(s=>s.trim()).filter(s => s !== ''), 
                  clients: clientsInput.split(',').map(s=>s.trim()).filter(s => s !== '')
                });
                alert('Clients updated.');
              }} className="w-full bg-white text-black py-4 text-xs font-bold uppercase">Update Lists</button>
            </div>
          )}

          {activeTab === 'CONTACT' && (
            <div className="max-w-xl bg-zinc-950 p-8 border border-white/5 space-y-6">
              <AdminInput label="Email" defaultValue={contactDraft.email} onChange={v => setContactDraft({...contactDraft, email: v})} />
              <AdminInput label="Instagram Handle" defaultValue={contactDraft.instagram} onChange={v => setContactDraft({...contactDraft, instagram: v})} />
              <AdminInput label="Vimeo Portfolio" defaultValue={contactDraft.vimeo} onChange={v => setContactDraft({...contactDraft, vimeo: v})} />
              <AdminInput label="Phone Number" defaultValue={contactDraft.phone} onChange={v => setContactDraft({...contactDraft, phone: v})} />
              <button onClick={() => { updateContact(contactDraft); alert('Contact updated.'); }} className="w-full bg-white text-black py-4 text-xs font-bold uppercase">Update Contact Info</button>
            </div>
          )}

          {activeTab === 'SYNC' && (
            <div className="max-w-xl bg-zinc-950 p-8 border border-white/5 space-y-12">
              <div className="space-y-4">
                <h2 className="text-xs font-bold uppercase tracking-widest">1. Export Sync Code</h2>
                <textarea 
                  readOnly 
                  value={exportAppData()} 
                  className="w-full bg-black border border-white/10 p-4 text-[8px] h-32 text-zinc-600 outline-none"
                  onClick={(e) => (e.target as HTMLTextAreaElement).select()}
                />
                <button onClick={() => { navigator.clipboard.writeText(exportAppData()); alert('Code Copied!'); }} className="w-full bg-zinc-900 text-white py-4 text-[10px] font-bold uppercase tracking-widest">Copy Sync Code</button>
              </div>
              <div className="space-y-4 pt-8 border-t border-white/5">
                <h2 className="text-xs font-bold uppercase tracking-widest">2. Import Sync Code</h2>
                <textarea 
                  value={syncInput} 
                  onChange={e => setSyncInput(e.target.value)} 
                  placeholder="PASTE SYNC CODE HERE"
                  className="w-full bg-black border border-white/10 p-4 text-[8px] h-32 text-white outline-none focus:border-white/30"
                />
                <button onClick={() => syncAppData(syncInput)} className="w-full bg-white text-black py-4 text-[10px] font-bold uppercase tracking-widest">Update Device Data</button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

const AdminInput: React.FC<{ label: string; defaultValue?: string; required?: boolean; onChange?: (v: string) => void; name?: string }> = ({ label, defaultValue, required, onChange, name }) => (
  <div className="space-y-2">
    <label className="text-[9px] text-[#555] uppercase tracking-widest font-bold">{label}</label>
    <input name={name} defaultValue={defaultValue} required={required} onChange={(e) => onChange && onChange(e.target.value)} className="w-full bg-zinc-900 border border-white/10 p-4 text-xs text-white outline-none focus:border-white/30 uppercase tracking-widest" />
  </div>
);

export default Admin;
