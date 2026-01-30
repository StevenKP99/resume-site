import resume from '../../../data/resume.json';

function formatDateRange(startDate, endDate) {
  const formatDate = (dateStr) => {
    if (!dateStr) return 'Present';
    const [year, month] = dateStr.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return month ? `${months[parseInt(month, 10) - 1]} ${year}` : year;
  };
  return `${formatDate(startDate)} – ${formatDate(endDate)}`;
}

function deriveWorkType(position) {
  if (position.toLowerCase().includes('contract')) return 'Contract';
  return 'Full Time';
}

export function renderJobCards(containerSelector) {
  const container = document.querySelector(containerSelector);
  const jobscarousel = document.createElement('div');
  jobscarousel.className = 'jobs-carousel';
  const jobs = resume.work;
  if(jobs.length > 0){
     //const prev = renderWheelController('prev', '←')
     const prev = renderWheelController('prev', '<')
     jobscarousel.appendChild(prev);
  }
  const jobsContainer = document.createElement('div');
  jobsContainer.className = 'jobs-container'
  jobscarousel.appendChild(jobsContainer);
  jobs.forEach((job, index) => {
    const card = document.createElement('div');
    card.className = 'job-card';
    const jobId = job.name.toLowerCase().replace(/\s+/g, '-');
    card.innerHTML = `
      <button class="job-toggle" aria-expanded="false" aria-controls="job-details-${jobId}" aria-label="Toggle all job details">
        <div class="job-header">
          <div class="job-info">
            <div>
              <div class="job-company">${job.name}</div>
              <div class="job-date">${formatDateRange(job.startDate, job.endDate)}</div>
            </div>
            <div>
              <div class="job-title">${job.position}</div>
              <div class="job-worktype">${deriveWorkType(job.position)}</div>
            </div>
          </div>
        </div>
      </button>
      <ul id="job-details-${jobId}" class="job-details hidden" aria-hidden="true">
        ${job.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
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