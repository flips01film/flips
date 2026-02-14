
import { Project, ContactInfo, HomeInfo, AboutInfo, ClientList } from './types';

export const INITIAL_CATEGORIES: string[] = [
  'CONCERT BTS',
  'MUSIC VIDEO BTS',
  'BROADCAST',
  'COMMERCIAL'
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    artist: 'IU',
    title: 'World Tour [H.E.R.E] Behind Film',
    client: 'EDAM Entertainment',
    production: 'FLIPS',
    category: 'CONCERT BTS',
    role: 'Cinematographer',
    company: 'FLIPS',
    camera: 'Sony FX6',
    year: '2024',
    videoUrl: 'https://player.vimeo.com/video/8248030', 
    thumbnail: 'https://picsum.photos/id/1/1200/800',
    isSelectedWork: true,
  },
  {
    id: '2',
    artist: 'NewJeans',
    title: 'Music Bank Live Performance',
    client: 'HYBE / ADOR',
    production: 'KBS',
    category: 'BROADCAST',
    role: 'Cinematographer',
    company: 'FLIPS',
    camera: 'Sony Venice 2',
    year: '2024',
    videoUrl: 'https://player.vimeo.com/video/8248030',
    thumbnail: 'https://picsum.photos/id/10/1200/800',
    isSelectedWork: true,
  },
  {
    id: '3',
    artist: 'Samsung',
    title: 'Galaxy S24 Ultra Brand Film',
    client: 'Samsung Electronics',
    production: 'Production A',
    category: 'COMMERCIAL',
    role: 'Cinematographer',
    company: 'FLIPS',
    camera: 'Arri Alexa Mini LF',
    year: '2024',
    videoUrl: 'https://player.vimeo.com/video/8248030',
    thumbnail: 'https://picsum.photos/id/20/1200/800',
    isSelectedWork: true,
  }
];

export const INITIAL_HOME_INFO: HomeInfo = {
  heroVideo: 'https://assets.mixkit.co/videos/preview/mixkit-recording-a-concert-with-a-camera-34563-large.mp4',
  heroImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=2070',
  title: 'FLIPS',
  subtitle: 'Cinematography',
  location: 'Based in Seoul',
  categories: ['CONCERT BTS', 'MUSIC VIDEO BTS', 'BROADCAST', 'COMMERCIAL']
};

export const INITIAL_ABOUT_INFO: AboutInfo = {
  profileImage: 'https://picsum.photos/id/101/1200/1500',
  profileImageSize: 100,
  description1: 'FLIPS is a Seoul-based cinematography company specializing in concert, music video, broadcast, and commercial filming.',
  description2: 'We focus on capturing authentic moments, atmosphere, and emotional energy in live and production environments. Our approach combines technical precision with a documentary-style emotional depth, ensuring that every project resonates with its intended audience.',
  gearList: 'SONY VENICE 2 / ARRI ALEXA MINI LF / SONY FX6 / SONY FX3 / ARRI SIGNATURE PRIMES / ZEISS SUPREME PRIMES / COOKE S4/i / DZOFILM VESPID PRIMES'
};

export const INITIAL_CLIENT_DATA: ClientList = {
  artists: ['IU', 'NewJeans', 'IVE', 'TXT', 'LE SSERAFIM', 'BTS', 'AESPA', 'STRAY KIDS'],
  clients: ['HYBE', 'SM Entertainment', 'YG Entertainment', 'JYP Entertainment', 'KBS', 'MBC', 'SBS', 'Samsung', 'Mnet']
};

export const INITIAL_CONTACT_INFO: ContactInfo = {
  email: 'contact@flips.com',
  instagram: '@flips_official',
  vimeo: 'vimeo.com/flips',
  phone: '010-XXXX-XXXX'
};
