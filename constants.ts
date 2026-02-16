
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
    artist: 'BLACKPINK',
    title: 'World Tour [DEADLINE] Behind Film in BANGKOK',
    client: 'YG Entertainment',
    production: 'FLIPS',
    category: 'CONCERT BTS',
    role: 'Cinematographer',
    camera: 'Sony FX6',
    year: '2025',
    videoUrl: 'https://youtu.be/vy_mB6QY-Sc?si=Vd_ny-bpM9zQEH-x', 
    thumbnail: 'https://i.ytimg.com/vi/vy_mB6QY-Sc/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&amp;rs=AOn4CLCVed1vhYuy-a3gRL9XiWG011fO3Q',
    isSelectedWork: true,
  },
  {
    id: '2',
    artist: 'BLACKPINK',
    title: 'World Tour [DEADLINE] Behind Film in GOYANG',
    client: 'YG Entertainment',
    production: 'KBS',
    category: 'CONCERT BTS',
    role: 'Cinematographer',
    camera: 'Sony FX6',
    year: '2025',
    videoUrl: 'https://youtu.be/zTnAvaoHR4I?si=7uq3BVlXLxV8RdWQ',
    thumbnail: 'https://i.ytimg.com/vi/zTnAvaoHR4I/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&amp;rs=AOn4CLAEiHIlRcr4kFLZanmxScJHjg7Vew',
    isSelectedWork: true,
  },
  {
    id: '3',
    artist: 'BLACKPINK',
    title: 'World Tour [DEADLINE] Behind Film in LONDON',
    client: 'YG Entertainment',
    production: 'FLIPS',
    category: 'CONCERT BTS',
    role: 'Cinematographer',
    camera: 'Sony FX6',
    year: '2025',
    videoUrl: 'https://youtu.be/W-9-keHNwV8?si=eRghTBXWcj4uqDBC', 
    thumbnail: 'https://i.ytimg.com/vi/W-9-keHNwV8/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&amp;rs=AOn4CLCkmpUNyTB2f0MHRrB9IIPrXLi0IQ',
    isSelectedWork: true,
  },
  {
    id: '4',
    artist: 'JEON SOMI(전소미)',
    title: '‘CLOSER’ M/V MAKING FILM',
    client: 'THE BLACK LABLE',
    production: 'FLIPS',
    category: 'MUSIC VIDEO BTS',
    role: 'Cinematographer',
    camera: 'Sony FX6',
    year: '2025',
    videoUrl: 'https://youtu.be/ipGGm6wuozI?si=YZQPJZ862kGz-4iH', 
    thumbnail: 'https://i.ytimg.com/vi/ipGGm6wuozI/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&amp;rs=AOn4CLCXS9alNIqAdUcctNARJExtjakSdw',
    isSelectedWork: true,
  },
  {
    id: '5',
    artist: 'JEON SOMI(전소미)',
    title: '‘EXTRA’ M/V MAKING FILM',
    client: 'THE BLACK LABLE',
    production: 'FLIPS',
    category: 'MUSIC VIDEO BTS',
    role: 'Cinematographer',
    camera: 'Sony FX6',
    year: '2025',
    videoUrl: 'https://youtu.be/CQjXxbOizTc?si=k7uN_qDwFsXq7fCi', 
    thumbnail: 'https://i.ytimg.com/vi/CQjXxbOizTc/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&amp;rs=AOn4CLC9iGq6NYrqRUyfo9CZVddQSq-n2Q',
    isSelectedWork: true,
  },
    {
    id: '6',
    artist: 'MEOVV 미야오',
    title: '‘BURNING UP’ M/V MAKING FILM',
    client: 'THE BLACK LABLE',
    production: 'FLIPS',
    category: 'MUSIC VIDEO BTS',
    role: 'Cinematographer',
    camera: 'Sony FX6',
    year: '2025',
    videoUrl: 'https://youtu.be/QCLmz6lD-iA?si=gbodbpW2TDuhOSbq', 
    thumbnail: 'https://i.ytimg.com/vi/QCLmz6lD-iA/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&amp;rs=AOn4CLCSgW5QYpy0EheGy-QkeNJaie20FQ',
    isSelectedWork: true,
  },
     {
    id: '7',
    artist: 'ALLDAY PROJECT 올데이프로젝트',
    title: '‘ONE MORE TIME’ M/V MAKING FILM',
    client: 'THE BLACK LABLE',
    production: 'FLIPS',
    category: 'MUSIC VIDEO BTS',
    role: 'Cinematographer',
    camera: 'Sony FX6',
    year: '2025',
    videoUrl: 'https://youtu.be/WrTdTLH00V8?si=n1W5avpUg6WqhNnv', 
    thumbnail: 'https://i.ytimg.com/vi/WrTdTLH00V8/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&amp;rs=AOn4CLBTbOlFt_sTJENRZHYWLasyJfFbHg',
    isSelectedWork: true,
  },
      {
    id: '8',
    artist: 'ALLDAY PROJECT 올데이프로젝트',
    title: '‘LOOK AT ME’ M/V MAKING FILM',
    client: 'THE BLACK LABLE',
    production: 'FLIPS',
    category: 'MUSIC VIDEO BTS',
    role: 'Cinematographer',
    camera: 'Sony FX6',
    year: '2025',
    videoUrl: 'https://youtu.be/WrTdTLH00V8?si=H_aj6qsGclPXk0kt', 
    thumbnail: 'https://i.ytimg.com/vi/WrTdTLH00V8/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&amp;rs=AOn4CLBTbOlFt_sTJENRZHYWLasyJfFbHg',
    isSelectedWork: true,
  },
       {
    id: '9',
    artist: 'PARK BO GUM 박보검',
    title: '2025 FAN MEETING TOUR [BE WITH YOU] IN SEOUL SKETCH FILM',
    client: 'THE BLACK LABLE',
    production: 'FLIPS',
    category: 'MUSIC VIDEO BTS',
    role: 'Cinematographer',
    camera: 'Sony FX6',
    year: '2025',
    videoUrl: 'https://youtu.be/6Dhc3lifOeo?si=ZKyjpoqt9T14bzcW', 
    thumbnail: 'https://i.ytimg.com/vi/6Dhc3lifOeo/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&amp;rs=AOn4CLAE7WmT4UmcfjQjDklWEvY6d_jJwQ',
    isSelectedWork: true,
  },
];

export const INITIAL_HOME_INFO: HomeInfo = {
  heroVideo: ' ',
  heroImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=2070',
  title: 'FLIPS',
  subtitle: 'Cinematography',
  location: 'Based in Seoul',
  categories: ['Concert BTS', 'Music Video BTS', 'Broadcast', 'Commercial']
};

export const INITIAL_ABOUT_INFO: AboutInfo = {
  profileImage: 'https://postfiles.pstatic.net/MjAyNjAyMTZfODAg/MDAxNzcxMjMzNDcxMDM3.004aCKk3KVAelbmODs4IPn0y8MhtFGPucvNxq3kD4egg.vi3xyHLJAv8u6m8bJ1kNnyHU-0mw3UpVjbBP5Y4ij_Ug.PNG/%ED%94%8C%EB%A6%BD%EC%8A%A4%EB%A9%94%EC%9D%BC%EC%9A%A9%EB%AA%85%ED%95%A8.PNG?type=w966',
  profileImageSize: 100,
  description1: 'FLIPS is a Seoul-based cinematography company specializing in concert, music video BTS, broadcast, and commercial filming.',
  description2: 'We focus on capturing authentic moments, atmosphere, and emotional energy in live and production environments.',
  gearList: 'SONY VENICE 2 / ARRI ALEXA MINI LF / SONY FX6 / SONY FX3 / ARRI SIGNATURE PRIMES / ZEISS SUPREME PRIMES'
};

export const INITIAL_CLIENT_DATA: ClientList = {
  artists: ['BLACKPINK', 'ALL DAY PROJECT', 'JEON SOMI(전소미)', 'MEOVV 미야오', 'PARK BO GUM 박보검', 'TAEYANG',  'LE SSERAFIM'],
  clients: ['HYBE',  'YG Entertainment', 'THE BLACK LABLE', 'tvN', 'M-net', 'CJ ENM']
};

export const INITIAL_CONTACT_INFO: ContactInfo = {
  email: 'chosung0143@naver.com',
  instagram: '@flips_film',
  vimeo: '',
  phone: '010-7602-6924'
};
