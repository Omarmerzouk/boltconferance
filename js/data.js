// Sample event data
const EVENTS_DATA = [
  {
    id: 1,
    title: "Conférence Intelligence Artificielle 2024",
    description: "Découvrez les dernières avancées en IA avec des experts internationaux. Conférences, ateliers et démonstrations sur les technologies d'IA les plus récentes.",
    image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg",
    type: "conference",
    format: "presentiel",
    date: "2024-06-15T09:30:00",
    location: {
      city: "San Francisco",
      country: "États-Unis",
      address: "123 Tech Avenue"
    },
    price: 299,
    organizer: {
      name: "TechEvents Inc.",
      logo: "https://ui-avatars.com/api/?name=Tech+Events&background=0D8ABC&color=fff"
    },
    participants: 850,
    rating: {
      score: 4.8,
      count: 127
    },
    isFeatured: true
  },
  {
    id: 2,
    title: "Workshop Digital Marketing",
    description: "Maîtrisez les stratégies de marketing digital moderne avec des exercices pratiques et des études de cas réels. Développez votre audience en ligne efficacement.",
    image: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg",
    type: "workshop",
    format: "en-ligne",
    date: "2024-06-20T10:00:00",
    location: {
      city: "Londres",
      country: "Royaume-Uni",
      address: "Virtual Event"
    },
    price: 149,
    organizer: {
      name: "Digital Academy",
      logo: "https://ui-avatars.com/api/?name=Digital+Academy&background=2563EB&color=fff"
    },
    participants: 245,
    rating: {
      score: 4.6,
      count: 89
    },
    isFeatured: true
  },
  {
    id: 3,
    title: "Séminaire Innovation Durable",
    description: "Comment les entreprises peuvent innover tout en respectant l'environnement. Découvrez les pratiques durables qui transforment les industries.",
    image: "https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg",
    type: "seminaire",
    format: "presentiel",
    date: "2024-07-10T09:00:00",
    location: {
      city: "Stockholm",
      country: "Suède",
      address: "45 Green Innovation Park"
    },
    price: 0,
    organizer: {
      name: "GreenTech Solutions",
      logo: "https://ui-avatars.com/api/?name=Green+Tech&background=10B981&color=fff"
    },
    participants: 320,
    rating: {
      score: 4.9,
      count: 156
    },
    isFeatured: true
  },
  {
    id: 4,
    title: "Formation Cybersécurité",
    description: "Apprenez à protéger votre entreprise contre les cybermenaces avec les meilleures pratiques et outils de sécurité informatique actuels.",
    image: "https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg",
    type: "formation",
    format: "presentiel",
    date: "2024-07-25T09:00:00",
    location: {
      city: "Berlin",
      country: "Allemagne",
      address: "78 Security Boulevard"
    },
    price: 399,
    organizer: {
      name: "CyberSafe Institute",
      logo: "https://ui-avatars.com/api/?name=Cyber+Safe&background=DC2626&color=fff"
    },
    participants: 150,
    rating: {
      score: 4.7,
      count: 67
    },
    isFeatured: true
  },
  {
    id: 5,
    title: "Networking Startups Paris",
    description: "Rencontrez les entrepreneurs les plus prometteurs de Paris. Événement de networking pour connecter investisseurs, fondateurs et talents.",
    image: "https://images.pexels.com/photos/1243337/pexels-photo-1243337.jpeg",
    type: "networking",
    format: "presentiel",
    date: "2024-06-30T18:30:00",
    location: {
      city: "Paris",
      country: "France",
      address: "15 Rue de l'Innovation"
    },
    price: 25,
    organizer: {
      name: "Startup Network",
      logo: "https://ui-avatars.com/api/?name=Startup+Network&background=8B5CF6&color=fff"
    },
    participants: 180,
    rating: {
      score: 4.4,
      count: 92
    },
    isFeatured: true
  },
  {
    id: 6,
    title: "Conférence Blockchain & Web3",
    description: "Explorez l'avenir décentralisé du web avec les pionniers de la blockchain et du Web3. Sessions sur les NFTs, DeFi, et métavers.",
    image: "https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg",
    type: "conference",
    format: "en-ligne",
    date: "2024-08-05T10:00:00",
    location: {
      city: "Zurich",
      country: "Suisse",
      address: "Virtual Event"
    },
    price: 199,
    organizer: {
      name: "Crypto Events",
      logo: "https://ui-avatars.com/api/?name=Crypto+Events&background=0E76FD&color=fff"
    },
    participants: 450,
    rating: {
      score: 4.5,
      count: 203
    },
    isFeatured: true
  },
  {
    id: 7,
    title: "Workshop UX Design",
    description: "Perfectionnez vos compétences en conception d'expérience utilisateur avec des méthodes de design thinking et des outils modernes.",
    image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg",
    type: "workshop",
    format: "presentiel",
    date: "2024-09-12T09:00:00",
    location: {
      city: "Amsterdam",
      country: "Pays-Bas",
      address: "67 Design Street"
    },
    price: 249,
    organizer: {
      name: "UX Masters",
      logo: "https://ui-avatars.com/api/?name=UX+Masters&background=7C3AED&color=fff"
    },
    participants: 60,
    rating: {
      score: 4.7,
      count: 45
    },
    isFeatured: false
  },
  {
    id: 8,
    title: "Séminaire Leadership & Management",
    description: "Développez vos compétences en leadership et apprenez à gérer efficacement des équipes dans un environnement de travail en constante évolution.",
    image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg",
    type: "seminaire",
    format: "presentiel",
    date: "2024-10-05T09:30:00",
    location: {
      city: "Genève",
      country: "Suisse",
      address: "23 Leaders Avenue"
    },
    price: 450,
    organizer: {
      name: "Leadership Institute",
      logo: "https://ui-avatars.com/api/?name=Leadership+Institute&background=4F46E5&color=fff"
    },
    participants: 120,
    rating: {
      score: 4.9,
      count: 52
    },
    isFeatured: false
  },
  {
    id: 9,
    title: "Formation Digital Transformation",
    description: "Accompagnez la transformation digitale de votre entreprise avec les bonnes stratégies et outils. Adaptez votre business à l'ère numérique.",
    image: "https://images.pexels.com/photos/7988079/pexels-photo-7988079.jpeg",
    type: "formation",
    format: "presentiel",
    date: "2025-03-05T09:30:00",
    location: {
      city: "Prague",
      country: "République Tchèque",
      address: "45 Transform Street"
    },
    price: 325,
    organizer: {
      name: "Digital Transform",
      logo: "https://ui-avatars.com/api/?name=Digital+Transform&background=0891B2&color=fff"
    },
    participants: 150,
    rating: {
      score: 4.5,
      count: 76
    },
    isFeatured: false
  },
  {
    id: 10,
    title: "DevOps & Cloud Summit",
    description: "Explorez les dernières pratiques en matière de DevOps et les innovations dans le cloud computing. Ateliers pratiques et sessions expertes.",
    image: "https://images.pexels.com/photos/1772123/pexels-photo-1772123.jpeg",
    type: "conference",
    format: "presentiel",
    date: "2024-11-15T08:30:00",
    location: {
      city: "Munich",
      country: "Allemagne",
      address: "88 Cloud Boulevard"
    },
    price: 349,
    organizer: {
      name: "Cloud Innovators",
      logo: "https://ui-avatars.com/api/?name=Cloud+Innovators&background=3B82F6&color=fff"
    },
    participants: 280,
    rating: {
      score: 4.6,
      count: 112
    },
    isFeatured: false
  },
  // Plus d'événements
  {
    id: 11,
    title: "Data Science Conference",
    description: "Plongez dans le monde de la data science, du machine learning et de l'analytique avancée avec des experts du secteur.",
    image: "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg",
    type: "conference",
    format: "en-ligne",
    date: "2024-08-20T09:00:00",
    location: {
      city: "New York",
      country: "États-Unis",
      address: "Virtual Event"
    },
    price: 199,
    organizer: {
      name: "Data Science Alliance",
      logo: "https://ui-avatars.com/api/?name=Data+Science+Alliance&background=6366F1&color=fff"
    },
    participants: 500,
    rating: {
      score: 4.6,
      count: 89
    },
    isFeatured: false
  },
  {
    id: 12,
    title: "E-commerce Optimization Workshop",
    description: "Optimisez votre boutique en ligne avec les meilleures pratiques de conversion, SEO et expérience client pour maximiser vos ventes.",
    image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg",
    type: "workshop",
    format: "presentiel",
    date: "2024-09-05T10:00:00",
    location: {
      city: "Barcelone",
      country: "Espagne",
      address: "45 Commerce Street"
    },
    price: 189,
    organizer: {
      name: "E-commerce Experts",
      logo: "https://ui-avatars.com/api/?name=Ecommerce+Experts&background=F59E0B&color=fff"
    },
    participants: 95,
    rating: {
      score: 4.7,
      count: 38
    },
    isFeatured: false
  },
  {
    id: 13,
    title: "HR Innovation Forum",
    description: "Découvrez comment transformer vos pratiques RH avec les technologies modernes et les approches centrées sur l'humain.",
    image: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg",
    type: "seminaire",
    format: "presentiel",
    date: "2024-10-12T09:30:00",
    location: {
      city: "Vienne",
      country: "Autriche",
      address: "17 HR Boulevard"
    },
    price: 275,
    organizer: {
      name: "HR Innovators",
      logo: "https://ui-avatars.com/api/?name=HR+Innovators&background=EC4899&color=fff"
    },
    participants: 185,
    rating: {
      score: 4.5,
      count: 62
    },
    isFeatured: false
  },
  {
    id: 14,
    title: "Growth Hacking Masterclass",
    description: "Accélérez la croissance de votre startup avec des techniques de growth hacking éprouvées et des stratégies d'acquisition innovantes.",
    image: "https://images.pexels.com/photos/7256897/pexels-photo-7256897.jpeg",
    type: "formation",
    format: "en-ligne",
    date: "2024-07-15T14:00:00",
    location: {
      city: "Dublin",
      country: "Irlande",
      address: "Virtual Event"
    },
    price: 149,
    organizer: {
      name: "Growth Accelerator",
      logo: "https://ui-avatars.com/api/?name=Growth+Accelerator&background=10B981&color=fff"
    },
    participants: 220,
    rating: {
      score: 4.8,
      count: 94
    },
    isFeatured: false
  },
  {
    id: 15,
    title: "Product Management Summit",
    description: "Perfectionnez vos compétences en gestion de produit avec des ateliers et des conférences animés par des leaders de l'industrie tech.",
    image: "https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg",
    type: "conference",
    format: "presentiel",
    date: "2024-11-08T09:00:00",
    location: {
      city: "Milan",
      country: "Italie",
      address: "78 Product Avenue"
    },
    price: 299,
    organizer: {
      name: "Product Leaders",
      logo: "https://ui-avatars.com/api/?name=Product+Leaders&background=3B82F6&color=fff"
    },
    participants: 240,
    rating: {
      score: 4.7,
      count: 71
    },
    isFeatured: false
  },
  {
    id: 16,
    title: "Green Tech Innovation Forum",
    description: "Explorez les dernières technologies vertes et durables qui transforment les industries et contribuent à un avenir plus écologique.",
    image: "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg",
    type: "conference",
    format: "presentiel",
    date: "2024-09-28T09:30:00",
    location: {
      city: "Oslo",
      country: "Norvège",
      address: "23 Green Avenue"
    },
    price: 0,
    organizer: {
      name: "Sustainability Network",
      logo: "https://ui-avatars.com/api/?name=Sustainability+Network&background=10B981&color=fff"
    },
    participants: 300,
    rating: {
      score: 4.7,
      count: 198
    },
    isFeatured: false
  },
  {
    id: 17,
    title: "Women in Tech Conference",
    description: "Célébrez et soutenez les femmes dans la technologie avec des conférences inspirantes, du networking et des ateliers de développement.",
    image: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg",
    type: "conference",
    format: "presentiel",
    date: "2024-10-15T09:00:00",
    location: {
      city: "Lisbonne",
      country: "Portugal",
      address: "42 Diversity Street"
    },
    price: 189,
    organizer: {
      name: "Tech Diversity Council",
      logo: "https://ui-avatars.com/api/?name=Tech+Diversity&background=8B5CF6&color=fff"
    },
    participants: 420,
    rating: {
      score: 4.9,
      count: 145
    },
    isFeatured: false
  },
  {
    id: 18,
    title: "FinTech Revolution Summit",
    description: "Découvrez comment la technologie transforme le secteur financier avec des discussions sur la blockchain, le paiement numérique et la banque ouverte.",
    image: "https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg",
    type: "conference",
    format: "en-ligne",
    date: "2024-08-18T10:00:00",
    location: {
      city: "Francfort",
      country: "Allemagne",
      address: "Virtual Event"
    },
    price: 249,
    organizer: {
      name: "FinTech Alliance",
      logo: "https://ui-avatars.com/api/?name=FinTech+Alliance&background=0891B2&color=fff"
    },
    participants: 380,
    rating: {
      score: 4.5,
      count: 87
    },
    isFeatured: false
  },
  {
    id: 19,
    title: "Agile Project Management Certification",
    description: "Obtenez votre certification en gestion de projet agile avec cette formation intensive de trois jours. Méthodologies Scrum, Kanban et plus.",
    image: "https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg",
    type: "formation",
    format: "presentiel",
    date: "2024-09-10T09:00:00",
    location: {
      city: "Copenhague",
      country: "Danemark",
      address: "89 Agile Boulevard"
    },
    price: 995,
    organizer: {
      name: "Agile Academy",
      logo: "https://ui-avatars.com/api/?name=Agile+Academy&background=4F46E5&color=fff"
    },
    participants: 60,
    rating: {
      score: 4.8,
      count: 42
    },
    isFeatured: false
  },
  {
    id: 20,
    title: "Digital Marketing Analytics Workshop",
    description: "Maîtrisez l'analyse des données marketing pour optimiser vos campagnes et maximiser votre ROI. Focus sur Google Analytics et autres outils.",
    image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg",
    type: "workshop",
    format: "en-ligne",
    date: "2024-07-22T14:00:00",
    location: {
      city: "Helsinki",
      country: "Finlande",
      address: "Virtual Event"
    },
    price: 129,
    organizer: {
      name: "Marketing Analytics Pro",
      logo: "https://ui-avatars.com/api/?name=Marketing+Analytics&background=F59E0B&color=fff"
    },
    participants: 175,
    rating: {
      score: 4.6,
      count: 68
    },
    isFeatured: false
  },
  {
    id: 21,
    title: "Startup Funding & Pitch Masterclass",
    description: "Apprenez à lever des fonds pour votre startup et à perfectionner votre pitch devant les investisseurs avec les conseils d'experts en capital-risque.",
    image: "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg",
    type: "workshop",
    format: "presentiel",
    date: "2024-08-25T09:30:00",
    location: {
      city: "Berlin",
      country: "Allemagne",
      address: "12 Funding Street"
    },
    price: 349,
    organizer: {
      name: "Venture Capital Partners",
      logo: "https://ui-avatars.com/api/?name=VC+Partners&background=2563EB&color=fff"
    },
    participants: 75,
    rating: {
      score: 4.8,
      count: 31
    },
    isFeatured: false
  },
  {
    id: 22,
    title: "SEO & Content Marketing Conference",
    description: "Optimisez votre présence en ligne avec les dernières stratégies de SEO et de marketing de contenu pour attirer et fidéliser votre audience.",
    image: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg",
    type: "conference",
    format: "presentiel",
    date: "2024-10-05T09:00:00",
    location: {
      city: "Londres",
      country: "Royaume-Uni",
      address: "56 Content Avenue"
    },
    price: 229,
    organizer: {
      name: "Content Marketing Institute",
      logo: "https://ui-avatars.com/api/?name=Content+Marketing&background=EF4444&color=fff"
    },
    participants: 320,
    rating: {
      score: 4.4,
      count: 108
    },
    isFeatured: false
  },
  {
    id: 23,
    title: "Customer Experience Summit",
    description: "Transformez l'expérience de vos clients avec des stratégies centrées sur l'utilisateur et des approches innovantes de service client.",
    image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg",
    type: "seminaire",
    format: "presentiel",
    date: "2024-11-12T09:30:00",
    location: {
      city: "Madrid",
      country: "Espagne",
      address: "78 Customer Boulevard"
    },
    price: 275,
    organizer: {
      name: "CX Leaders",
      logo: "https://ui-avatars.com/api/?name=CX+Leaders&background=8B5CF6&color=fff"
    },
    participants: 195,
    rating: {
      score: 4.5,
      count: 79
    },
    isFeatured: false
  },
  {
    id: 24,
    title: "Cybersecurity in Healthcare Forum",
    description: "Protégez les données sensibles des patients avec les meilleures pratiques de cybersécurité spécialement adaptées au secteur de la santé.",
    image: "https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg",
    type: "conference",
    format: "en-ligne",
    date: "2024-09-18T14:00:00",
    location: {
      city: "Bruxelles",
      country: "Belgique",
      address: "Virtual Event"
    },
    price: 0,
    organizer: {
      name: "Healthcare Security Alliance",
      logo: "https://ui-avatars.com/api/?name=Healthcare+Security&background=EF4444&color=fff"
    },
    participants: 250,
    rating: {
      score: 4.7,
      count: 64
    },
    isFeatured: false
  },
  {
    id: 25,
    title: "Sustainability in Business Conference",
    description: "Intégrez des pratiques durables dans votre stratégie d'entreprise et découvrez comment la durabilité peut stimuler l'innovation et la croissance.",
    image: "https://images.pexels.com/photos/2832034/pexels-photo-2832034.jpeg",
    type: "conference",
    format: "presentiel",
    date: "2024-10-20T09:00:00",
    location: {
      city: "Amsterdam",
      country: "Pays-Bas",
      address: "23 Sustainability Road"
    },
    price: 229,
    organizer: {
      name: "Sustainable Business Network",
      logo: "https://ui-avatars.com/api/?name=Sustainable+Business&background=10B981&color=fff"
    },
    participants: 280,
    rating: {
      score: 4.6,
      count: 112
    },
    isFeatured: false
  }
];

// Function to get all events
function getAllEvents() {
  return EVENTS_DATA;
}

// Function to get featured events
function getFeaturedEvents() {
  return EVENTS_DATA.filter(event => event.isFeatured);
}

// Function to get event by ID
function getEventById(id) {
  return EVENTS_DATA.find(event => event.id === parseInt(id));
}

// Function to get similar events
function getSimilarEvents(eventId, limit = 3) {
  const currentEvent = getEventById(eventId);
  
  if (!currentEvent) return [];
  
  return EVENTS_DATA
    .filter(event => 
      event.id !== parseInt(eventId) && 
      (event.type === currentEvent.type || event.location.country === currentEvent.location.country)
    )
    .sort(() => 0.5 - Math.random()) // Simple random sorting
    .slice(0, limit);
}

// Function to filter events
function filterEvents(filters = {}) {
  let filteredEvents = EVENTS_DATA;
  
  // Filter by type
  if (filters.types && filters.types.length > 0) {
    filteredEvents = filteredEvents.filter(event => filters.types.includes(event.type));
  }
  
  // Filter by format
  if (filters.formats && filters.formats.length > 0) {
    filteredEvents = filteredEvents.filter(event => filters.formats.includes(event.format));
  }
  
  // Filter by country
  if (filters.countries && filters.countries.length > 0) {
    filteredEvents = filteredEvents.filter(event => filters.countries.includes(event.location.country));
  }
  
  // Filter by city
  if (filters.cities && filters.cities.length > 0) {
    filteredEvents = filteredEvents.filter(event => filters.cities.includes(event.location.city));
  }
  
  // Filter by search query
  if (filters.query && filters.query.trim() !== '') {
    const query = filters.query.toLowerCase().trim();
    filteredEvents = filteredEvents.filter(event => 
      event.title.toLowerCase().includes(query) ||
      event.description.toLowerCase().includes(query) ||
      event.location.city.toLowerCase().includes(query) ||
      event.location.country.toLowerCase().includes(query) ||
      event.type.toLowerCase().includes(query)
    );
  }
  
  return filteredEvents;
}

// Function to get unique countries from events
function getUniqueCountries() {
  const countries = EVENTS_DATA.map(event => event.location.country);
  return [...new Set(countries)].sort();
}

// Function to get unique cities from events
function getUniqueCities() {
  const cities = EVENTS_DATA.map(event => event.location.city);
  return [...new Set(cities)].sort();
}