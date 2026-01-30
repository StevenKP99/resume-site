import resume from '../../../data/resume.json';

export function renderHeader(containerSelector) {
    const container = document.querySelector(containerSelector);

    const basics = resume.basics;
    const linkedInProfile = basics.profiles.find(p => p.network === 'LinkedIn');

    container.innerHTML = `
        <img class="profile-pic" src="/src/assets/Avatar2.jpg" alt="${basics.name}" />
        <div class="profile-info">
          <h1>${basics.name}</h1>
          <p class="subtitle">${basics.label}</p>
        </div>
        <div class="profile-links">
          ${linkedInProfile ? `
          <a href="${linkedInProfile.url}" target="_blank" rel="noopener noreferrer" aria-label="Visit ${basics.name}'s LinkedIn profile">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#0A66C2" role="img">
              <title>LinkedIn</title>
              <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.05c.53-1 1.83-2.2 3.77-2.2 4.03 0 4.78 2.65 4.78 6.1V24h-4v-7.5c0-1.79-.03-4.1-2.5-4.1-2.5 0-2.88 1.95-2.88 3.97V24h-4V8z"/>
            </svg>
          </a>
          ` : ''}
          <a href="/STEVEN PUCKETT RESUME.pdf" download class="nav-link">Download Resume</a>
        </div>
    `;
}
