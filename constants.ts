
import { Project, ContactInfo, HomeInfo, AboutInfo, ClientList } from './types';

export const INITIAL_CATEGORIES: string[] = [
  'CONCERT',
  'MUSIC VIDEO',
  'BROADCAST',
  'COMMERCIAL',
  'BEHIND THE SCENES'
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    artist: 'IU',
    title: 'World Tour [H.E.R.E] Behind Film',
    client: 'EDAM Entertainment',
    production: 'FLIPS',
    category: 'CONCERT',
    role: 'Cinematographer',
    camera: 'Sony FX6',
    year: '2025',
    videoUrl: 'https://player.vimeo.com/video/8248030', 
    thumbnail: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=1200',
    isSelectedWork: true,
  },
  {
    id: '2',
    artist: 'NewJeans',
    title: 'Music Bank Behind Film',
    client: 'HYBE / ADOR',
    production: 'KBS',
    category: 'BROADCAST',
    role: 'Cinematographer',
    camera: 'Sony Venice 2',
    year: '2024',
    videoUrl: 'https://player.vimeo.com/video/8248030',
    thumbnail: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=1200',
    isSelectedWork: true,
  },
  {
    id: '3',
    artist: 'Samsung',
    title: 'Galaxy Brand Film',
    client: 'Samsung Electronics',
    production: 'Production A',
    category: 'COMMERCIAL',
    role: 'Cinematographer',
    camera: 'Arri Alexa Mini LF',
    year: '2025',
    videoUrl: 'https://player.vimeo.com/video/8248030',
    thumbnail: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1200',
    isSelectedWork: true,
  }
];

export const INITIAL_HOME_INFO: HomeInfo = {
  heroVideo: 'https://assets.mixkit.co/videos/preview/mixkit-recording-a-concert-with-a-camera-34563-large.mp4',
  heroImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=2070',
  title: 'FLIPS',
  subtitle: 'Cinematography',
  location: 'Based in Seoul',
  categories: ['Concert', 'Music Video BTS', 'Broadcast', 'Commercial']
};

export const INITIAL_ABOUT_INFO: AboutInfo = {
  profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200',
  profileImageSize: 100,
  description1: 'FLIPS is a Seoul-based cinematography company specializing in concert, music video BTS, broadcast, and commercial filming.',
  description2: 'We focus on capturing authentic moments, atmosphere, and emotional energy in live and production environments.',
  gearList: 'SONY VENICE 2 / ARRI ALEXA MINI LF / SONY FX6 / SONY FX3 / ARRI SIGNATURE PRIMES / ZEISS SUPREME PRIMES'
};

export const INITIAL_CLIENT_DATA: ClientList = {
  artists: ['IU', 'NewJeans', 'IVE', 'TXT', 'BTS', 'AESPA', 'STRAY KIDS', 'LE SSERAFIM'],
  clients: ['HYBE', 'SM Entertainment', 'YG Entertainment', 'KBS', 'MBC', 'SBS', 'Samsung', 'Production Company Name']
};

export const INITIAL_CONTACT_INFO: ContactInfo = {
  email: 'contact@flips.com',
  instagram: '@flips',
  vimeo: 'vimeo.com/flips',
  phone: '010-xxxx-xxxx'
};
