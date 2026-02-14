
export type Category = string;

export interface Project {
  id: string;
  artist: string;
  title: string;
  client: string;
  production: string;
  category: Category;
  role: string;
  camera: string;
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

export interface HomeInfo {
  heroVideo: string;
  heroImage: string;
  title: string;
  subtitle: string;
  location: string;
  categories: string[];
}

export interface AboutInfo {
  profileImage: string;
  profileImageSize: number;
  description1: string;
  description2: string;
  gearList: string;
}

export interface ClientList {
  artists: string[];
  clients: string[];
}
