// Authentication functionality
const AUTH_KEY = 'globalevents_auth';

// Check if user is logged in
function isLoggedIn() {
  return localStorage.getItem(AUTH_KEY) !== null;
}

// Login user
function login(email, password) {
  if (!email || !password) {
    return false;
  }

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
  if (!name || !email || !password || password !== confirmPassword) {
    return false;
  }
  
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

// Update UI based on auth status
function updateAuthUI() {
  const user = getCurrentUser();
  const loginBtn = document.querySelector('.btn-login');
  const registerBtn = document.querySelector('.btn-register');
  const logoutBtn = document.querySelector('.btn-logout');
  const createEventBtn = document.querySelector('.btn-create-event');
  const profileBtn = document.querySelector('.btn-profile');

  if (user) {
    loginBtn?.classList.add('hidden');
    registerBtn?.classList.add('hidden');
    logoutBtn?.classList.remove('hidden');
    createEventBtn?.classList.remove('hidden');
    profileBtn?.classList.remove('hidden');
  } else {
    loginBtn?.classList.remove('hidden');
    registerBtn?.classList.remove('hidden');
    logoutBtn?.classList.add('hidden');
    createEventBtn?.classList.add('hidden');
    profileBtn?.classList.add('hidden');
  }
}

// Handle login form submission
function handleLogin() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  if (login(email, password)) {
    hideModal();
    updateAuthUI();
    showAlert('Connexion réussie !', 'success');
  } else {
    showAlert('Email ou mot de passe incorrect', 'error');
  }
}

// Handle register form submission
function handleRegister() {
  const name = document.getElementById('register-name').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  const confirmPassword = document.getElementById('register-confirm-password').value;

  if (register(name, email, password, confirmPassword)) {
    hideModal();
    updateAuthUI();
    showAlert('Inscription réussie !', 'success');
  } else {
    showAlert('Erreur lors de l\'inscription', 'error');
  }
}

// Show login modal
function showLoginModal() {
  showModal(
    'Connexion',
    `
    <div class="auth-form">
      <div class="form-group">
        <label for="login-email">Email</label>
        <input type="email" id="login-email" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="login-password">Mot de passe</label>
        <input type="password" id="login-password" class="form-control" required>
      </div>
      <p>Pas encore de compte ? <a href="#" id="switch-to-register">S'inscrire</a></p>
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

  document.getElementById('switch-to-register')?.addEventListener('click', (e) => {
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
        <input type="text" id="register-name" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="register-email">Email</label>
        <input type="email" id="register-email" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="register-password">Mot de passe</label>
        <input type="password" id="register-password" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="register-confirm-password">Confirmer le mot de passe</label>
        <input type="password" id="register-confirm-password" class="form-control" required>
      </div>
      <p>Déjà un compte ? <a href="#" id="switch-to-login">Se connecter</a></p>
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

  document.getElementById('switch-to-login')?.addEventListener('click', (e) => {
    e.preventDefault();
    hideModal();
    showLoginModal();
  });
}