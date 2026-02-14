
import { Category, Project, ContactInfo } from './types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    artist: 'IU',
    title: 'World Tour [H.E.R.E] Behind Film',
    client: 'EDAM Entertainment',
    production: 'FLIPS',
    category: Category.CONCERT,
    role: 'Cinematographer',
    company: 'FLIPS',
    camera: 'Sony FX6',
    lens: 'DZOFilm Vespid Prime',
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
    category: Category.BROADCAST,
    role: 'Cinematographer',
    company: 'FLIPS',
    camera: 'Sony Venice 2',
    lens: 'Arri Signature Primes',
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
    category: Category.COMMERCIAL,
    role: 'Cinematographer',
    company: 'FLIPS',
    camera: 'Arri Alexa Mini LF',
    lens: 'Angenieux Optimo',
    year: '2024',
    videoUrl: 'https://player.vimeo.com/video/8248030',
    thumbnail: 'https://picsum.photos/id/20/1200/800',
    isSelectedWork: true,
  }
];

export const INITIAL_CONTACT_INFO: ContactInfo = {
  email: 'contact@flips.com',
  instagram: '@flips_official',
  vimeo: 'vimeo.com/flips',
  phone: '010-XXXX-XXXX'
};

export const CLIENT_DATA = {
  artists: ['IU', 'NewJeans', 'IVE', 'TXT', 'LE SSERAFIM', 'BTS', 'AESPA', 'STRAY KIDS'],
  clients: ['HYBE', 'SM Entertainment', 'YG Entertainment', 'JYP Entertainment', 'KBS', 'MBC', 'SBS', 'Samsung', 'Mnet']
};
