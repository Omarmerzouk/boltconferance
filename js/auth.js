// Authentication functionality
const AUTH_KEY = 'globalevents_auth';

// Check if user is logged in
function isLoggedIn() {
  return localStorage.getItem(AUTH_KEY) !== null;
}

// Login user
function login(email, password) {
  // Simple validation
  if (!email || !password) {
    return false;
  }

  // In a real app, this would validate against a backend
  const user = {
    email,
    name: email.split('@')[0],
    timestamp: new Date().toISOString()
  };
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  return true;
}

// Register user
function register(name, email, password, confirmPassword) {
  // Validate inputs
  if (!name || !email || !password || password !== confirmPassword) {
    return false;
  }
  
  // In a real app, this would create a user in the backend
  const user = {
    name,
    email,
    timestamp: new Date().toISOString()
  };
  
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  return true;
}

// Logout user
function logout() {
  localStorage.removeItem(AUTH_KEY);
  window.location.reload();
}

// Get current user
function getCurrentUser() {
  const userData = localStorage.getItem(AUTH_KEY);
  return userData ? JSON.parse(userData) : null;
}

// Show login modal
function showLoginModal() {
  showModal(
    'Connexion',
    `
    <div class="auth-form">
      <div class="form-group">
        <label for="login-email">Email</label>
        <input type="email" id="login-email" class="form-control" placeholder="votre@email.com">
      </div>
      <div class="form-group">
        <label for="login-password">Mot de passe</label>
        <div class="password-input">
          <input type="password" id="login-password" class="form-control" placeholder="••••••••">
          <button class="toggle-password" type="button">
            <i class="far fa-eye"></i>
          </button>
        </div>
      </div>
      <p class="auth-error" id="login-error" style="display: none;"></p>
      <p class="auth-switch">
        Pas encore de compte ? <a href="#" id="switch-to-register">S'inscrire</a>
      </p>
    </div>
    `,
    [
      {
        text: 'Se connecter',
        class: 'btn-primary',
        onClick: handleLogin
      }
    ]
  );

  // Setup password toggle
  setupPasswordToggle();
  
  // Setup switch to register
  document.getElementById('switch-to-register').addEventListener('click', (e) => {
    e.preventDefault();
    hideModal();
    showRegisterModal();
  });
}

// Show register modal
function showRegisterModal() {
  showModal(
    'Inscription',
    `
    <div class="auth-form">
      <div class="form-group">
        <label for="register-name">Nom complet</label>
        <input type="text" id="register-name" class="form-control" placeholder="John Doe">
      </div>
      <div class="form-group">
        <label for="register-email">Email</label>
        <input type="email" id="register-email" class="form-control" placeholder="votre@email.com">
      </div>
      <div class="form-group">
        <label for="register-password">Mot de passe</label>
        <div class="password-input">
          <input type="password" id="register-password" class="form-control" placeholder="••••••••">
          <button class="toggle-password" type="button">
            <i class="far fa-eye"></i>
          </button>
        </div>
      </div>
      <div class="form-group">
        <label for="register-confirm-password">Confirmer le mot de passe</label>
        <div class="password-input">
          <input type="password" id="register-confirm-password" class="form-control" placeholder="••••••••">
          <button class="toggle-password" type="button">
            <i class="far fa-eye"></i>
          </button>
        </div>
      </div>
      <p class="auth-error" id="register-error" style="display: none;"></p>
      <p class="auth-switch">
        Déjà un compte ? <a href="#" id="switch-to-login">Se connecter</a>
      </p>
    </div>
    `,
    [
      {
        text: 'Créer un compte',
        class: 'btn-primary',
        onClick: handleRegister
      }
    ]
  );

  // Setup password toggles
  setupPasswordToggle();
  
  // Setup switch to login
  document.getElementById('switch-to-login').addEventListener('click', (e) => {
    e.preventDefault();
    hideModal();
    showLoginModal();
  });
}

// Handle login form submission
function handleLogin() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const errorElement = document.getElementById('login-error');
  
  if (!email || !password) {
    errorElement.textContent = 'Veuillez remplir tous les champs';
    errorElement.style.display = 'block';
    return;
  }
  
  if (login(email, password)) {
    hideModal();
    showAlert('Connexion réussie !', 'success');
    updateAuthUI();
    window.location.reload(); // Reload to update UI
  } else {
    errorElement.textContent = 'Email ou mot de passe incorrect';
    errorElement.style.display = 'block';
  }
}

// Handle register form submission
function handleRegister() {
  const name = document.getElementById('register-name').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  const confirmPassword = document.getElementById('register-confirm-password').value;
  const errorElement = document.getElementById('register-error');
  
  if (!name || !email || !password || !confirmPassword) {
    errorElement.textContent = 'Veuillez remplir tous les champs';
    errorElement.style.display = 'block';
    return;
  }
  
  if (password !== confirmPassword) {
    errorElement.textContent = 'Les mots de passe ne correspondent pas';
    errorElement.style.display = 'block';
    return;
  }
  
  if (register(name, email, password, confirmPassword)) {
    hideModal();
    showAlert('Inscription réussie !', 'success');
    updateAuthUI();
    window.location.reload(); // Reload to update UI
  } else {
    errorElement.textContent = 'Une erreur est survenue';
    errorElement.style.display = 'block';
  }
}

// Setup password visibility toggle
function setupPasswordToggle() {
  const toggles = document.querySelectorAll('.toggle-password');
  toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const input = toggle.parentElement.querySelector('input');
      const icon = toggle.querySelector('i');
      
      if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
      } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
      }
    });
  });
}

// Update UI based on auth status
function updateAuthUI() {
  const user = getCurrentUser();
  const loginButton = document.querySelector('.btn-login');
  const registerButton = document.querySelector('.btn-register');
  const profileButton = document.querySelector('.btn-profile');
  const logoutButton = document.querySelector('.btn-logout');
  const createEventButton = document.querySelector('.btn-create-event');
  
  if (user) {
    loginButton?.classList.add('hidden');
    registerButton?.classList.add('hidden');
    profileButton?.classList.remove('hidden');
    logoutButton?.classList.remove('hidden');
    createEventButton?.classList.remove('hidden');
  } else {
    loginButton?.classList.remove('hidden');
    registerButton?.classList.remove('hidden');
    profileButton?.classList.add('hidden');
    logoutButton?.classList.add('hidden');
    createEventButton?.classList.add('hidden');
  }
}

// Show create event modal
function showCreateEventModal() {
  if (!isLoggedIn()) {
    showLoginModal();
    return;
  }

  showModal(
    'Créer un événement',
    `
    <div class="create-event-form">
      <h3>Informations générales</h3>
      <div class="form-group">
        <label for="event-title">Titre de l'événement *</label>
        <input type="text" id="event-title" class="form-control" placeholder="Nom de votre événement" required>
      </div>
      
      <div class="form-group">
        <label for="event-description">Description *</label>
        <textarea id="event-description" class="form-control" rows="4" placeholder="Décrivez votre événement..." required></textarea>
      </div>
      
      <div class="form-group">
        <label for="event-date">Date et heure *</label>
        <input type="datetime-local" id="event-date" class="form-control" required>
      </div>
      
      <div class="form-group">
        <label for="event-image">URL de l'image</label>
        <input type="url" id="event-image" class="form-control" placeholder="https://example.com/image.jpg">
      </div>
      
      <h3>Type d'événement</h3>
      <div class="form-group">
        <label>Format *</label>
        <div class="radio-group">
          <label>
            <input type="radio" name="format" value="presentiel" checked> Présentiel
          </label>
          <label>
            <input type="radio" name="format" value="en-ligne"> En ligne
          </label>
        </div>
      </div>
      
      <div class="form-group">
        <label for="event-type">Catégorie *</label>
        <select id="event-type" class="form-control" required>
          <option value="">Sélectionner une catégorie</option>
          <option value="conference">Conférence</option>
          <option value="workshop">Workshop</option>
          <option value="seminaire">Séminaire</option>
          <option value="formation">Formation</option>
          <option value="networking">Networking</option>
        </select>
      </div>
      
      <h3>Localisation</h3>
      <div class="form-group">
        <label for="event-address">Adresse *</label>
        <input type="text" id="event-address" class="form-control" placeholder="Adresse complète" required>
      </div>
      
      <div class="form-row">
        <div class="form-group">
          <label for="event-city">Ville *</label>
          <input type="text" id="event-city" class="form-control" placeholder="Ville" required>
        </div>
        
        <div class="form-group">
          <label for="event-country">Pays *</label>
          <input type="text" id="event-country" class="form-control" placeholder="Pays" required>
        </div>
      </div>
      
      <h3>Tarification et participants</h3>
      <div class="form-group">
        <label>Type de tarification *</label>
        <div class="radio-group">
          <label>
            <input type="radio" name="pricing" value="free" checked> Gratuit
          </label>
          <label>
            <input type="radio" name="pricing" value="paid"> Payant
          </label>
        </div>
      </div>
      
      <div class="form-group price-input hidden">
        <label for="event-price">Prix *</label>
        <input type="number" id="event-price" class="form-control" placeholder="0" min="0">
      </div>
      
      <div class="form-group">
        <label for="event-capacity">Nombre max de participants *</label>
        <input type="number" id="event-capacity" class="form-control" placeholder="100" min="1" required>
      </div>
    </div>
    `,
    [
      {
        text: 'Annuler',
        class: 'btn-outline',
        onClick: hideModal
      },
      {
        text: 'Créer l\'événement',
        class: 'btn-primary',
        onClick: handleCreateEvent
      }
    ]
  );

  // Setup price input visibility
  const pricingInputs = document.querySelectorAll('input[name="pricing"]');
  const priceInput = document.querySelector('.price-input');
  
  pricingInputs.forEach(input => {
    input.addEventListener('change', () => {
      if (input.value === 'paid') {
        priceInput.classList.remove('hidden');
      } else {
        priceInput.classList.add('hidden');
      }
    });
  });
}

// Handle create event form submission
function handleCreateEvent() {
  // Get form values
  const title = document.getElementById('event-title').value;
  const description = document.getElementById('event-description').value;
  const date = document.getElementById('event-date').value;
  const image = document.getElementById('event-image').value;
  const format = document.querySelector('input[name="format"]:checked').value;
  const type = document.getElementById('event-type').value;
  const address = document.getElementById('event-address').value;
  const city = document.getElementById('event-city').value;
  const country = document.getElementById('event-country').value;
  const pricing = document.querySelector('input[name="pricing"]:checked').value;
  const price = pricing === 'paid' ? parseFloat(document.getElementById('event-price').value) : 0;
  const capacity = parseInt(document.getElementById('event-capacity').value);

  // Validate required fields
  if (!title || !description || !date || !type || !address || !city || !country || !capacity) {
    showAlert('Veuillez remplir tous les champs obligatoires', 'error');
    return;
  }

  // In a real app, this would send data to a backend
  const newEvent = {
    id: Date.now(),
    title,
    description,
    date,
    image: image || getRandomPlaceholderImage(),
    type,
    format,
    location: {
      address,
      city,
      country
    },
    price,
    organizer: {
      name: getCurrentUser().name,
      logo: `https://ui-avatars.com/api/?name=${encodeURIComponent(getCurrentUser().name)}&background=0D8ABC&color=fff`
    },
    participants: 0,
    rating: {
      score: 0,
      count: 0
    }
  };

  // Add event to data
  EVENTS_DATA.unshift(newEvent);

  // Hide modal and show success message
  hideModal();
  showAlert('Événement créé avec succès !', 'success');

  // Refresh events display
  renderFeaturedEvents();
}