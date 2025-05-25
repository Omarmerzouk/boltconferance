// Add to existing app.js
document.addEventListener('DOMContentLoaded', () => {
  // Initialize auth UI
  updateAuthUI();
  
  // Setup auth buttons
  const loginButton = document.querySelector('.btn-login');
  const registerButton = document.querySelector('.btn-register');
  const logoutButton = document.querySelector('.btn-logout');
  const createEventButton = document.querySelector('.btn-create-event');
  
  loginButton?.addEventListener('click', (e) => {
    e.preventDefault();
    showLoginModal();
  });
  
  registerButton?.addEventListener('click', (e) => {
    e.preventDefault();
    showRegisterModal();
  });
  
  logoutButton?.addEventListener('click', (e) => {
    e.preventDefault();
    logout();
  });
  
  createEventButton?.addEventListener('click', (e) => {
    e.preventDefault();
    if (!isLoggedIn()) {
      showLoginModal();
      return;
    }
    showCreateEventModal();
  });
});