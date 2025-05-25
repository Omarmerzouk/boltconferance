// Authentication functionality
const AUTH_KEY = 'globalevents_auth';

// Check if user is logged in
function isLoggedIn() {
  return localStorage.getItem(AUTH_KEY) !== null;
}

// Login user
function login(email, password) {
  // In a real app, this would validate against a backend
  if (email && password) {
    const user = {
      email,
      name: email.split('@')[0],
      timestamp: new Date().toISOString()
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    return true;
  }
  return false;
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