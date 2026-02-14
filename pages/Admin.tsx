
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  useProjectStore, 
  useContactStore, 
  useHomeStore, 
  useAboutStore, 
  useClientStore,
  useCategoryStore
} from '../store';
import { Project, ContactInfo, HomeInfo, AboutInfo, Category } from '../types';

type AdminTab = 'PROJECTS' | 'CATEGORIES' | 'HOME' | 'ABOUT' | 'CLIENTS' | 'CONTACT';

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<AdminTab>('PROJECTS');
  
  const { projects, addProject, updateProject, deleteProject } = useProjectStore();
  const { contact, updateContact } = useContactStore();
  const { home, updateHome } = useHomeStore();
  const { about, updateAbout } = useAboutStore();
  const { clientData, updateClients } = useClientStore();
  const { categories, addCategory, deleteCategory } = useCategoryStore();

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  
  // Local drafts for forms
  const [contactDraft, setContactDraft] = useState<ContactInfo>(contact);
  const [homeDraft, setHomeDraft] = useState<HomeInfo>(home);
  const [aboutDraft, setAboutDraft] = useState<AboutInfo>(about);
  const [artistsInput, setArtistsInput] = useState(clientData.artists.join(', '));
  const [clientsInput, setClientsInput] = useState(clientData.clients.join(', '));
  const [newCatInput, setNewCatInput] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1111') {
      setIsAuthenticated(true);
    } else {
      alert('Wrong password');
    }
  };

  const handleProjectSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
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
      thumbnail: formData.get('thumbnailUrl') as string,
      isSelectedWork: formData.get('isSelectedWork') === 'on',
    };

    if (editingProject) {
      updateProject(editingProject.id, { ...editingProject, ...data } as Project);
      setEditingProject(null);
    } else {
      addProject({ ...data as Project, id: Date.now().toString() });
    }
    
    e.currentTarget.reset();
    alert('Project Saved Successfully');
  };

  if (!isAuthenticated) {
    return (
      <div className="h-screen flex items-center justify-center bg-black px-6">
        <form onSubmit={handleLogin} className="max-w-sm w-full space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-extrabold tracking-tighter uppercase">ADMIN</h1>
            <p className="text-[9px] text-[#555] tracking-[0.5em] font-bold uppercase">Enter Password: 1111</p>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="····"
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
      <div className="max-w-7xl mx-auto space-y-12 md:space-y-20">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tighter uppercase">Dashboard</h1>
          <div className="flex gap-6 items-center w-full md:w-auto">
            <Link to="/" className="text-[10px] tracking-widest text-[#555] hover:text-white font-bold uppercase">View Site</Link>
            <button onClick={() => setIsAuthenticated(false)} className="bg-zinc-900 px-6 py-3 text-[10px] font-bold tracking-widest uppercase">Logout</button>
          </div>
        </header>

        <nav className="flex flex-wrap gap-4 md:gap-10 border-b border-white/5 pb-4 overflow-x-auto no-scrollbar">
          {(['PROJECTS', 'CATEGORIES', 'HOME', 'ABOUT', 'CLIENTS', 'CONTACT'] as AdminTab[]).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-[10px] tracking-widest whitespace-nowrap uppercase py-2 border-b-2 transition-all ${
                activeTab === tab ? 'text-white border-white' : 'text-[#555] border-transparent hover:text-[#888]'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>

        <main className="min-h-[500px]">
          {activeTab === 'PROJECTS' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              {/* Left Column: Form */}
              <div className="lg:col-span-5 bg-zinc-950 p-6 md:p-10 rounded-sm border border-white/5">
                <h2 className="text-xs tracking-[0.4em] font-bold mb-8 uppercase text-[#888]">{editingProject ? 'Edit Project' : 'New Project'}</h2>
                <form onSubmit={handleProjectSave} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AdminInput name="artist" label="Artist Name" defaultValue={editingProject?.artist} required />
                    <AdminInput name="title" label="Work Title" defaultValue={editingProject?.title} required />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[9px] text-[#555] font-bold uppercase tracking-widest">Work Category</label>
                    <select name="category" defaultValue={editingProject?.category} className="w-full bg-zinc-900 border border-white/10 p-4 text-xs text-white outline-none focus:border-white/30 transition-all uppercase tracking-widest">
                      <option value="CONCERT">CONCERT</option>
                      <option value="MUSIC VIDEO">MUSIC VIDEO</option>
                      <option value="BROADCAST">BROADCAST</option>
                      <option value="COMMERCIAL">COMMERCIAL</option>
                      <option value="BEHIND THE SCENES">BEHIND THE SCENES</option>
                      {categories.filter(c => !['CONCERT','MUSIC VIDEO','BROADCAST','COMMERCIAL','BEHIND THE SCENES'].includes(c.toUpperCase())).map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <AdminInput name="year" label="Year" defaultValue={editingProject?.year} />
                    <AdminInput name="role" label="Role" defaultValue={editingProject?.role} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AdminInput name="client" label="Client" defaultValue={editingProject?.client} />
                    <AdminInput name="production" label="Production" defaultValue={editingProject?.production} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AdminInput name="camera" label="Camera" defaultValue={editingProject?.camera} />
                  </div>

                  <AdminInput name="videoUrl" label="Vimeo or YouTube URL" defaultValue={editingProject?.videoUrl} />
                  <AdminInput name="thumbnailUrl" label="Thumbnail Image URL" defaultValue={editingProject?.thumbnail} />

                  <div className="flex items-center gap-4 bg-zinc-900/50 p-4 border border-white/5 rounded-sm">
                    <input type="checkbox" name="isSelectedWork" id="featured" defaultChecked={editingProject?.isSelectedWork} className="w-5 h-5 accent-white" />
                    <label htmlFor="featured" className="text-[10px] tracking-widest uppercase font-bold text-[#AAA] cursor-pointer">Feature on Home Page</label>
                  </div>

                  <div className="pt-4 space-y-3">
                    <button type="submit" className="w-full bg-white text-black py-4 text-xs font-bold tracking-widest uppercase hover:bg-zinc-200 transition-colors">
                      {editingProject ? 'Update Project' : 'Publish Project'}
                    </button>
                    {editingProject && (
                      <button type="button" onClick={() => setEditingProject(null)} className="w-full bg-zinc-900 text-white py-4 text-xs font-bold tracking-widest uppercase hover:bg-zinc-800 transition-colors border border-white/5">
                        Cancel Edit
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Right Column: List */}
              <div className="lg:col-span-7 space-y-4">
                <h2 className="text-xs tracking-[0.4em] font-bold mb-8 uppercase text-[#888]">Manage Projects ({projects.length})</h2>
                <div className="grid gap-4">
                  {projects.map(p => (
                    <div key={p.id} className="bg-zinc-950 p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-white/5 hover:border-white/20 transition-all">
                      <div className="flex items-center gap-6 w-full">
                        <div className="w-20 md:w-24 aspect-video bg-zinc-900 shrink-0 overflow-hidden">
                          <img src={p.thumbnail} className="w-full h-full object-cover grayscale opacity-50" alt="" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] text-[#555] uppercase tracking-widest mb-1">{p.category} | {p.year}</p>
                          <h3 className="text-sm font-bold tracking-tight uppercase truncate">{p.artist} — {p.title}</h3>
                        </div>
                      </div>
                      <div className="flex gap-6 w-full md:w-auto justify-end">
                        <button onClick={() => { setEditingProject(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-[10px] text-[#AAA] hover:text-white uppercase font-bold tracking-widest">Edit</button>
                        <button onClick={() => { if(confirm('Are you sure you want to delete this project?')) deleteProject(p.id); }} className="text-[10px] text-red-900 hover:text-red-500 uppercase font-bold tracking-widest">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'CATEGORIES' && (
             <div className="max-w-2xl bg-zinc-950 p-8 border border-white/5 space-y-10 rounded-sm">
                <h2 className="text-xs tracking-[0.4em] font-bold uppercase text-[#888]">Work Categories</h2>
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <input 
                      value={newCatInput} 
                      onChange={e => setNewCatInput(e.target.value)} 
                      placeholder="Add New Category" 
                      className="flex-grow bg-zinc-900 border border-white/10 p-4 text-xs text-white outline-none focus:border-white/30 transition-all uppercase tracking-widest" 
                    />
                    <button onClick={() => { if(newCatInput) { addCategory(newCatInput.toUpperCase()); setNewCatInput(''); } }} className="bg-white text-black px-8 py-4 text-[10px] font-bold tracking-widest uppercase whitespace-nowrap">Add Category</button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {['CONCERT', 'MUSIC VIDEO', 'BROADCAST', 'COMMERCIAL', 'BEHIND THE SCENES'].map(fixed => (
                       <div key={fixed} className="bg-zinc-900/30 p-4 text-[9px] font-bold uppercase tracking-[0.2em] border border-white/5 text-[#444]">
                        {fixed} <span className="text-[8px] italic opacity-50">(Fixed)</span>
                      </div>
                    ))}
                    {categories.filter(c => !['CONCERT','MUSIC VIDEO','BROADCAST','COMMERCIAL','BEHIND THE SCENES'].includes(c.toUpperCase())).map(c => (
                      <div key={c} className="bg-zinc-900 p-4 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest border border-white/5 group">
                        {c}
                        <button onClick={() => deleteCategory(c)} className="text-red-900 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">Remove</button>
                      </div>
                    ))}
                  </div>
                </div>
             </div>
          )}

          {activeTab === 'HOME' && (
            <div className="max-w-2xl bg-zinc-950 p-8 border border-white/5 space-y-10 rounded-sm">
              <h2 className="text-xs tracking-[0.4em] font-bold uppercase text-[#888]">Home Landing Configuration</h2>
              <div className="space-y-6">
                <AdminInput label="Background Video URL (.mp4)" defaultValue={homeDraft.heroVideo} onChange={v => setHomeDraft({...homeDraft, heroVideo: v})} />
                <AdminInput label="Overlay Title" defaultValue={homeDraft.title} onChange={v => setHomeDraft({...homeDraft, title: v})} />
                <AdminInput label="Subtitle Text" defaultValue={homeDraft.subtitle} onChange={v => setHomeDraft({...homeDraft, subtitle: v})} />
                <AdminInput label="Location Label" defaultValue={homeDraft.location} onChange={v => setHomeDraft({...homeDraft, location: v})} />
                <button onClick={() => { updateHome(homeDraft); alert('Home settings updated.'); }} className="w-full bg-white text-black py-4 text-xs font-bold tracking-widest uppercase hover:bg-zinc-200 transition-colors">Apply Changes</button>
              </div>
            </div>
          )}

          {activeTab === 'ABOUT' && (
            <div className="max-w-2xl bg-zinc-950 p-8 border border-white/5 space-y-10 rounded-sm">
              <h2 className="text-xs tracking-[0.4em] font-bold uppercase text-[#888]">About Profile Configuration</h2>
              <div className="space-y-8">
                <AdminInput label="Profile Image URL" defaultValue={aboutDraft.profileImage} onChange={v => setAboutDraft({...aboutDraft, profileImage: v})} />
                <div className="space-y-2">
                  <label className="text-[9px] text-[#555] font-bold uppercase tracking-widest">Main Description (Bold)</label>
                  <textarea value={aboutDraft.description1} onChange={e => setAboutDraft({...aboutDraft, description1: e.target.value})} className="w-full bg-zinc-900 border border-white/10 p-4 text-xs text-white outline-none focus:border-white/30 transition-all min-h-[120px] leading-relaxed" />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] text-[#555] font-bold uppercase tracking-widest">Secondary Description (Light)</label>
                  <textarea value={aboutDraft.description2} onChange={e => setAboutDraft({...aboutDraft, description2: e.target.value})} className="w-full bg-zinc-900 border border-white/10 p-4 text-xs text-white outline-none focus:border-white/30 transition-all min-h-[120px] leading-relaxed" />
                </div>
                <AdminInput label="Technical Equipment List" defaultValue={aboutDraft.gearList} onChange={v => setAboutDraft({...aboutDraft, gearList: v})} />
                <button onClick={() => { updateAbout(aboutDraft); alert('Profile updated.'); }} className="w-full bg-white text-black py-4 text-xs font-bold tracking-widest uppercase hover:bg-zinc-200 transition-colors">Save Profile</button>
              </div>
            </div>
          )}

          {activeTab === 'CLIENTS' && (
            <div className="max-w-2xl bg-zinc-950 p-8 border border-white/5 space-y-10 rounded-sm">
              <h2 className="text-xs tracking-[0.4em] font-bold uppercase text-[#888]">Associated Artists & Clients</h2>
              <div className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[9px] text-[#555] font-bold uppercase tracking-widest">Artist Roster (Comma separated)</label>
                  <textarea value={artistsInput} onChange={e => setArtistsInput(e.target.value)} className="w-full bg-zinc-900 border border-white/10 p-4 text-xs text-white outline-none focus:border-white/30 transition-all min-h-[150px] leading-relaxed" />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] text-[#555] font-bold uppercase tracking-widest">Client Organizations (Comma separated)</label>
                  <textarea value={clientsInput} onChange={e => setClientsInput(e.target.value)} className="w-full bg-zinc-900 border border-white/10 p-4 text-xs text-white outline-none focus:border-white/30 transition-all min-h-[150px] leading-relaxed" />
                </div>
                <button onClick={() => { 
                  updateClients({
                    artists: artistsInput.split(',').map(s => s.trim()).filter(s => s !== ''),
                    clients: clientsInput.split(',').map(s => s.trim()).filter(s => s !== '')
                  });
                  alert('Client lists updated.');
                }} className="w-full bg-white text-black py-4 text-xs font-bold tracking-widest uppercase hover:bg-zinc-200 transition-colors">Save Rosters</button>
              </div>
            </div>
          )}

          {activeTab === 'CONTACT' && (
            <div className="max-w-2xl bg-zinc-950 p-8 border border-white/5 space-y-10 rounded-sm">
              <h2 className="text-xs tracking-[0.4em] font-bold uppercase text-[#888]">Business Contact Info</h2>
              <div className="space-y-6">
                <AdminInput label="Inquiry Email Address" defaultValue={contactDraft.email} onChange={v => setContactDraft({...contactDraft, email: v})} />
                <AdminInput label="Instagram Username" defaultValue={contactDraft.instagram} onChange={v => setContactDraft({...contactDraft, instagram: v})} />
                <AdminInput label="Vimeo Portfolio URL" defaultValue={contactDraft.vimeo} onChange={v => setContactDraft({...contactDraft, vimeo: v})} />
                <AdminInput label="Contact Phone Number" defaultValue={contactDraft.phone} onChange={v => setContactDraft({...contactDraft, phone: v})} />
                <button onClick={() => { updateContact(contactDraft); alert('Contact details saved.'); }} className="w-full bg-white text-black py-4 text-xs font-bold tracking-widest uppercase hover:bg-zinc-200 transition-colors">Apply Contact Info</button>
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
    <input 
      name={name}
      defaultValue={defaultValue} 
      required={required}
      autoComplete="off"
      onChange={(e) => onChange && onChange(e.target.value)}
      className="w-full bg-zinc-900 border border-white/10 p-4 text-xs outline-none focus:border-white/30 transition-all text-white tracking-widest placeholder:text-zinc-700"
      placeholder={`Enter ${label.toLowerCase()}...`}
    />
  </div>
);

export default Admin;
