// Configuration settings for the application
const CONFIG = {
  // API URLs and endpoints (would be replaced with real APIs in production)
  API_BASE_URL: 'https://api.example.com',
  
  // Default pagination settings
  PAGINATION: {
    ITEMS_PER_PAGE: 9,
    MAX_PAGES_SHOWN: 5
  },
  
  // Currency settings
  CURRENCY: {
    CODE: 'EUR',
    SYMBOL: '€',
    POSITION: 'after' // 'before' or 'after'
  },
  
  // Image placeholders for events that don't have images
  PLACEHOLDER_IMAGES: [
    'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg',
    'https://images.pexels.com/photos/7149165/pexels-photo-7149165.jpeg',
    'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg',
    'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg',
    'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg'
  ],
  
  // Event types and their corresponding icons
  EVENT_TYPES: {
    conference: {
      label: 'Conférence',
      icon: 'fas fa-microphone'
    },
    workshop: {
      label: 'Workshop',
      icon: 'fas fa-laptop-code'
    },
    seminaire: {
      label: 'Séminaire',
      icon: 'fas fa-chalkboard-teacher'
    },
    formation: {
      label: 'Formation',
      icon: 'fas fa-graduation-cap'
    },
    networking: {
      label: 'Networking',
      icon: 'fas fa-users'
    }
  },
  
  // Event formats and their corresponding classes
  EVENT_FORMATS: {
    presentiel: {
      label: 'Présentiel',
      class: 'format-presentiel',
      icon: 'fas fa-map-marker-alt'
    },
    'en-ligne': {
      label: 'En ligne',
      class: 'format-online',
      icon: 'fas fa-video'
    }
  }
};