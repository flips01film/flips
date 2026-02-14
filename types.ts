
export enum Category {
  ALL = 'ALL',
  CONCERT = 'CONCERT',
  MUSIC_VIDEO = 'MUSIC VIDEO',
  BROADCAST = 'BROADCAST',
  COMMERCIAL = 'COMMERCIAL',
  BEHIND_THE_SCENES = 'BEHIND THE SCENES'
}

export interface Project {
  id: string;
  artist: string;
  title: string;
  client: string;
  production: string;
  category: Category;
  role: string;
  company: string;
  camera: string;
  lens: string;
  year: string;
  videoUrl: string; // Vimeo or YouTube URL
  thumbnail: string;
  isSelectedWork: boolean;
}

export interface ContactInfo {
  email: string;
  instagram: string;
  vimeo: string;
  phone: string;
}

export interface ClientList {
  artists: string[];
  clients: string[];
}
