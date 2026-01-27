import jobs from './jobs.json';

export function renderJobCards(containerSelector) {
  const container = document.querySelector(containerSelector);
  const jobscarousel = document.createElement('div');
  jobscarousel.className = 'jobs-carousel';
  if(jobs.length > 0){
     //const prev = renderWheelController('prev', '←')
     const prev = renderWheelController('prev', '<')
     jobscarousel.appendChild(prev);
  }
  const jobsContainer = document.createElement('div');
  jobsContainer.className = 'jobs-container'
  jobscarousel.appendChild(jobsContainer);
  jobs.forEach(job => {
    const card = document.createElement('div');
    card.className = 'job-card';
    card.innerHTML = `
      <button class="job-toggle" aria-expanded="false" aria-controls="job-details-${job.id}" aria-label="Toggle all job details">
        <div class="job-header">
          <div class="job-info">
            <div>
              <div class="job-company">${job.company}</div>
              <div class="job-date">${job.date}</div>
            </div>
            <div>
              <div class="job-title">${job.title}</div>
              <div class="job-worktype">${job.workType}</div>
            </div>
          </div>
        </div>
      </button>
      <ul id="job-details-${job.id}" class="job-details hidden" aria-hidden="true">
        ${job.details.map(detail => `<li>${detail}</li>`).join('')}
      </ul>
    `;
    jobsContainer.appendChild(card);
  });

  if(jobs.length > 0){
    const next = renderWheelController('next', '>')
    jobscarousel.appendChild(next);
  }

  container.appendChild(jobscarousel);

  let allExpanded = false;

  jobscarousel.addEventListener('click', e => {
    if (e.target.closest('.job-toggle')) {
      // Toggle the global state
      allExpanded = !allExpanded;

      // Get all toggle buttons and details sections
      const allButtons = jobscarousel.querySelectorAll('.job-toggle');
      const allDetails = jobscarousel.querySelectorAll('.job-details');

      // Update ALL cards to match the new global state
      allButtons.forEach(button => {
        button.setAttribute('aria-expanded', allExpanded);
      });

      allDetails.forEach(details => {
        details.setAttribute('aria-hidden', !allExpanded);
        if (allExpanded) {
          details.classList.remove('hidden');
          details.classList.add('visible');
        } else {
          details.classList.remove('visible');
          details.classList.add('hidden');
        }
      });
    }
  });

  addScrollBy(containerSelector);
}

function addScrollBy(containerSelector) {
  const root = document.querySelector(containerSelector);
  const scrollTarget = root.querySelector('.jobs-container');
  const cards = scrollTarget.querySelectorAll('.job-card');

  let currentIndex = 0;

  document.getElementById('next')?.addEventListener('click', () => {
    currentIndex = Math.min(currentIndex + 1, cards.length - 1);
    cards[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  });

  document.getElementById('prev')?.addEventListener('click', () => {
    currentIndex = Math.max(currentIndex - 1, 0);
    cards[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  });
}

function renderWheelController(id, text){
  const workController = document.createElement('button');
  workController.id = id;
  workController.ariaLabel = `${id} button`;
  workController.className = 'carousel-nav';
  workController.innerText = text;

  return workController;
}