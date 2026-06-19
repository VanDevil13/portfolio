import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Home, User, TrendingUp, Globe, Layers, Building2, Volume2, Users, Mail } from 'lucide-react';
// @ts-ignore — react-simple-maps ships without declaration files
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

const UW = 6800;
const UH = 6400;

function UKFlag({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0 }}>
      <rect x="1" y="4" width="22" height="16" rx="1"/>
      <line x1="1" y1="4" x2="23" y2="20"/>
      <line x1="23" y1="4" x2="1" y2="20"/>
      <line x1="1" y1="7" x2="19" y2="20"/>
      <line x1="5" y1="4" x2="23" y2="17"/>
      <line x1="23" y1="7" x2="5" y2="20"/>
      <line x1="19" y1="4" x2="1" y2="17"/>
      <line x1="12" y1="4" x2="12" y2="20" strokeWidth="2.5"/>
      <line x1="1" y1="12" x2="23" y2="12" strokeWidth="2.5"/>
    </svg>
  );
}

const CONTENT = {
  name: 'Moustafa\nAl-Etreby',
  title: 'Integrated Marketing & Brand Growth',
  tagline: '200% sales growth · +4,400% ROMI · 87% CPA reduction',
  headline: 'From paid media to profitable growth - across 14 markets, and over 11 years of experience across marketing and related roles.',
  subTagline: 'Now based in Somerset. Open to UK-wide and remote roles.',
  bio:
    'Marketing expert with **hands-on experience scaling acquisition across multiple international markets**. ' +
    'I manage multi-channel campaigns with full responsibility for **strategy, budget, and results** — ' +
    'capturing high-intent demand, building measurement frameworks, and aligning paid media with ' +
    'SEO, CRM, and commercial objectives for **consistent, profitable growth**.',
  education: [
    { degree: 'BSc Special Astronomy (Physics & Mathematics)', school: 'Al Azhar University - Graduated top of class', note: 'The analytical foundation behind my approach to data, measurement, and performance marketing.' },
    { degree: 'CIM Level 6, UK', school: 'Chartered Institute of Marketing', note: 'Commercial Intelligence (Distinction) · Strategy and Planning (Pass)' },
  ],
  markets: 'UK · France · Germany · UAE · Saudi Arabia · Qatar · Iraq · Ghana · Egypt · Malaysia · Turkey · China · USA · Tanzania',
  email: 'moustafa.aletreby@gmail.com',
  phone: '+44 7931 884351',
  location: 'Yeovil, Somerset — open to hybrid and remote roles across the UK',
  linkedin: 'https://www.linkedin.com/in/moustafaaletreby/',
  stats: [
    { value: '+4,400%', label: 'ROMI in one year',                org: 'ASRS Ltd',       flags: [{ code: 'gb', name: 'UK' }] },
    { value: '200%',    label: 'Sales growth',                    org: 'blu',             flags: [{ code: 'ae', name: 'UAE' }, { code: 'sa', name: 'KSA' }, { code: 'qa', name: 'Qatar' }, { code: 'gb', name: 'UK' }, { code: 'de', name: 'DE' }] },
    { value: '87%',     label: 'CPA reduction',                   org: 'blu / OLM',       flags: [{ code: 'ae', name: 'UAE' }, { code: 'sa', name: 'KSA' }, { code: 'qa', name: 'Qatar' }, { code: 'gb', name: 'UK' }, { code: 'de', name: 'DE' }] },
    { value: '#1',      label: 'Google SEO rankings',             org: 'ASRS Ltd',        flags: [{ code: 'gb', name: 'UK' }] },
    { value: '23%',     label: 'More closed deals',               org: 'VAAL Real Estate',flags: [{ code: 'gh', name: 'Ghana' }] },
    { value: '1st',     label: 'Egyptian documentary on Netflix', org: 'Lift Like a Girl', subtitle: 'Led end-to-end digital campaign - from zero to Netflix launch.', flags: [{ code: 'eg', name: 'Egypt' }] },
  ],
  certs: [
    { label: 'CIM Level 6',                org: 'Chartered Institute of Marketing', sk: 'cert_cim'                     },
    { label: 'Google Ads Certified',       org: 'Google',                           sk: 'cert_google', filledBg: '#fff' },
    { label: 'Meta Blueprint',             org: 'Meta',                             sk: 'cert_meta',   filledBg: '#fff' },
    { label: 'Digital Marketing',          org: 'Univ. of Illinois / Coursera',     sk: 'cert_coursera'                },
    { label: 'Google Ads Apps Certified',  org: 'Google',                           sk: 'cert_ga4',    filledBg: '#fff' },
  ],
  asrs: {
    company: 'ASRS Ltd (Structural Repairs)',
    role: 'Marketing Manager',
    period: 'June 2023 – Sept 2025',
    bullets: [
      'Achieved **+4,400% ROMI** across all digital marketing activity within one year.',
      'Built the company\'s **entire digital ecosystem from scratch** — strategy, website content, Google Ads, SEO, CRM, reporting, and all marketing collateral.',
      'Secured **#1 Google rankings** for all priority service and location keywords.',
      'Generated **high-quality B2B leads via LinkedIn** — councils, structural engineers, property managers, insurers, and loss adjusters.',
      'Built and managed the company\'s **first CRM system** — improving lead tracking, pipeline visibility, and reporting accuracy.',
    ],
    quote: { text: 'Mate, I have no idea what you\'re doing — but whatever it is, keep doing it.', attribution: '— Colleague, ASRS Ltd (after month one, responding to a surge in inbound leads)' },
  },
  global: [
    { name: 'blu', stats: '200% sales growth · 87% CPA reduction', meta: 'UAE, KSA, Qatar, UK, Germany · 2017–2019', role: 'Managed all digital campaigns end-to-end — strategy, media buying, creative briefing, audience targeting, and performance optimisation across social and search.' },
    { name: 'Lift Like a Girl', url: 'https://www.liftlikeagirlfilm.com/', stats: '1st Egyptian documentary on Netflix', meta: 'Egypt · 2019', role: 'Led the full end-to-end digital campaign from pre-launch through to Netflix release — content strategy, paid social, community management, and press amplification.' },
  ],
  realestate: {
    heading: 'Real Estate Campaigns',
    projects: 'EMAAR · DAMAC · Palm Hills · Hyde Park · Dubai Hills · SLS Dubai · Marquise Square (Burj Khalifa district)',
    meta: 'Dubai, Egypt, GCC · 2015–2019 · Audience: GCC – Europe – Egypt',
    role: 'Managed campaigns end-to-end: audience research, creative direction, media buying across Meta and Google, lead generation, reporting, and optimisation. Full ownership across all accounts.',
  },
  reviews: [
    { text: "I highly recommend hiring Moustafa as I believe he is a great asset who can add value to digital marketing teams at any organization. His thorough understanding of digital marketing in general - and social media marketing in specific -, his reliability and his open-mind qualify him to design and to drive effective digital marketing campaigns and to achieve great results.", name: 'A. Menshawy', title: 'Head of Commercial Operations', company: 'Germany' },
    { text: "I worked with Moustafa for more than three years. Not only he was always willing to accept responsibilities, but also was very proactive and had the talent of capitalizing on business opportunities. He was customer oriented and our clients were pleased by working with him. Moustafa is a great asset for any business he joins!", name: 'Rania Hammad', title: 'Chief Operating Officer', company: 'OneCard' },
    { text: "Mr Mostafa is very conscientious. He has very good organization skills and follows tasks through to completion. He is creative and of valuable assistant. I therefore recommend him.", name: 'Marwa Abdelaziz Ghoniem', title: 'Business English & Conversation Instructor', company: '' },
    { text: "Mate, I have no idea what you're doing — but whatever it is, keep doing it.", name: 'Colleague', title: 'ASRS Ltd', company: 'After month one, responding to a surge in inbound leads' },
  ],
};

const IS_DEV = import.meta.env.DEV;

const VIDEO_EMBEDS_RE: { src: string; label: string }[] = [
  { src: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2F100618278584417%2Fposts%2F252977463348497&show_text=false&width=500', label: 'Campaign Video 1' },
  { src: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2F100063793010010%2Fposts%2F296652525647657%2F&show_text=false&width=500', label: 'Campaign Video 2' },
  { src: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2F100063793010010%2Fposts%2F252983913347852%2F&show_text=false&width=500', label: 'Campaign Video 3' },
];

const IMAGES = {
  universe: `${import.meta.env.BASE_URL}images/hero-milkyway.png`,
  nebula:`${import.meta.env.BASE_URL}images/nebula-detail.png`,
  aurora:`${import.meta.env.BASE_URL}images/s2-aurora.png`,
  somerset: `${import.meta.env.BASE_URL}images/glastonbury-tor.png`,
  oak:   `${import.meta.env.BASE_URL}images/s6-oak.png`,
  cosmos:`${import.meta.env.BASE_URL}images/hero-cosmos.png`,
  unLogo:`${import.meta.env.BASE_URL}images/undrr_logo.png`,
  bluLogo:  `${import.meta.env.BASE_URL}images/blu_logo.png`,
};

const WORLD_MARKET_DATA: Record<string, { name: string; clients: string[] }> = {
  '826': { name: 'United Kingdom',  clients: ['ASRS Ltd', 'blu', 'Real estate projects', "Vicky's Beauty Box (content & offline collateral)"] },
  '784': { name: 'UAE',             clients: ['blu', 'Dental Centre Dubai', 'DAMAC', 'EMAAR', 'Dubai Creek', 'Marquise Square (Burj Khalifa)', 'SLS Dubai', 'Dubai Hills', 'Bloom Towers'] },
  '682': { name: 'Saudi Arabia',    clients: ['blu', 'OneCard', 'Khaled Alajmi Digital Presence', 'Medical Sector', 'The Meat Shop', 'Rare Market', 'Asmak Al Zaitoun', 'Osman Baik', 'Bike Lane', 'Kathef', 'LA Chocolate Bar', 'Crownberry', 'Special Loaf', 'Al Asmak Al Saudia', 'Cavalli Caffee', 'Marvella Community', 'Samref', 'Yasref'] },
  '634': { name: 'Qatar',           clients: ['blu', 'OneCard'] },
  '414': { name: 'Kuwait',          clients: ['OneCard'] },
  '48':  { name: 'Bahrain',         clients: ['OneCard'] },
  '512': { name: 'Oman',            clients: ['OneCard'] },
  '368': { name: 'Iraq',            clients: ['OneCard', 'MAHALLAK'] },
  '288': { name: 'Ghana',           clients: ['VAAL Real Estate'] },
  '818': { name: 'Egypt',           clients: ['Lift Like a Girl', 'UNDRR Arab States', 'Jobadge', 'Yallaforma', 'Xclusives Card', 'SARAI', 'Art City', 'Red Sea Diving College', 'UN Info Centre Cairo', 'Palm Hills', 'Hyde Park', 'Macknmall'] },
  '458': { name: 'Malaysia',        clients: ['OneCard'] },
  '792': { name: 'Turkey',          clients: ['VAAL Real Estate'] },
  '156': { name: 'China',           clients: ['OneCard'] },
  '840': { name: 'USA',             clients: ['Egypt 7000'] },
  '834': { name: 'Tanzania',        clients: ['Safaya', 'Shanga Paje', 'Canary Hotels & SPA', 'Zanzibar Seawalk'] },
  '434': { name: 'Libya',           clients: ['OneCard'] },
  '788': { name: 'Tunisia',         clients: ['OneCard'] },
  '12':  { name: 'Algeria',         clients: ['OneCard'] },
  '504': { name: 'Morocco',         clients: ['OneCard'] },
  '276': { name: 'Germany',         clients: ['blu'] },
};
const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

const CLIENT_LOGO_BGS: (string | undefined)[] = [
  '#fff',     // 1
  '#fff',     // 2
  '#fff',     // 3
  undefined,  // 4 - OLM: revert to default dark
  '#0a0e2a',  // 5 - Minvotech: dark navy
  '#000000',  // 6 - Lift Like A Girl: black
  '#000000',  // 7 - Bonne Apart: black
  '#fff',     // 8
  '#1b3d7a',  // 9 - ASRS: blue
  '#000000',  // 10 - VAAL: black
  '#000000',  // 11 - OneCard: black
  '#fff',     // 12
];

const MARTECH_LOGO_BGS: (string | undefined)[] = [
  '#fff', '#fff', '#fff',
  '#000000',  // 4 - X: black
  '#fffc00',  // 5 - Snapchat: yellow
  '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff',
];

const SECTIONS = [
  { id: 'hero',        label: 'Home',       Icon: Home       as React.ComponentType<{size?:number}>, nx: 3400, ny: 2200, pw: 1260, ph: 820,  targetScale: 0.88, accent: '#60a5fa', bg: 'rgba(2,8,23,0.93)'    },
  { id: 'about',       label: 'About',      Icon: User       as React.ComponentType<{size?:number}>, nx:  700, ny:  820, pw: 1260, ph: 780,  targetScale: 0.80, accent: '#34d399', bg: 'rgba(4,47,30,0.93)'   },
  { id: 'results',     label: 'Results',    Icon: TrendingUp as React.ComponentType<{size?:number}>, nx: 6000, ny:  860, pw: 1260, ph: 820,  targetScale: 0.82, accent: '#a78bfa', bg: 'rgba(10,5,30,0.93)'   },
  { id: 'asrs',        label: 'UK Work',    Icon: UKFlag     as React.ComponentType<{size?:number}>, nx:  700, ny: 2760, pw: 1260, ph: 760,  targetScale: 0.88, accent: '#38bdf8', bg: 'rgba(2,15,30,0.93)'   },
  { id: 'global',      label: 'Campaigns',  Icon: Layers     as React.ComponentType<{size?:number}>, nx: 6000, ny: 2760, pw: 1260, ph: 760,  targetScale: 0.88, accent: '#f472b6', bg: 'rgba(30,5,20,0.93)'   },
  { id: 'realestate',  label: 'Real Estate',Icon: Building2  as React.ComponentType<{size?:number}>, nx: 6200, ny: 4260, pw: 1260, ph: 820,  targetScale: 0.80, accent: '#fb923c', bg: 'rgba(25,10,2,0.93)'   },
  { id: 'un',          label: 'Global',     Icon: Globe      as React.ComponentType<{size?:number}>, nx:  400, ny: 4260, pw: 1260, ph: 860,  targetScale: 0.76, accent: '#4ade80', bg: 'rgba(0,20,8,0.93)'    },
  { id: 'video',       label: 'Reviews',    Icon: Volume2    as React.ComponentType<{size?:number}>, nx: 3400, ny: 3400, pw: 1260, ph: 820,  targetScale: 0.80, accent: '#fb7185', bg: 'rgba(30,2,12,0.93)'   },
  { id: 'clients',     label: 'Clients',    Icon: Users      as React.ComponentType<{size?:number}>, nx: 2400, ny: 4400, pw: 1260, ph: 920,  targetScale: 0.76, accent: '#fbbf24', bg: 'rgba(25,18,0,0.93)'   },
  { id: 'contact',     label: 'Contact',    Icon: Mail       as React.ComponentType<{size?:number}>, nx: 4500, ny: 4400, pw: 1260, ph: 660,  targetScale: 0.80, accent: '#e879f9', bg: 'rgba(20,2,25,0.93)'   },
  { id: 'asrs2',       label: 'UK Work',    Icon: UKFlag     as React.ComponentType<{size?:number}>, nx:  700, ny: 5600, pw: 1260, ph: 760,  targetScale: 0.88, accent: '#38bdf8', bg: 'rgba(2,15,30,0.93)',   subOf: 'asrs'        },
  { id: 'global2',     label: 'Campaigns',  Icon: Layers     as React.ComponentType<{size?:number}>, nx: 6100, ny: 5600, pw: 1260, ph: 760,  targetScale: 0.88, accent: '#f472b6', bg: 'rgba(30,5,20,0.93)',   subOf: 'global'      },
  { id: 'realestate2', label: 'Real Estate',Icon: Building2  as React.ComponentType<{size?:number}>, nx: 4400, ny: 5600, pw: 1260, ph: 760,  targetScale: 0.80, accent: '#fb923c', bg: 'rgba(25,10,2,0.93)',   subOf: 'realestate'  },
  { id: 'un2',         label: 'Global',     Icon: Globe      as React.ComponentType<{size?:number}>, nx: 2100, ny: 5600, pw: 1260, ph: 820,  targetScale: 0.76, accent: '#4ade80', bg: 'rgba(0,20,8,0.93)',    subOf: 'un'          },
] as const satisfies ReadonlyArray<{ id: string; label: string; Icon: React.ComponentType<{size?:number}>; nx: number; ny: number; pw: number; ph: number; targetScale: number; accent: string; bg: string; subOf?: string }>;

type Section = typeof SECTIONS[number] & { subOf?: string };

const CONNECTIONS: [string, string][] = [
  ['hero','about'],['hero','results'],['hero','asrs'],['hero','global'],['hero','video'],
  ['about','asrs'],['results','global'],
  ['asrs','un'],['global','realestate'],
  ['un','clients'],['realestate','video'],
  ['video','clients'],['clients','contact'],['contact','about'],
];

const FLOAT_OBJECTS = [
  { src: IMAGES.aurora,   x: 4400, y: 1300, w: 360, h: 220, rot: -4, op: 0.85, border: '#60a5fa', round: false },
  { src: IMAGES.somerset, x: 1600, y:  340, w: 310, h: 195, rot:  3, op: 0.88, border: '#34d399', round: false },
  { src: IMAGES.nebula,   x: 6450, y:  200, w: 300, h: 300, rot:  0, op: 0.78, border: '#a78bfa', round: true  },
  { src: IMAGES.oak,      x: 1640, y: 2120, w: 330, h: 200, rot: -3, op: 0.85, border: '#38bdf8', round: false },
  { src: IMAGES.cosmos,   x: 6450, y: 2120, w: 300, h: 300, rot:  0, op: 0.78, border: '#f472b6', round: true  },
  { src: IMAGES.aurora,   x:  180, y: 4050, w: 320, h: 200, rot:  5, op: 0.78, border: '#4ade80', round: false },
];

function FlagSVG({ code, name }: { code: string; name: string }) {
  const s: React.CSSProperties = { display: 'block', height: 13, width: 'auto', borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,.5)', flexShrink: 0 };
  const w: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: 4, color: 'rgba(255,255,255,.58)', fontSize: 10.5 };
  const flags: Record<string, React.ReactElement> = {
    gb: <svg style={s} viewBox="0 0 60 30"><rect width="60" height="30" fill="#012169"/><path d="M0,0L60,30M60,0L0,30" stroke="white" strokeWidth="8"/><path d="M0,0L60,30M60,0L0,30" stroke="#C8102E" strokeWidth="5"/><path d="M30,0V30M0,15H60" stroke="white" strokeWidth="12"/><path d="M30,0V30M0,15H60" stroke="#C8102E" strokeWidth="7"/></svg>,
    ae: <svg style={s} viewBox="0 0 60 30"><rect width="60" height="10" fill="#00732F"/><rect y="10" width="60" height="10" fill="white"/><rect y="20" width="60" height="10" fill="black"/><rect width="20" height="30" fill="#EF3340"/></svg>,
    sa: <svg style={s} viewBox="0 0 60 30"><rect width="60" height="30" fill="#006C35"/><rect x="9" y="8" width="42" height="2.2" fill="white" rx="1"/><rect x="9" y="12" width="38" height="2.2" fill="white" rx="1"/><rect x="14" y="18.5" width="26" height="2.2" fill="white" rx="1.1"/><polygon points="14,18 14,21 9,19.5" fill="white"/><rect x="39.5" y="17" width="2.2" height="5" fill="white" rx="0.8"/><rect x="37.5" y="18.5" width="6.5" height="1.8" fill="white" rx="0.8"/></svg>,
    qa: <svg style={s} viewBox="0 0 60 30"><rect width="60" height="30" fill="#8D1B3D"/><rect width="15" height="30" fill="white"/><polygon points="15,0 26,5 15,10 26,15 15,20 26,25 15,30" fill="#8D1B3D"/></svg>,
    de: <svg style={s} viewBox="0 0 60 30"><rect width="60" height="10" fill="#000"/><rect y="10" width="60" height="10" fill="#DD0000"/><rect y="20" width="60" height="10" fill="#FFCE00"/></svg>,
    eg: <svg style={s} viewBox="0 0 60 30"><rect width="60" height="10" fill="#CE1126"/><rect y="10" width="60" height="10" fill="white"/><rect y="20" width="60" height="10" fill="black"/><rect x="25" y="10" width="10" height="10" fill="#C09300" opacity="0.7"/></svg>,
    gh: <svg style={s} viewBox="0 0 60 30"><rect width="60" height="10" fill="#CE1126"/><rect y="10" width="60" height="10" fill="#FCD116"/><rect y="20" width="60" height="10" fill="#006B3F"/><polygon points="30,9 32,15 38,15 33,19 35,25 30,21 25,25 27,19 22,15 28,15" fill="black"/></svg>,
  };
  return <span style={w}>{flags[code] ?? <span style={{ background: 'rgba(255,255,255,.15)', padding: '1px 4px', borderRadius: 2, fontSize: 9 }}>{code.toUpperCase()}</span>}<span>{name}</span></span>;
}

function Rich({ text, color = 'rgba(255,255,255,.72)', size = 14 }: { text: string; color?: string; size?: number }) {
  return (
    <span style={{ color, fontSize: size, lineHeight: 1.75 }}>
      {text.split(/(\*\*[^*]+\*\*)/).map((p, i) =>
        p.startsWith('**') ? <strong key={i} style={{ color: '#fff', fontWeight: 700 }}>{p.slice(2,-2)}</strong> : <span key={i}>{p}</span>
      )}
    </span>
  );
}

// ─── IMAGE SLOT — server-backed (GCS), visible to all users ───────────────────
function ImageSlot({ accent, label, height = 160, width, sk, cover, filledBg, circle, fluid }: {
  accent: string; label: string; height?: number; width?: string; sk: string; cover?: boolean; filledBg?: string; circle?: boolean; fluid?: boolean;
}) {
  const lsKey = `mae_has_${sk}`;
  const serverUrl = `/api/portfolio-images/${encodeURIComponent(sk)}`;
  const br = circle ? '50%' : 10;
  const [hasImage, setHasImage] = useState<boolean | null>(() => {
    try { return localStorage.getItem(lsKey) === '1' ? true : null; } catch { return null; }
  });
  const [uploadTs, setUploadTs] = useState(0);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (hasImage !== null) return;
    fetch(serverUrl, { method: 'HEAD' })
      .then(r => {
        const found = r.ok;
        setHasImage(found);
        try { found ? localStorage.setItem(lsKey, '1') : localStorage.removeItem(lsKey); } catch {}
      })
      .catch(() => setHasImage(false));
  }, [sk, lsKey, serverUrl, hasImage]);

  const handleUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target?.result as string;
      try {
        const res = await fetch('/api/portfolio-images', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sk, dataUrl }),
        });
        if (res.ok) { setHasImage(true); setUploadTs(Date.now()); try { localStorage.setItem(lsKey, '1'); } catch {} }
      } catch {}
    };
    reader.readAsDataURL(file);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try { await fetch(`/api/portfolio-images/${encodeURIComponent(sk)}`, { method: 'DELETE' }); } catch {}
    setHasImage(false);
    try { localStorage.removeItem(lsKey); } catch {}
  };

  const imgSrc = uploadTs ? `${serverUrl}?t=${uploadTs}` : serverUrl;

  // ── fluid mode (mobile): images render at their natural aspect ratio ──
  if (fluid) {
    if (hasImage === null) return <div style={{ height: 4 }}/>;
    if (hasImage) return (
      <div style={{ position: 'relative', borderRadius: 10, overflow: 'hidden', border: `1px solid ${accent}33`, background: 'rgba(0,0,0,.3)' }}>
        <img src={imgSrc} alt={label} style={{ width: '100%', height: 'auto', display: 'block' }} onError={() => { setHasImage(false); try { localStorage.removeItem(lsKey); } catch {} }}/>
        {IS_DEV && <button onClick={handleDelete} style={{ position: 'absolute', top: 6, right: 6, width: 22, height: 22, borderRadius: '50%', background: 'rgba(0,0,0,.75)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>}
      </div>
    );
    // empty fluid slot — invisible, no upload button
    return null;
  }

  // ── fixed-size mode (desktop / logo slots) ──
  // in production: empty slots render as a plain transparent box (no upload affordance)
  if (!IS_DEV && !hasImage) {
    return <div style={{ borderRadius: br, height, width: width ?? '100%', flexShrink: 0, background: 'transparent' }}/>;
  }
  return (
    <div onClick={() => IS_DEV && hasImage === false && ref.current?.click()} style={{ borderRadius: br, border: hasImage ? `1px solid ${accent}33` : `2px dashed ${accent}55`, background: hasImage ? (filledBg ?? 'rgba(0,0,0,.3)') : `${accent}09`, cursor: IS_DEV && hasImage === false ? 'pointer' : 'default', overflow: 'hidden', position: 'relative', height, width: width ?? '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      {IS_DEV && <input ref={ref} type="file" accept="image/*" onChange={e => { const f = e.target.files?.[0]; if (f) handleUpload(f); }} style={{ display: 'none' }}/>}
      {hasImage === null ? (
        <div style={{ color: 'rgba(255,255,255,.2)', fontSize: 9, letterSpacing: '.06em' }}>…</div>
      ) : hasImage ? (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <img src={imgSrc} alt={label} style={{ width: '100%', height: '100%', objectFit: cover ? 'cover' : 'contain', display: 'block', padding: (circle && !cover) ? 4 : 0, boxSizing: 'border-box' }} onError={() => { setHasImage(false); try { localStorage.removeItem(lsKey); } catch {} }}/>
          {IS_DEV && <button onClick={handleDelete} style={{ position: 'absolute', top: 4, right: 4, width: 20, height: 20, borderRadius: '50%', background: 'rgba(0,0,0,.7)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity .2s' }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '0'; }}>×</button>}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: circle ? '4px' : '8px 10px', pointerEvents: 'none' }}>
          <div style={{ color: accent, fontSize: circle ? 16 : 22, fontWeight: 300, lineHeight: 1, marginBottom: 3 }}>+</div>
          {!circle && <div style={{ color: accent, fontSize: 9, fontWeight: 600, marginBottom: 1 }}>{label}</div>}
          {!circle && <div style={{ color: 'rgba(255,255,255,.25)', fontSize: 8 }}>Click to upload</div>}
        </div>
      )}
    </div>
  );
}

const tg = (a: string): React.CSSProperties => ({ color: a, fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: 8 });
const h2s: React.CSSProperties = { color: '#fff', fontWeight: 700, lineHeight: 1.18, margin: 0, fontSize: 24 };

function DesktopPortfolio() {
  const vpRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState({ tx: 0, ty: 0, scale: 0.14 });
  const [active, setActive] = useState('hero');
  const [ready, setReady] = useState(false);
  const getVP = useCallback(() => ({ vpW: vpRef.current?.clientWidth ?? window.innerWidth, vpH: vpRef.current?.clientHeight ?? window.innerHeight }), []);
  const nav = useCallback((s: Section) => { const { vpW, vpH } = getVP(); setView({ tx: vpW / 2 - s.nx * s.targetScale, ty: vpH / 2 - s.ny * s.targetScale, scale: s.targetScale }); setActive(s.id); }, [getVP]);
  const activeRef = useRef(active);
  useEffect(() => { activeRef.current = active; }, [active]);
  const NAV_ORDER = useMemo(() => {
    const result: Section[] = [];
    for (const s of (SECTIONS as readonly Section[]).filter((x: Section) => !(x as {subOf?:string}).subOf)) {
      result.push(s);
      const sub = (SECTIONS as readonly Section[]).find((x: Section) => (x as {subOf?:string}).subOf === s.id);
      if (sub) result.push(sub);
    }
    return result;
  }, []);
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) return;
      e.preventDefault();
      const idx = NAV_ORDER.findIndex(s => s.id === activeRef.current);
      const safeIdx = idx < 0 ? 0 : idx;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nav(NAV_ORDER[(safeIdx + 1) % NAV_ORDER.length]);
      else nav(NAV_ORDER[(safeIdx - 1 + NAV_ORDER.length) % NAV_ORDER.length]);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [nav, NAV_ORDER]);
  useEffect(() => {
    const { vpW, vpH } = getVP();
    const sc = Math.min(vpW / UW, vpH / UH) * 0.86;
    setView({ tx: (vpW - UW * sc) / 2, ty: (vpH - UH * sc) / 2, scale: sc });
    setReady(true);
    const t = setTimeout(() => { const h = SECTIONS[0]; const { vpW: vw, vpH: vh } = getVP(); setView({ tx: vw / 2 - h.nx * h.targetScale, ty: vh / 2 - h.ny * h.targetScale, scale: h.targetScale }); }, 900);
    return () => clearTimeout(t);
  }, [getVP]);
  const byId = (id: string) => SECTIONS.find(s => s.id === id)!;

  return (
    <div ref={vpRef} style={{ width: '100%', height: '100vh', overflow: 'hidden', background: '#020817', backgroundImage: `url(${import.meta.env.BASE_URL}images/hero-milkyway.png)`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', fontFamily: "'Inter',-apple-system,sans-serif", userSelect: 'none' }}>
      <div style={{ position: 'absolute', width: UW, height: UH, transformOrigin: '0 0', transform: `translate(${view.tx}px,${view.ty}px) scale(${view.scale})`, transition: ready ? 'transform 0.92s cubic-bezier(0.77,0,0.175,1)' : 'none', willChange: 'transform' }}>
        <img src={IMAGES.universe} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.14 }}/>
        <img src={IMAGES.nebula} alt="" style={{ position: 'absolute', right: 0, top: 0, width: '40%', height: '48%', objectFit: 'cover', opacity: 0.22, mixBlendMode: 'screen' }}/>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: ['radial-gradient(1.5px 1.5px at 400px 250px,rgba(255,255,255,.9) 0%,transparent 100%)','radial-gradient(1px 1px at 1100px 420px,rgba(255,255,255,.7) 0%,transparent 100%)','radial-gradient(2px 2px at 2000px 200px,rgba(200,220,255,.8) 0%,transparent 100%)','radial-gradient(1px 1px at 2800px 550px,rgba(255,255,255,.7) 0%,transparent 100%)','radial-gradient(1.5px 1.5px at 4000px 300px,rgba(255,255,255,.8) 0%,transparent 100%)','radial-gradient(1px 1px at 5200px 450px,rgba(255,255,255,.6) 0%,transparent 100%)','radial-gradient(2px 2px at 600px 1200px,rgba(200,220,255,.7) 0%,transparent 100%)','radial-gradient(1px 1px at 1800px 900px,rgba(255,255,255,.6) 0%,transparent 100%)','radial-gradient(1.5px 1.5px at 3200px 1400px,rgba(255,255,255,.8) 0%,transparent 100%)','radial-gradient(1px 1px at 4600px 1100px,rgba(255,255,255,.5) 0%,transparent 100%)','radial-gradient(2px 2px at 900px 2400px,rgba(180,200,255,.7) 0%,transparent 100%)','radial-gradient(1px 1px at 2400px 2800px,rgba(255,255,255,.6) 0%,transparent 100%)','radial-gradient(1.5px 1.5px at 5400px 2200px,rgba(255,255,255,.8) 0%,transparent 100%)','radial-gradient(1px 1px at 300px 3600px,rgba(255,255,255,.5) 0%,transparent 100%)','radial-gradient(2px 2px at 1600px 3200px,rgba(200,220,255,.7) 0%,transparent 100%)','radial-gradient(1px 1px at 3800px 4000px,rgba(255,255,255,.6) 0%,transparent 100%)'].join(',') }}/>
        <svg style={{ position: 'absolute', inset: 0, width: UW, height: UH, pointerEvents: 'none' }}>
          {CONNECTIONS.map(([a, b], i) => { const f = byId(a), t = byId(b); return <line key={i} x1={f.nx} y1={f.ny} x2={t.nx} y2={t.ny} stroke="rgba(255,255,255,.12)" strokeWidth="2" strokeDasharray="8 12"/>; })}
          {CONNECTIONS.map(([a, b], i) => { const f = byId(a), t = byId(b); const mx = (f.nx + t.nx) / 2, my = (f.ny + t.ny) / 2; return <circle key={`mid${i}`} cx={mx} cy={my} r="2" fill="rgba(255,255,255,.18)"/>; })}
        </svg>
        {FLOAT_OBJECTS.map((o, i) => (
          <div key={i} style={{ position: 'absolute', left: o.x, top: o.y, width: o.w, height: o.h, transform: `rotate(${o.rot}deg)`, opacity: o.op, borderRadius: o.round ? '50%' : 14, overflow: 'hidden', border: `2px solid ${o.border}33`, boxShadow: `0 0 30px ${o.border}22` }}>
            <img src={o.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}/>
          </div>
        ))}
        {SECTIONS.map(s => {
          const subSlide = SECTIONS.find(ss => (ss as { subOf?: string }).subOf === s.id);
          const parentSlide = (s as { subOf?: string }).subOf ? SECTIONS.find(ps => ps.id === (s as { subOf?: string }).subOf) : undefined;
          return <Panel key={s.id} section={s} isActive={active === s.id} onFocus={() => nav(s)} onNextSlide={subSlide ? () => nav(subSlide) : undefined} onPrevSlide={parentSlide ? () => nav(parentSlide) : undefined}/>;
        })}
      </div>
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 16px', background: 'rgba(2,8,23,.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,.07)' }}>
        <div style={{ display: 'flex', gap: 2 }}>
          {SECTIONS.filter(s => !(s as { subOf?: string }).subOf).map(s => { const { Icon } = s; const on = active === s.id || SECTIONS.some(ss => (ss as { subOf?: string }).subOf === s.id && ss.id === active); return <button key={s.id} onClick={() => nav(s)} title={s.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: '4px 8px', borderRadius: 7, border: 'none', background: on ? `${s.accent}20` : 'transparent', color: on ? s.accent : 'rgba(255,255,255,.35)', cursor: 'pointer', transition: 'all .2s', outline: on ? `1px solid ${s.accent}44` : 'none' }}><Icon size={14}/><span style={{ fontSize: 7, fontWeight: 600, letterSpacing: '.05em', textTransform: 'uppercase' }}>{s.label}</span></button>; })}
        </div>
        <span style={{ fontSize: 9, color: 'rgba(255,255,255,.25)', letterSpacing: '.07em' }}>Integrated Marketing &amp; Brand Growth</span>
      </nav>
      <div style={{ position: 'fixed', right: 16, top: '50%', transform: 'translateY(-50%)', zIndex: 300, display: 'flex', flexDirection: 'column', gap: 9 }}>
        {SECTIONS.filter(s => !(s as { subOf?: string }).subOf).map(s => { const on = active === s.id || SECTIONS.some(ss => (ss as { subOf?: string }).subOf === s.id && ss.id === active); return <button key={s.id} onClick={() => nav(s)} title={s.label} style={{ width: on ? 11 : 6, height: on ? 11 : 6, borderRadius: '50%', padding: 0, border: 'none', background: on ? s.accent : 'rgba(255,255,255,.24)', boxShadow: on ? `0 0 10px ${s.accent}` : 'none', cursor: 'pointer', transition: 'all .28s' }}/>; })}
      </div>
      <Minimap view={view} active={active} nav={nav}/>
      <div style={{ position: 'fixed', bottom: 10, left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,.18)', fontSize: 8, letterSpacing: '.12em', textTransform: 'uppercase', zIndex: 300, pointerEvents: 'none' }}>Click any node · use nav above to jump</div>
    </div>
  );
}

function Panel({ section, isActive, onFocus, onNextSlide, onPrevSlide }: { section: Section; isActive: boolean; onFocus: () => void; onNextSlide?: () => void; onPrevSlide?: () => void }) {
  const { nx, ny, pw, ph, accent, bg } = section;
  const isSubSlide = !!(section as { subOf?: string }).subOf;
  const hasPagination = isSubSlide || !!onNextSlide;
  const pageNum = isSubSlide ? 2 : 1;
  return (
    <div onClick={onFocus} style={{ position: 'absolute', left: nx - pw / 2, top: ny - ph / 2, width: pw, height: ph, background: bg, border: `2px solid ${isActive ? accent : 'rgba(255,255,255,.09)'}`, borderRadius: 20, backdropFilter: 'blur(22px)', boxShadow: isActive ? `0 0 70px ${accent}44,0 0 140px ${accent}18,inset 0 1px 0 rgba(255,255,255,.08)` : '0 14px 60px rgba(0,0,0,.68),inset 0 1px 0 rgba(255,255,255,.04)', transition: 'box-shadow .4s,border-color .4s', cursor: 'pointer', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 3, flexShrink: 0, background: `linear-gradient(90deg,${accent},transparent)` }}/>
      {hasPagination && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 20px 6px', flexShrink: 0, borderBottom: `1px solid ${accent}18`, background: `${accent}06` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {[1, 2].map(p => (
              <div key={p} style={{ width: 22, height: 3, borderRadius: 2, background: p === pageNum ? accent : `${accent}28`, transition: 'background .3s' }}/>
            ))}
            <span style={{ color: `${accent}70`, fontSize: 9, fontWeight: 600, letterSpacing: '.08em', marginLeft: 2 }}>{pageNum} / 2</span>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {onPrevSlide && <button onClick={(e) => { e.stopPropagation(); onPrevSlide(); }} style={{ background: `${accent}14`, border: `1px solid ${accent}40`, color: accent, borderRadius: 20, padding: '3px 12px', fontSize: 9, fontWeight: 700, cursor: 'pointer', letterSpacing: '.03em', transition: 'background .2s' }}>← Part 1</button>}
            {onNextSlide && <button onClick={(e) => { e.stopPropagation(); onNextSlide(); }} style={{ background: `${accent}14`, border: `1px solid ${accent}40`, color: accent, borderRadius: 20, padding: '3px 12px', fontSize: 9, fontWeight: 700, cursor: 'pointer', letterSpacing: '.03em', transition: 'background .2s' }}>Part 2 →</button>}
          </div>
        </div>
      )}
      <div style={{ flex: 1, padding: '16px 24px', paddingTop: hasPagination ? 14 : 42, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 0, zoom: 1.12 }}>
        <SlideContent section={section}/>
      </div>
    </div>
  );
}

function SlideContent({ section }: { section: Section }) {
  const { id, accent } = section;

  if (id === 'hero') return (
    <div style={{ display: 'flex', height: '100%', gap: 30 }}>
      <div style={{ flex: '0 0 53%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 13 }}>
        <div style={tg(accent)}>{CONTENT.title}</div>
        <h1 style={{ color: '#fff', fontWeight: 800, lineHeight: 1.06, margin: 0, fontSize: 58 }}>
          {CONTENT.name.split('\n').map((l, i) => <span key={i} style={{ display: 'block' }}>{l}</span>)}
        </h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
          {CONTENT.tagline.split(' · ').map(t => <span key={t} style={{ background: `${accent}20`, border: `1px solid ${accent}44`, color: accent, fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 20 }}>{t}</span>)}
        </div>
        <p style={{ color: '#fff', fontSize: 16, fontWeight: 600, lineHeight: 1.5, margin: 0 }}>{CONTENT.headline}</p>
        <p style={{ color: 'rgba(255,255,255,.48)', fontSize: 13, lineHeight: 1.5, margin: 0 }}>{CONTENT.subTagline}</p>
        <a href={CONTENT.linkedin} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', color: '#fff', background: accent, padding: '10px 20px', borderRadius: 10, fontSize: 14, fontWeight: 700, textDecoration: 'none', width: 'fit-content', marginTop: 4 }}>Connect on LinkedIn</a>
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'stretch' }}>
        <ImageSlot accent={accent} label="Upload headshot here" height={560} sk="hero_headshot" cover/>
      </div>
    </div>
  );

  if (id === 'about') return (
    <div style={{ display: 'flex', gap: 26, height: '100%' }}>
      <div style={{ flex: '0 0 36%', borderRadius: 14, overflow: 'hidden', border: `1.5px solid ${accent}33`, position: 'relative', minHeight: 260, alignSelf: 'stretch' }}>
        <img src={IMAGES.somerset} alt="Glastonbury Tor" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center', display: 'block' }}/>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 12px', background: 'linear-gradient(transparent,rgba(4,47,30,.96))' }}>
          <p style={{ color: 'rgba(255,255,255,.48)', fontSize: 10, margin: 0, fontStyle: 'italic' }}>Glastonbury Tor, Somerset</p>
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 12 }}>
        <div style={tg(accent)}>About Me</div>
        <h2 style={{ ...h2s, fontSize: 22 }}>Somerset-based. Globally focused.</h2>
        <p style={{ margin: 0 }}><Rich text={CONTENT.bio}/></p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {CONTENT.education.map((e, i) => (
            <div key={i} style={{ padding: '10px 12px', background: `${accent}10`, borderRadius: 10, border: `1px solid ${accent}33` }}>
              <div style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}>{e.degree}</div>
              <div style={{ color: accent, fontSize: 11, marginTop: 2 }}>{e.school}</div>
              <div style={{ color: 'rgba(255,255,255,.42)', fontSize: 11, marginTop: 3, lineHeight: 1.7 }}>{e.note}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: '9px 12px', background: 'rgba(255,255,255,.05)', borderRadius: 10, border: '1px solid rgba(255,255,255,.08)' }}>
          <div style={{ color: 'rgba(255,255,255,.35)', fontSize: 9, marginBottom: 3, textTransform: 'uppercase', letterSpacing: '.1em' }}>Markets</div>
          <div style={{ color: '#fff', fontSize: 11, lineHeight: 1.7 }}>{CONTENT.markets}</div>
        </div>
      </div>
    </div>
  );

  if (id === 'results') return (
    <div style={{ display: 'flex', gap: 20, height: '100%' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div><div style={tg(accent)}>Key Results</div><h2 style={{ ...h2s, fontSize: 22, marginBottom: 10 }}>Measurable impact, every campaign.</h2></div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, flex: 1 }}>
          {CONTENT.stats.map(({ value, label, org, flags, subtitle }) => (
            <div key={label} style={{ background: 'rgba(255,255,255,.05)', borderRadius: 11, padding: '14px 14px', border: `1px solid ${accent}33`, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ color: accent, fontSize: 36, fontWeight: 900, lineHeight: 1 }}>{value}</div>
              <div style={{ color: '#fff', fontSize: 17, fontWeight: 600, lineHeight: 1.3 }}>{label}</div>
              {subtitle && <div style={{ color: 'rgba(255,255,255,.55)', fontSize: 13, lineHeight: 1.4 }}>{subtitle}</div>}
              <div style={{ color: 'rgba(255,255,255,.42)', fontSize: 13 }}>{org}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 2 }}>{flags.map(f => <FlagSVG key={f.code} code={f.code} name={f.name}/>)}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ flex: '0 0 235px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={tg(accent)}>Certifications & Qualifications</div>
        {CONTENT.certs.map(c => (
          <div key={c.sk} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px 10px', background: 'rgba(255,255,255,.04)', borderRadius: 10, border: `1px solid ${accent}33`, flex: 1, textAlign: 'center' }}>
            <ImageSlot accent={accent} label="Logo" height={66} width="104px" sk={c.sk} filledBg={c.filledBg}/>
            <div><div style={{ color: '#fff', fontSize: 13, fontWeight: 700, lineHeight: 1.3 }}>{c.label}</div><div style={{ color: 'rgba(255,255,255,.42)', fontSize: 11, marginTop: 3 }}>{c.org}</div></div>
          </div>
        ))}
      </div>
    </div>
  );

  if (id === 'asrs') return (
    <div style={{ display: 'flex', gap: 22, height: '100%' }}>
      <div style={{ flex: '0 0 44%', display: 'flex', flexDirection: 'column', gap: 9 }}>
        <div>
          <div style={tg(accent)}>Case Study · UK</div>
          <h2 style={{ ...h2s, fontSize: 20, marginBottom: 8 }}>Zero to 4,400% ROMI — in one year.</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <ImageSlot accent={accent} label="ASRS logo" height={42} width="64px" sk="asrs_logo"/>
            <div>
              <div style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}>{CONTENT.asrs.company}</div>
              <div style={{ color: accent, fontSize: 11, fontWeight: 600 }}>{CONTENT.asrs.role}</div>
              <div style={{ color: 'rgba(255,255,255,.38)', fontSize: 10 }}>{CONTENT.asrs.period}</div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7, flex: 1 }}>
          {CONTENT.asrs.bullets.map((b, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <span style={{ color: accent, fontWeight: 700, flexShrink: 0, fontSize: 13 }}>—</span>
              <p style={{ margin: 0 }}><Rich text={b} size={12}/></p>
            </div>
          ))}
        </div>
        <div style={{ borderLeft: `3px solid ${accent}`, paddingLeft: 12, marginTop: 4 }}>
          <p style={{ color: 'rgba(255,255,255,.85)', fontSize: 15, fontStyle: 'italic', lineHeight: 1.7, margin: '0 0 6px' }}>"{CONTENT.asrs.quote.text}"</p>
          <p style={{ color: accent, fontSize: 11, fontWeight: 600, margin: 0 }}>{CONTENT.asrs.quote.attribution}</p>
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <ImageSlot accent={accent} label="Google Ads dashboard" height={130} sk="asrs_gads"/>
        <div style={{ flex: 1, minHeight: 0 }}>
          <ImageSlot accent={accent} label="UK geo map" height={460} sk="asrs_map"/>
        </div>
      </div>
    </div>
  );

  if (id === 'asrs2') return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, height: '100%' }}>
      <div>
        <div style={tg(accent)}>SEO Performance · Google Search Console</div>
        <h2 style={{ ...h2s, fontSize: 20, marginBottom: 4 }}>Organic growth tracked across 12 months</h2>
        <p style={{ color: 'rgba(255,255,255,.42)', fontSize: 12, margin: 0, lineHeight: 1.6 }}>Search visibility, click-through rates, and keyword ranking improvements delivered alongside the paid media campaign.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, flex: 1, minHeight: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <ImageSlot accent={accent} label="SEO screenshot 1" height={500} sk="asrs_seo1"/>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <ImageSlot accent={accent} label="SEO screenshot 2" height={500} sk="asrs_seo2"/>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <ImageSlot accent={accent} label="SEO screenshot 3" height={500} sk="asrs_seo3"/>
        </div>
      </div>
    </div>
  );

  if (id === 'global') return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, height: '100%' }}>
      <div style={{ display: 'flex', gap: 22, flex: '0 0 auto' }}>
        <div style={{ flex: '0 0 38%', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div><div style={tg(accent)}>Global Campaigns · blu</div><h2 style={{ ...h2s, fontSize: 18, marginBottom: 4 }}>Campaigns that moved markets.</h2></div>
          <div style={{ background: 'rgba(255,255,255,.04)', borderRadius: 11, padding: '12px 14px', border: `1px solid ${accent}33` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 6 }}>
              <ImageSlot accent={accent} label="blu logo" height={30} width="46px" sk="blu_logo" filledBg="#fff"/>
              <div style={{ color: '#fff', fontSize: 15, fontWeight: 800 }}>
                {CONTENT.global[0].url ? <a href={CONTENT.global[0].url} target="_blank" rel="noreferrer" style={{ color: '#fff', textDecoration: 'none' }}>{CONTENT.global[0].name} ↗</a> : CONTENT.global[0].name}
              </div>
            </div>
            <div style={{ color: accent, fontSize: 12, fontWeight: 700, marginBottom: 2 }}>{CONTENT.global[0].stats}</div>
            <div style={{ color: 'rgba(255,255,255,.38)', fontSize: 10, marginBottom: 7 }}>{CONTENT.global[0].meta}</div>
            <p style={{ margin: 0, color: 'rgba(255,255,255,.68)', fontSize: 12, lineHeight: 1.6 }}>{CONTENT.global[0].role}</p>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 9 }}>
            <ImageSlot accent={accent} label="Campaign visual 1" height={195} sk="blu_v1"/>
            <ImageSlot accent={accent} label="Campaign visual 2" height={195} sk="blu_v2"/>
            <ImageSlot accent={accent} label="Campaign visual 3" height={195} sk="blu_v3"/>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, minHeight: 0 }}>
        <ImageSlot accent={accent} label="Ads manager screenshot" height={340} sk="blu_ads1"/>
      </div>
    </div>
  );

  if (id === 'global2') return (
    <div style={{ display: 'flex', gap: 22, height: '100%' }}>
      <div style={{ flex: '0 0 38%', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div><div style={tg(accent)}>Global Campaigns · Lift Like A Girl</div><h2 style={{ ...h2s, fontSize: 20, marginBottom: 4 }}>Award-winning social impact campaign.</h2></div>
        <div style={{ background: 'rgba(255,255,255,.04)', borderRadius: 11, padding: '16px 14px', border: `1px solid ${accent}33`, flex: 1 }}>
          <div style={{ color: '#fff', fontSize: 17, fontWeight: 800, marginBottom: 8 }}>{CONTENT.global[1].name}</div>
          <div style={{ color: accent, fontSize: 13, fontWeight: 700, marginBottom: 3 }}>{CONTENT.global[1].stats}</div>
          <div style={{ color: 'rgba(255,255,255,.38)', fontSize: 11, marginBottom: 10 }}>{CONTENT.global[1].meta}</div>
          <p style={{ margin: 0, color: 'rgba(255,255,255,.68)', fontSize: 13, lineHeight: 1.65 }}>{CONTENT.global[1].role}</p>
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ImageSlot accent={accent} label="Movie poster (portrait)" height={480} width="50%" sk="llg_v1" cover/>
        </div>
        <ImageSlot accent={accent} label="Netflix / wide visual (landscape)" height={160} sk="llg_v2"/>
      </div>
    </div>
  );

  if (id === 'realestate') return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, height: '100%' }}>
      <div>
        <div style={tg(accent)}>Case Study · Real Estate · Meta Ads</div>
        <h2 style={{ ...h2s, fontSize: 20, marginBottom: 4 }}>{CONTENT.realestate.heading}</h2>
        <div style={{ color: accent, fontSize: 12, fontWeight: 600, marginBottom: 3 }}>{CONTENT.realestate.projects}</div>
        <div style={{ color: 'rgba(255,255,255,.35)', fontSize: 11, marginBottom: 6 }}>{CONTENT.realestate.meta}</div>
        <p style={{ margin: 0, color: 'rgba(255,255,255,.62)', fontSize: 12, lineHeight: 1.6 }}>{CONTENT.realestate.role}</p>
      </div>
      <div style={{ display: 'flex', gap: 7 }}>
        {Array.from({ length: 7 }, (_, i) => <div key={i} style={{ flex: 1 }}><ImageSlot accent={accent} label={`Visual ${i + 1}`} height={215} sk={`re_v${i + 1}`}/></div>)}
      </div>
      <div style={{ flex: 1 }}>
        <ImageSlot accent={accent} label="Meta Ads manager screenshot" height={300} sk="re_ads1"/>
      </div>
    </div>
  );

  if (id === 'realestate2') return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, height: '100%' }}>
      <div>
        <div style={tg(accent)}>Case Study · Real Estate · Google Ads &amp; Videos</div>
        <h2 style={{ ...h2s, fontSize: 20, marginBottom: 4 }}>Google Ads performance &amp; campaign content</h2>
        <p style={{ margin: 0, color: 'rgba(255,255,255,.42)', fontSize: 12, lineHeight: 1.6 }}>Google Ads results alongside short-form video content produced to drive lead generation across digital channels.</p>
      </div>
      <ImageSlot accent={accent} label="Google Ads manager screenshot" height={220} sk="re_ads2"/>
      <div style={{ flex: 1, display: 'flex', gap: 10, alignItems: 'stretch' }}>
        {VIDEO_EMBEDS_RE.map(({ src, label }) => (
          <div key={src} style={{ flex: 1, borderRadius: 12, overflow: 'hidden', border: `1.5px solid ${accent}44`, display: 'flex', flexDirection: 'column', background: 'rgba(0,0,0,.22)' }}>
            <div style={{ background: `${accent}12`, padding: '4px 10px', fontSize: 9, color: accent, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', flexShrink: 0 }}>{label}</div>
            <iframe width="100%" style={{ aspectRatio: '3/4', display: 'block', border: 'none', flex: 1 }} src={src} allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen title={label} scrolling="no" frameBorder="0"/>
          </div>
        ))}
      </div>
    </div>
  );

  if (id === 'un') return (
    <div style={{ display: 'flex', gap: 22, height: '100%' }}>
      {/* ── LEFT COLUMN ── */}
      <div style={{ flex: '0 0 32%', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={tg(accent)}>UN · Freelance</div>

        {/* UNDRR */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ background: '#fff', borderRadius: 7, padding: '4px 7px', flexShrink: 0 }}>
              <img src={IMAGES.unLogo} alt="UN UNDRR" style={{ height: 30, display: 'block', objectFit: 'contain' }} onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}/>
            </div>
            <div>
              <div style={{ color: '#fff', fontSize: 11, fontWeight: 700, lineHeight: 1.35 }}>United Nations Office for Disaster Risk Reduction — Arab States</div>
              <div style={{ color: 'rgba(255,255,255,.4)', fontSize: 10, marginTop: 2 }}>June – September 2020</div>
            </div>
          </div>
          <p style={{ margin: 0, color: 'rgba(255,255,255,.62)', fontSize: 11, lineHeight: 1.6 }}>Led digital campaign delivery for UNDRR's regional communications team across Arab States.</p>
        </div>

        {/* Freelance */}
        <div style={{ padding: '10px 12px', background: `${accent}0e`, borderRadius: 10, border: `1px solid ${accent}30`, display: 'flex', flexDirection: 'column', gap: 5 }}>
          <div style={{ color: accent, fontSize: 11, fontWeight: 700 }}>Freelance · June 2020 – June 2023</div>
          <p style={{ margin: 0, color: 'rgba(255,255,255,.62)', fontSize: 11, lineHeight: 1.6 }}>UK, EMEA, GCC — non-profit, e-commerce, real estate, F&B, tourism, medical, cinema.</p>
        </div>
      </div>

      {/* ── RIGHT COLUMN ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 9 }}>
        {/* UNDRR images */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <ImageSlot accent={accent} label="UNDRR campaign screenshot" height={210} sk="un_1"/>
          <ImageSlot accent={accent} label="UNDRR analytics screenshot" height={210} sk="un_2"/>
        </div>
        {/* Freelance visuals 2×2 */}
        <div>
          <div style={{ color: 'rgba(255,255,255,.3)', fontSize: 9, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6 }}>Freelance visuals</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <ImageSlot accent={accent} label="Freelance visual 1" height={178} sk="un_3"/>
            <ImageSlot accent={accent} label="Freelance visual 2" height={178} sk="un_4"/>
            <ImageSlot accent={accent} label="Freelance visual 3" height={178} sk="un_fl_3"/>
            <ImageSlot accent={accent} label="Freelance visual 4" height={178} sk="un_fl_4"/>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <ImageSlot accent={accent} label="Freelance visual 5" height={128} sk="un_fl_1"/>
          <ImageSlot accent={accent} label="Freelance visual 6" height={128} sk="un_fl_2"/>
        </div>
      </div>
    </div>
  );

  if (id === 'un2') return (
    <div style={{ display: 'flex', gap: 22, height: '100%' }}>
      <div style={{ flex: '0 0 42%', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={tg(accent)}>VAAL Real Estate</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <ImageSlot accent={accent} label="VAAL logo" height={50} width="78px" sk="vaal_logo" filledBg="#fff"/>
          <div>
            <div style={{ color: '#fff', fontSize: 15, fontWeight: 700, lineHeight: 1.3 }}>VAAL Real Estate</div>
            <div style={{ color: accent, fontSize: 12, fontWeight: 600, marginTop: 2 }}>Digital Marketing Manager</div>
            <div style={{ color: 'rgba(255,255,255,.38)', fontSize: 11, marginTop: 1 }}>Oct 2021 – June 2023</div>
          </div>
        </div>
        <p style={{ margin: 0, color: 'rgba(255,255,255,.68)', fontSize: 12, lineHeight: 1.75 }}>Led remote digital marketing team and built full-funnel lead generation strategy that increased closed deals by 23% within 6 months. Full ownership of paid media, SEO, CRM, and brand campaigns across social, search, and display.</p>
        <div style={{ flex: 1 }}>
          <ImageSlot accent={accent} label="VAAL visual" height={280} sk="un_5"/>
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, borderRadius: 12, overflow: 'hidden', border: `1.5px solid ${accent}44`, display: 'flex', flexDirection: 'column', background: 'rgba(0,0,0,.22)' }}>
          <div style={{ background: `${accent}12`, color: accent, fontSize: 9, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', padding: '6px 12px', flexShrink: 0 }}>VAAL · Campaign Video</div>
          <iframe width="100%" style={{ flex: 1, display: 'block', border: 'none', minHeight: 360, aspectRatio: '16/9' }} src="https://www.youtube.com/embed/MYHsO-wVEzk" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title="VAAL Campaign Video"/>
        </div>
      </div>
    </div>
  );

  if (id === 'video') return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, height: '100%' }}>
      <div><div style={tg(accent)}>Testimonials</div><h2 style={h2s}>Reviews</h2><p style={{ color: 'rgba(255,255,255,.4)', fontSize: 12, margin: '3px 0 0' }}>What people say about me.</p></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, flex: 1 }}>
        {CONTENT.reviews.map((r, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,.04)', borderRadius: 14, padding: '20px 20px', border: `1px solid ${accent}33`, display: 'flex', flexDirection: 'column', gap: 14, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 10, right: 16, fontSize: 70, lineHeight: 1, color: `${accent}18`, fontFamily: 'Georgia, serif', fontWeight: 900, pointerEvents: 'none', userSelect: 'none' }}>"</div>
            <p style={{ color: 'rgba(255,255,255,.85)', fontSize: 15, lineHeight: 1.75, margin: 0, fontStyle: 'italic', flex: 1 }}>"{r.text}"</p>
            <div style={{ borderTop: `1px solid ${accent}28`, paddingTop: 11, marginTop: 'auto' }}>
              <div style={{ color: '#fff', fontSize: 15, fontWeight: 700 }}>{r.name}</div>
              <div style={{ color: accent, fontSize: 13, marginTop: 3 }}>{r.title}</div>
              {r.company && <div style={{ color: 'rgba(255,255,255,.38)', fontSize: 11, marginTop: 2 }}>{r.company}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (id === 'clients') return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, height: '100%' }}>
      <div><div style={tg(accent)}>Clients & Partners</div><h2 style={{ ...h2s, marginBottom: 4 }}>Trusted across 14 international markets.</h2><p style={{ margin: 0, color: 'rgba(255,255,255,.4)', fontSize: 11 }}>Hover a highlighted country to see clients.</p></div>
      <div style={{ flex: 1, position: 'relative', borderRadius: 12, overflow: 'hidden', border: `1px solid ${accent}22`, background: 'rgba(0,0,0,.18)', minHeight: 280 }}>
        <WorldMap accent={accent}/>
      </div>
      {/* Client logos — circular */}
      <div>
        <div style={{ color: accent, fontSize: 9, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 7 }}>Clients</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 6 }}>
          {Array.from({ length: 12 }, (_, i) => (
            <ImageSlot key={i} accent={accent} label={`Client ${i + 1}`} height={62} sk={`client_logo_map_${i}`} circle filledBg={CLIENT_LOGO_BGS[i]}/>
          ))}
        </div>
      </div>
      {/* Tools & Platforms logos */}
      <div>
        <div style={{ color: accent, fontSize: 9, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 7 }}>Tools &amp; Platforms</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(16, 1fr)', gap: 5 }}>
          {Array.from({ length: 16 }, (_, i) => (
            <ImageSlot key={i} accent={accent} label={`Tool ${i + 1}`} height={44} sk={`martech_logo_${i}`} circle filledBg={MARTECH_LOGO_BGS[i]}/>
          ))}
        </div>
      </div>
    </div>
  );

  if (id === 'contact') return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 12, height: '100%' }}>
      <div style={tg(accent)}>Get in Touch</div>
      <h2 style={{ ...h2s, fontSize: 28, marginBottom: 0 }}>Let's work together.</h2>
      <p style={{ color: accent, fontSize: 13, fontWeight: 600, margin: 0 }}>Available for interviews now. Open to permanent, contract, and senior freelance roles.</p>
      <p style={{ color: 'rgba(255,255,255,.65)', fontSize: 13, lineHeight: 1.7, margin: 0 }}>Specialising in performance marketing, paid media, SEO, CRM, and multi-channel strategy — across B2B, B2C, DTC and e-commerce sectors.</p>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 2 }}>
        <a href={CONTENT.linkedin} target="_blank" rel="noreferrer" style={{ color: '#fff', background: '#0a66c2', padding: '11px 18px', borderRadius: 10, fontSize: 13, fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}>LinkedIn — Moustafa Al-Etreby</a>
        <a href="https://drive.google.com/file/d/186BvDmVRY950Z4sGY-makog5GYlLqQI2/view?usp=sharing" target="_blank" rel="noreferrer" style={{ color: '#fff', background: `${accent}20`, border: `1.5px solid ${accent}55`, padding: '11px 18px', borderRadius: 10, fontSize: 13, fontWeight: 600, textDecoration: 'none', display: 'inline-block' }}>Download CV (PDF)</a>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <a href={`mailto:${CONTENT.email}`} style={{ color: '#fff', background: `${accent}15`, border: `1px solid ${accent}40`, padding: '9px 14px', borderRadius: 9, fontSize: 12, fontWeight: 600, textDecoration: 'none' }}>{CONTENT.email}</a>
        <div style={{ color: '#fff', background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', padding: '9px 14px', borderRadius: 9, fontSize: 12 }}>{CONTENT.phone}</div>
        <div style={{ color: 'rgba(255,255,255,.7)', background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', padding: '9px 14px', borderRadius: 9, fontSize: 12 }}>{CONTENT.location}</div>
      </div>
      <p style={{ color: 'rgba(255,255,255,.32)', fontSize: 10, margin: 0, borderTop: '1px solid rgba(255,255,255,.07)', paddingTop: 10 }}>Full UK work authorisation. No visa sponsorship required.</p>
    </div>
  );

  return null;
}

function MobilePortfolio() {
  const [activeNav, setActiveNav] = useState('hero');
  const primarySections = useMemo(() => (SECTIONS as readonly Section[]).filter((s: Section) => !(s as {subOf?:string}).subOf), []);
  const SEC = useMemo(() => Object.fromEntries(primarySections.map(s => [s.id, s])), [primarySections]);
  const A = (id: string) => SEC[id]?.accent ?? '#60a5fa';
  const mImg = (sk: string, accent?: string) => (
    <ImageSlot key={sk} accent={accent ?? A('hero')} label={sk} sk={sk} fluid/>
  );

  useEffect(() => {
    const ids = primarySections.map(s => `m-${s.id}`);
    const obs = new IntersectionObserver(entries => {
      for (const e of entries) { if (e.isIntersecting) setActiveNav(e.target.id.replace('m-', '')); }
    }, { threshold: 0.15 });
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [primarySections]);

  const scrollTo = (id: string) => document.getElementById(`m-${id}`)?.scrollIntoView({ behavior: 'smooth' });
  const mSep = (label: string, accent: string) => (
    <div style={{ color: 'rgba(255,255,255,.3)', fontSize: 9, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase' as const, marginTop: 20, marginBottom: 8, paddingBottom: 6, borderBottom: `1px solid ${accent}28` }}>{label}</div>
  );

  const accent = A;

  return (
    <div style={{ background: '#020817', minHeight: '100vh', fontFamily: "'Inter', system-ui, -apple-system, sans-serif", color: '#fff' }}>
      {/* Fixed header */}
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'rgba(2,8,23,.96)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px 8px' }}>
          <div style={{ flex: 1 }}>
            <div style={{ color: '#fff', fontWeight: 800, fontSize: 15 }}>Moustafa Al-Etreby</div>
            <div style={{ color: 'rgba(255,255,255,.45)', fontSize: 10 }}>{CONTENT.title}</div>
          </div>
          <a href={CONTENT.linkedin} target="_blank" rel="noreferrer" style={{ background: '#0a66c2', color: '#fff', padding: '7px 14px', borderRadius: 8, fontSize: 12, fontWeight: 700, textDecoration: 'none', flexShrink: 0 }}>LinkedIn</a>
        </div>
        <div style={{ display: 'flex', overflowX: 'auto', gap: 5, padding: '0 12px 10px', scrollbarWidth: 'none' as const }}>
          {primarySections.map(s => (
            <button key={s.id} onClick={() => scrollTo(s.id)} style={{ background: activeNav === s.id ? `${s.accent}22` : 'transparent', border: `1px solid ${activeNav === s.id ? s.accent : 'rgba(255,255,255,.14)'}`, color: activeNav === s.id ? s.accent : 'rgba(255,255,255,.5)', borderRadius: 20, padding: '5px 13px', fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap' as const, cursor: 'pointer', flexShrink: 0, transition: 'all .2s' }}>{s.label}</button>
          ))}
        </div>
      </header>

      <main style={{ paddingTop: 96, paddingBottom: 60 }}>

        {/* ── HERO ── */}
        <section id="m-hero" style={{ position: 'relative', overflow: 'hidden', paddingBottom: 40 }}>
          <img src={IMAGES.universe} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', opacity: 0.55 }}/>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(2,8,23,.55) 0%, rgba(2,8,23,.85) 60%, #020817 100%)' }}/>
          <div style={{ position: 'relative', zIndex: 1, padding: '28px 18px 0' }}>
            <ImageSlot accent={accent('hero')} label="Headshot" height={110} width="110px" sk="hero_headshot" cover circle/>
            <div style={{ color: accent('hero'), fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase' as const, marginBottom: 10 }}>{CONTENT.title}</div>
            <h1 style={{ fontSize: 42, fontWeight: 800, lineHeight: 1.06, margin: '0 0 14px', color: '#fff' }}>Moustafa<br/>Al-Etreby</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 16 }}>
              {CONTENT.tagline.split(' · ').map(t => <span key={t} style={{ background: `${accent('hero')}20`, border: `1px solid ${accent('hero')}44`, color: accent('hero'), fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 20 }}>{t}</span>)}
            </div>
            <p style={{ color: 'rgba(255,255,255,.78)', fontSize: 14, lineHeight: 1.8, margin: '0 0 10px' }}>{CONTENT.headline}</p>
            <p style={{ color: 'rgba(255,255,255,.48)', fontSize: 12, margin: '0 0 24px' }}>{CONTENT.subTagline}</p>
            <div style={{ display: 'flex', gap: 10, marginBottom: 28 }}>
              <a href={CONTENT.linkedin} target="_blank" rel="noreferrer" style={{ flex: 1, background: '#0a66c2', color: '#fff', padding: '14px 0', borderRadius: 12, fontSize: 14, fontWeight: 700, textDecoration: 'none', display: 'block', textAlign: 'center' as const }}>LinkedIn ↗</a>
              <a href="https://drive.google.com/file/d/186BvDmVRY950Z4sGY-makog5GYlLqQI2/view?usp=sharing" target="_blank" rel="noreferrer" style={{ flex: 1, background: `${accent('hero')}20`, border: `1.5px solid ${accent('hero')}55`, color: '#fff', padding: '14px 0', borderRadius: 12, fontSize: 14, fontWeight: 600, textDecoration: 'none', display: 'block', textAlign: 'center' as const }}>Download CV</a>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
              {CONTENT.stats.slice(0,3).map((st, i) => (
                <div key={i} style={{ background: `${accent('results')}18`, border: `1px solid ${accent('results')}35`, borderRadius: 14, padding: '14px 10px', textAlign: 'center' as const, backdropFilter: 'blur(8px)' }}>
                  <div style={{ color: accent('results'), fontSize: 20, fontWeight: 800 }}>{st.value}</div>
                  <div style={{ color: 'rgba(255,255,255,.6)', fontSize: 9, lineHeight: 1.4, marginTop: 4 }}>{st.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="m-about" style={{ padding: '40px 18px 40px' }}>
          <div style={{ color: accent('about'), fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase' as const, marginBottom: 12 }}>About</div>
          <h2 style={{ fontSize: 26, fontWeight: 800, margin: '0 0 16px' }}>Somerset-based. Globally focused.</h2>
          <div style={{ borderRadius: 14, overflow: 'hidden', height: 200, marginBottom: 20, position: 'relative', border: `1px solid ${accent('about')}33` }}>
            <img src={IMAGES.somerset} alt="Glastonbury Tor, Somerset" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center', display: 'block' }}/>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px', background: 'linear-gradient(transparent, rgba(4,47,30,.96))' }}>
              <p style={{ color: 'rgba(255,255,255,.48)', fontSize: 10, margin: 0, fontStyle: 'italic' }}>Glastonbury Tor, Somerset</p>
            </div>
          </div>
          <div style={{ marginBottom: 20 }}><Rich text={CONTENT.bio} size={14} color="rgba(255,255,255,.75)"/></div>
          {CONTENT.education.map((ed, i) => (
            <div key={i} style={{ background: `${accent('about')}0e`, border: `1px solid ${accent('about')}30`, borderRadius: 14, padding: '16px', marginBottom: 12 }}>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>{ed.degree}</div>
              <div style={{ color: accent('about'), fontSize: 12, marginTop: 4 }}>{ed.school}</div>
              <div style={{ color: 'rgba(255,255,255,.5)', fontSize: 11, marginTop: 4 }}>{ed.note}</div>
            </div>
          ))}
          <div style={{ background: 'rgba(255,255,255,.04)', borderRadius: 14, padding: '14px 16px' }}>
            <div style={{ color: 'rgba(255,255,255,.4)', fontSize: 10, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' as const, marginBottom: 6 }}>Markets</div>
            <div style={{ color: 'rgba(255,255,255,.7)', fontSize: 12, lineHeight: 1.8 }}>{CONTENT.markets}</div>
          </div>
        </section>

        {/* ── RESULTS ── */}
        <section id="m-results" style={{ padding: '0 18px 40px' }}>
          <div style={{ color: accent('results'), fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase' as const, marginBottom: 12 }}>Results</div>
          <h2 style={{ fontSize: 26, fontWeight: 800, margin: '0 0 16px' }}>Measurable Impact</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {CONTENT.stats.map((st, i) => (
              <div key={i} style={{ background: `${accent('results')}0c`, border: `1px solid ${accent('results')}30`, borderRadius: 16, padding: '16px 14px' }}>
                <div style={{ color: accent('results'), fontSize: 26, fontWeight: 800 }}>{st.value}</div>
                <div style={{ color: '#fff', fontSize: 13, fontWeight: 600, marginTop: 4 }}>{st.label}</div>
                <div style={{ color: 'rgba(255,255,255,.4)', fontSize: 10, marginTop: 2 }}>{st.org}</div>
                {st.subtitle && <div style={{ color: 'rgba(255,255,255,.45)', fontSize: 9, marginTop: 4 }}>{st.subtitle}</div>}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 8 }}>
                  {st.flags.map(f => <FlagSVG key={f.code} code={f.code} name={f.name}/>)}
                </div>
              </div>
            ))}
          </div>
          {mSep('Certifications & Qualifications', accent('results'))}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {CONTENT.certs.map((c, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,.04)', border: `1px solid ${accent('results')}28`, borderRadius: 14, padding: '14px', textAlign: 'center' as const }}>
                <ImageSlot accent={accent('results')} label={c.label} height={50} sk={c.sk} filledBg={c.filledBg}/>
                <div style={{ color: '#fff', fontSize: 12, fontWeight: 700, marginTop: 8 }}>{c.label}</div>
                <div style={{ color: 'rgba(255,255,255,.4)', fontSize: 10, marginTop: 2 }}>{c.org}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── UK WORK ── */}
        <section id="m-asrs" style={{ padding: '0 18px 40px' }}>
          <div style={{ color: accent('asrs'), fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase' as const, marginBottom: 12 }}>UK Work</div>
          <h2 style={{ fontSize: 26, fontWeight: 800, margin: '0 0 12px' }}>Zero to 4,400% ROMI — in one year.</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, background: `${accent('asrs')}0a`, borderRadius: 12, padding: '12px 14px', border: `1px solid ${accent('asrs')}28` }}>
            <ImageSlot accent={accent('asrs')} label="ASRS logo" height={42} width="64px" sk="asrs_logo"/>
            <div>
              <div style={{ color: '#fff', fontSize: 14, fontWeight: 700 }}>{CONTENT.asrs.company}</div>
              <div style={{ color: accent('asrs'), fontSize: 12, fontWeight: 600 }}>{CONTENT.asrs.role}</div>
              <div style={{ color: 'rgba(255,255,255,.4)', fontSize: 11 }}>{CONTENT.asrs.period}</div>
            </div>
          </div>
          {CONTENT.asrs.bullets.map((b, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10 }}>
              <span style={{ color: accent('asrs'), fontWeight: 700, fontSize: 16, lineHeight: 1, flexShrink: 0, marginTop: 2 }}>—</span>
              <div style={{ fontSize: 14, lineHeight: 1.7 }}><Rich text={b} size={14} color="rgba(255,255,255,.78)"/></div>
            </div>
          ))}
          <div style={{ borderLeft: `3px solid ${accent('asrs')}`, paddingLeft: 14, margin: '18px 0', fontStyle: 'italic' }}>
            <p style={{ color: 'rgba(255,255,255,.85)', fontSize: 14, margin: '0 0 6px', lineHeight: 1.75 }}>"{CONTENT.asrs.quote.text}"</p>
            <p style={{ color: accent('asrs'), fontSize: 11, fontWeight: 600, margin: 0 }}>{CONTENT.asrs.quote.attribution}</p>
          </div>
          {mSep('Campaign Screenshots', accent('asrs'))}
          {['asrs_1','asrs_2','asrs_3','asrs_4'].map(sk => <div key={sk} style={{ marginBottom: 8 }}>{mImg(sk, accent('asrs'))}</div>)}
          {mSep('Rankings & Performance', accent('asrs'))}
          {['asrs_rank1','asrs_rank2','asrs_gads'].map(sk => <div key={sk} style={{ marginBottom: 8 }}>{mImg(sk, accent('asrs'))}</div>)}
          <div style={{ marginBottom: 8 }}>{mImg('asrs_map', accent('asrs'))}</div>
          {mSep('SEO · Google Search Console', accent('asrs'))}
          {['asrs_seo1','asrs_seo2','asrs_seo3'].map(sk => <div key={sk} style={{ marginBottom: 8 }}>{mImg(sk, accent('asrs'))}</div>)}
        </section>

        {/* ── CAMPAIGNS ── */}
        <section id="m-global" style={{ padding: '0 18px 40px' }}>
          <div style={{ color: accent('global'), fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase' as const, marginBottom: 12 }}>Campaigns</div>
          <h2 style={{ fontSize: 26, fontWeight: 800, margin: '0 0 16px' }}>Global Campaigns</h2>

          {/* blu */}
          <div style={{ background: 'rgba(255,255,255,.04)', border: `1px solid ${accent('global')}30`, borderRadius: 16, padding: '16px', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <ImageSlot accent={accent('global')} label="blu logo" height={28} width="44px" sk="blu_logo" filledBg="#fff"/>
              <div style={{ color: '#fff', fontSize: 17, fontWeight: 800 }}>{CONTENT.global[0].name}</div>
            </div>
            <div style={{ color: accent('global'), fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{CONTENT.global[0].stats}</div>
            <div style={{ color: 'rgba(255,255,255,.4)', fontSize: 11, marginBottom: 8 }}>{CONTENT.global[0].meta}</div>
            <p style={{ color: 'rgba(255,255,255,.72)', fontSize: 13, lineHeight: 1.7, margin: 0 }}>{CONTENT.global[0].role}</p>
          </div>
          {mSep('blu · Campaign Visuals', accent('global'))}
          {['blu_v1','blu_v2','blu_v3'].map(sk => <div key={sk} style={{ marginBottom: 8 }}>{mImg(sk, accent('global'))}</div>)}
          {mSep('blu · Meta Ads Manager', accent('global'))}
          <div style={{ marginBottom: 8 }}>{mImg('blu_ads1', accent('global'))}</div>

          {/* Lift Like A Girl */}
          {mSep('Lift Like A Girl', accent('global'))}
          <div style={{ background: 'rgba(255,255,255,.04)', border: `1px solid ${accent('global')}30`, borderRadius: 16, padding: '16px', marginBottom: 14 }}>
            <div style={{ color: '#fff', fontSize: 17, fontWeight: 800, marginBottom: 6 }}>
              <a href={CONTENT.global[1].url} target="_blank" rel="noreferrer" style={{ color: '#fff', textDecoration: 'none' }}>{CONTENT.global[1].name} ↗</a>
            </div>
            <div style={{ color: accent('global'), fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{CONTENT.global[1].stats}</div>
            <div style={{ color: 'rgba(255,255,255,.4)', fontSize: 11, marginBottom: 8 }}>{CONTENT.global[1].meta}</div>
            <p style={{ color: 'rgba(255,255,255,.72)', fontSize: 13, lineHeight: 1.7, margin: 0 }}>{CONTENT.global[1].role}</p>
          </div>
          {['llag_1','llag_2','llg_v1','llg_v2'].map(sk => <div key={sk} style={{ marginBottom: 8 }}>{mImg(sk, accent('global'))}</div>)}

        </section>

        {/* ── REAL ESTATE ── */}
        <section id="m-realestate" style={{ padding: '0 18px 40px' }}>
          <div style={{ color: accent('realestate'), fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase' as const, marginBottom: 12 }}>Real Estate</div>
          <h2 style={{ fontSize: 26, fontWeight: 800, margin: '0 0 8px' }}>{CONTENT.realestate.heading}</h2>
          <div style={{ color: accent('realestate'), fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{CONTENT.realestate.projects}</div>
          <div style={{ color: 'rgba(255,255,255,.45)', fontSize: 12, marginBottom: 10 }}>{CONTENT.realestate.meta}</div>
          <p style={{ color: 'rgba(255,255,255,.72)', fontSize: 14, lineHeight: 1.75, margin: '0 0 16px' }}>{CONTENT.realestate.role}</p>
          {mSep('Campaign Visuals', accent('realestate'))}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
            {['re_1','re_2','re_3','re_4','re_v5','re_v6'].map(sk => (
              <ImageSlot key={sk} accent={accent('realestate')} label={sk} sk={sk} fluid/>
            ))}
          </div>
          {mSep('Meta Ads Manager', accent('realestate'))}
          <div style={{ marginBottom: 8 }}>{mImg('re_ads1', accent('realestate'))}</div>
          {mSep('Google Ads Manager', accent('realestate'))}
          <div style={{ marginBottom: 8 }}>{mImg('re_ads2', accent('realestate'))}</div>
          {mSep('Campaign Videos', accent('realestate'))}
          {VIDEO_EMBEDS_RE.map(({ src, label }) => (
            <div key={src} style={{ borderRadius: 12, overflow: 'hidden', border: `1.5px solid ${accent('realestate')}44`, marginBottom: 12, background: 'rgba(0,0,0,.22)' }}>
              <div style={{ background: `${accent('realestate')}12`, padding: '5px 12px', fontSize: 9, color: accent('realestate'), fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase' as const }}>{label}</div>
              <iframe width="100%" style={{ aspectRatio: '3/4', display: 'block', border: 'none' }} src={src} allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen title={label} scrolling="no" frameBorder="0"/>
            </div>
          ))}
        </section>

        {/* ── GLOBAL / UN + FREELANCE + VAAL ── */}
        <section id="m-un" style={{ padding: '0 18px 40px' }}>
          <div style={{ color: accent('un'), fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase' as const, marginBottom: 12 }}>Global</div>
          <h2 style={{ fontSize: 26, fontWeight: 800, margin: '0 0 16px' }}>UN, Freelance &amp; VAAL</h2>

          {/* UNDRR */}
          <div style={{ background: 'rgba(255,255,255,.04)', border: `1px solid ${accent('un')}30`, borderRadius: 16, padding: '16px', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <div style={{ background: '#fff', borderRadius: 7, padding: '4px 7px', flexShrink: 0 }}>
                <img src={IMAGES.unLogo} alt="UNDRR" style={{ height: 26, display: 'block', objectFit: 'contain' as const }} onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}/>
              </div>
              <div>
                <div style={{ color: '#fff', fontSize: 12, fontWeight: 700 }}>UN Office for Disaster Risk Reduction — Arab States</div>
                <div style={{ color: 'rgba(255,255,255,.4)', fontSize: 10 }}>June – September 2020</div>
              </div>
            </div>
            <p style={{ color: 'rgba(255,255,255,.72)', fontSize: 13, lineHeight: 1.7, margin: 0 }}>Led digital campaign delivery for UNDRR's regional communications team. Paid media campaigns targeting policy and public audiences across Arab States.</p>
          </div>
          {mSep('UNDRR Screenshots', accent('un'))}
          {['un_1','un_2'].map(sk => <div key={sk} style={{ marginBottom: 8 }}>{mImg(sk, accent('un'))}</div>)}

          {/* Freelance */}
          {mSep('Freelance Digital Marketing', accent('un'))}
          <div style={{ background: `${accent('un')}0e`, border: `1px solid ${accent('un')}30`, borderRadius: 14, padding: '14px 16px', marginBottom: 14 }}>
            <div style={{ color: accent('un'), fontSize: 12, fontWeight: 700, marginBottom: 6 }}>Freelance · June 2020 – June 2023</div>
            <p style={{ color: 'rgba(255,255,255,.72)', fontSize: 13, lineHeight: 1.7, margin: 0 }}>UK, EMEA, and GCC — non-profit, e-commerce, real estate, petroleum, F&B, retail, tourism, medical, beauty, cinema, and mobile apps.</p>
          </div>
          {['un_3','un_4','un_fl_3','un_fl_4','un_fl_1','un_fl_2'].map(sk => <div key={sk} style={{ marginBottom: 8 }}>{mImg(sk, accent('un'))}</div>)}

          {/* VAAL Real Estate */}
          {mSep('VAAL Real Estate', accent('un'))}
          <div style={{ background: 'rgba(255,255,255,.04)', border: `1px solid ${accent('un')}30`, borderRadius: 16, padding: '16px', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <ImageSlot accent={accent('un')} label="VAAL logo" height={44} width="68px" sk="vaal_logo" filledBg="#fff"/>
              <div>
                <div style={{ color: '#fff', fontSize: 15, fontWeight: 700 }}>VAAL Real Estate</div>
                <div style={{ color: accent('un'), fontSize: 12, fontWeight: 600 }}>Digital Marketing Manager</div>
                <div style={{ color: 'rgba(255,255,255,.38)', fontSize: 11 }}>Oct 2021 – June 2023</div>
              </div>
            </div>
            <p style={{ color: 'rgba(255,255,255,.72)', fontSize: 13, lineHeight: 1.75, margin: 0 }}>Led remote digital marketing team and built full-funnel lead generation strategy that increased closed deals by 23% within 6 months. Full ownership of paid media, SEO, CRM, and brand campaigns across social, search, and display.</p>
          </div>
          <div style={{ marginBottom: 12 }}>{mImg('un_5', accent('un'))}</div>
          <div style={{ borderRadius: 12, overflow: 'hidden', border: `1.5px solid ${accent('un')}44`, background: 'rgba(0,0,0,.22)' }}>
            <div style={{ background: `${accent('un')}12`, color: accent('un'), fontSize: 9, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' as const, padding: '6px 12px' }}>VAAL · Campaign Video</div>
            <iframe width="100%" style={{ aspectRatio: '16/9', display: 'block', border: 'none' }} src="https://www.youtube.com/embed/MYHsO-wVEzk" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title="VAAL Campaign Video"/>
          </div>
        </section>

        {/* ── REVIEWS ── */}
        <section id="m-video" style={{ padding: '40px 18px 40px' }}>
          <div style={{ color: accent('video'), fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase' as const, marginBottom: 12 }}>Reviews</div>
          <h2 style={{ fontSize: 26, fontWeight: 800, margin: '0 0 16px' }}>What People Say</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {CONTENT.reviews.map((r, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,.04)', border: `1px solid ${accent('video')}33`, borderRadius: 16, padding: '18px 16px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 8, right: 14, fontSize: 60, lineHeight: 1, color: `${accent('video')}18`, fontFamily: 'Georgia, serif', fontWeight: 900, pointerEvents: 'none', userSelect: 'none' as const }}>"</div>
                <p style={{ color: 'rgba(255,255,255,.85)', fontSize: 14, lineHeight: 1.8, margin: '0 0 14px', fontStyle: 'italic' }}>"{r.text}"</p>
                <div style={{ borderTop: `1px solid ${accent('video')}28`, paddingTop: 10 }}>
                  <div style={{ color: '#fff', fontSize: 14, fontWeight: 700 }}>{r.name}</div>
                  <div style={{ color: accent('video'), fontSize: 12, marginTop: 2 }}>{r.title}</div>
                  {r.company && <div style={{ color: 'rgba(255,255,255,.38)', fontSize: 10, marginTop: 2 }}>{r.company}</div>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CLIENTS ── */}
        <section id="m-clients" style={{ padding: '0 18px 40px' }}>
          <div style={{ color: accent('clients'), fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase' as const, marginBottom: 12 }}>Clients</div>
          <h2 style={{ fontSize: 26, fontWeight: 800, margin: '0 0 4px' }}>Trusted Across 14 Markets</h2>
          <p style={{ color: 'rgba(255,255,255,.4)', fontSize: 12, margin: '0 0 16px' }}>Tap a highlighted country to see clients.</p>
          <div style={{ position: 'relative', height: 340, borderRadius: 12, overflow: 'hidden', border: `1px solid ${accent('clients')}22`, background: 'rgba(0,0,0,.18)', marginBottom: 20 }}>
            <WorldMap accent={accent('clients')}/>
          </div>
          <div style={{ color: accent('clients'), fontSize: 9, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' as const, marginBottom: 8 }}>Clients</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 20 }}>
            {Array.from({ length: 12 }, (_, i) => (
              <ImageSlot key={i} accent={accent('clients')} label={`Client ${i + 1}`} height={62} sk={`client_logo_map_${i}`} circle filledBg={CLIENT_LOGO_BGS[i]}/>
            ))}
          </div>
          <div style={{ color: accent('clients'), fontSize: 9, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' as const, marginBottom: 8 }}>Tools &amp; Platforms</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
            {Array.from({ length: 16 }, (_, i) => (
              <ImageSlot key={i} accent={accent('clients')} label={`Tool ${i + 1}`} height={44} sk={`martech_logo_${i}`} circle filledBg={MARTECH_LOGO_BGS[i]}/>
            ))}
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="m-contact" style={{ padding: '0 18px 60px' }}>
          <div style={{ color: accent('contact'), fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase' as const, marginBottom: 12 }}>Contact</div>
          <h2 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px' }}>Let's work together.</h2>
          <p style={{ color: accent('contact'), fontSize: 14, fontWeight: 600, margin: '0 0 6px' }}>Available for interviews now. Open to permanent, contract, and senior freelance roles.</p>
          <p style={{ color: 'rgba(255,255,255,.65)', fontSize: 13, lineHeight: 1.75, margin: '0 0 20px' }}>Specialising in performance marketing, paid media, SEO, CRM, and multi-channel strategy — across B2B, B2C, DTC and e-commerce sectors.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            <a href={CONTENT.linkedin} target="_blank" rel="noreferrer" style={{ background: '#0a66c2', color: '#fff', padding: '14px 18px', borderRadius: 12, fontSize: 14, fontWeight: 700, textDecoration: 'none', display: 'block', textAlign: 'center' as const }}>LinkedIn — Moustafa Al-Etreby</a>
            <a href="https://drive.google.com/file/d/186BvDmVRY950Z4sGY-makog5GYlLqQI2/view?usp=sharing" target="_blank" rel="noreferrer" style={{ background: `${accent('contact')}20`, border: `1.5px solid ${accent('contact')}55`, color: '#fff', padding: '14px 18px', borderRadius: 12, fontSize: 14, fontWeight: 600, textDecoration: 'none', display: 'block', textAlign: 'center' as const }}>Download CV (PDF)</a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <a href={`mailto:${CONTENT.email}`} style={{ color: '#fff', background: `${accent('contact')}15`, border: `1px solid ${accent('contact')}40`, padding: '13px 16px', borderRadius: 10, fontSize: 14, fontWeight: 600, textDecoration: 'none', display: 'block' }}>{CONTENT.email}</a>
            <div style={{ color: '#fff', background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', padding: '13px 16px', borderRadius: 10, fontSize: 14 }}>{CONTENT.phone}</div>
            <div style={{ color: 'rgba(255,255,255,.7)', background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', padding: '13px 16px', borderRadius: 10, fontSize: 13 }}>{CONTENT.location}</div>
          </div>
          <p style={{ color: 'rgba(255,255,255,.32)', fontSize: 10, marginTop: 16, borderTop: '1px solid rgba(255,255,255,.07)', paddingTop: 10 }}>Full UK work authorisation. No visa sponsorship required.</p>
        </section>

      </main>
    </div>
  );
}

function WorldMap({ accent }: { accent: string }) {
  const [tooltip, setTooltip] = useState<{ name: string; clients: string[]; x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={containerRef} style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none', zIndex: 1 }}/>
      {/* @ts-ignore */}
      <ComposableMap projection="geoNaturalEarth1" style={{ width: '100%', height: '100%' }}>
        {/* @ts-ignore */}
        <Geographies geography={GEO_URL}>
          {({ geographies }: { geographies: any[] }) =>
            geographies.map((geo: any) => {
              const geoId = String(geo.id);
              const data = WORLD_MARKET_DATA[geoId] ?? WORLD_MARKET_DATA[geoId.padStart(3, '0')] ?? WORLD_MARKET_DATA[String(parseInt(geoId, 10))];
              return (
                // @ts-ignore
                <Geography key={geo.rsmKey} geography={geo} fill={data ? `${accent}cc` : 'rgba(255,255,255,0.06)'} stroke={data ? `${accent}55` : 'rgba(255,255,255,0.15)'} strokeWidth={0.5}
                  style={{ default: { outline: 'none' }, hover: { outline: 'none', fill: data ? '#fff' : 'rgba(255,255,255,0.14)', cursor: data ? 'pointer' : 'default' }, pressed: { outline: 'none' } }}
                  onMouseEnter={(evt: any) => { if (!data) return; const rect = containerRef.current?.getBoundingClientRect() ?? { left: 0, top: 0 }; setTooltip({ name: data.name, clients: data.clients, x: evt.clientX - rect.left, y: evt.clientY - rect.top }); }}
                  onMouseLeave={() => setTooltip(null)}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
      {tooltip && (() => {
        const cw = containerRef.current?.offsetWidth ?? 600, ch = containerRef.current?.offsetHeight ?? 400;
        const boxW = 220, boxH = Math.min(28 + tooltip.clients.length * 16 + 16, ch - 20);
        const pinRight = tooltip.x < cw * 0.6;
        const boxX = pinRight ? Math.min(cw - boxW - 10, tooltip.x + 60) : Math.max(10, tooltip.x - boxW - 60);
        const boxY = Math.max(8, Math.min(tooltip.y - boxH / 2, ch - boxH - 8));
        const lineX2 = pinRight ? boxX : boxX + boxW, lineY2 = boxY + boxH / 2;
        return (
          <>
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 10 }}>
              <line x1={tooltip.x} y1={tooltip.y} x2={lineX2} y2={lineY2} stroke={accent} strokeWidth="1.5" strokeDasharray="4 3" opacity="0.7"/>
              <circle cx={tooltip.x} cy={tooltip.y} r="4" fill={accent} opacity="0.9"/>
            </svg>
            <div style={{ position: 'absolute', left: boxX, top: boxY, width: boxW, background: 'rgba(2,8,23,.97)', border: `1.5px solid ${accent}`, borderRadius: 8, padding: '9px 13px', zIndex: 11, pointerEvents: 'none', boxShadow: `0 0 20px ${accent}33, 0 6px 28px rgba(0,0,0,.8)`, backdropFilter: 'blur(12px)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8, paddingBottom: 6, borderBottom: `1px solid ${accent}33` }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: accent, boxShadow: `0 0 6px ${accent}`, flexShrink: 0 }}/>
                <div style={{ color: accent, fontSize: 11, fontWeight: 800, letterSpacing: '.06em', textTransform: 'uppercase' }}>{tooltip.name}</div>
              </div>
              {tooltip.clients.map((c: string, i: number) => (
                <div key={i} style={{ color: 'rgba(255,255,255,.78)', fontSize: 10, lineHeight: 1.6, paddingLeft: 8, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: accent, fontWeight: 700 }}>›</span>{c}
                </div>
              ))}
            </div>
          </>
        );
      })()}
    </div>
  );
}

function Minimap({ view, active, nav }: { view: { tx: number; ty: number; scale: number }; active: string; nav: (s: Section) => void }) {
  const MW = 150, MH = 100, scX = MW / UW, scY = MH / UH;
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title="Constellation map — click a node to navigate"
      style={{ position: 'fixed', bottom: 16, right: 16, zIndex: 300, width: MW, height: MH, background: 'rgba(2,8,23,.88)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 8, overflow: 'hidden', backdropFilter: 'blur(8px)', transition: 'opacity .3s', opacity: hovered ? 0.12 : 0.82 }}
    >
      <img src={IMAGES.universe} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: .3 }}/>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        {CONNECTIONS.map(([a, b], i) => { const f = SECTIONS.find(s => s.id === a)!, t = SECTIONS.find(s => s.id === b)!; return <line key={i} x1={f.nx * scX} y1={f.ny * scY} x2={t.nx * scX} y2={t.ny * scY} stroke="rgba(255,255,255,.16)" strokeWidth=".9"/>; })}
      </svg>
      {SECTIONS.map(s => <button key={s.id} onClick={() => nav(s)} title={s.label} style={{ position: 'absolute', left: s.nx * scX - (active === s.id ? 5 : 3), top: s.ny * scY - (active === s.id ? 5 : 3), width: active === s.id ? 10 : 6, height: active === s.id ? 10 : 6, borderRadius: '50%', background: s.accent, boxShadow: `0 0 5px ${s.accent}`, border: 'none', cursor: 'pointer', padding: 0, transition: 'all .3s' }}/>)}
      <div style={{ position: 'absolute', bottom: 3, left: 6, color: 'rgba(255,255,255,.2)', fontSize: 6, letterSpacing: '.06em' }}>CLICK TO NAVIGATE</div>
    </div>
  );
}

export function StarMapPortfolio() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return isMobile ? <MobilePortfolio /> : <DesktopPortfolio />;
}

export default StarMapPortfolio;
