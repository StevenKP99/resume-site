import resume from '../../../data/resume.json';

export function renderAboutSection(containerSelector) {
    const container = document.querySelector(containerSelector);
    const basics = resume.basics;
    const interests = resume.interests;

    const githubProfile = basics.profiles.find(p => p.network === 'GitHub');

    let html = `
        <div class="about-content">
            <div class="about-summary">
                <h3>Summary</h3>
                <p>${basics.summary}</p>
            </div>

            <div class="about-contact">
                <h3>Contact</h3>
                <ul>
                    <li><strong>Email:</strong> <a href="mailto:${basics.email}">${basics.email}</a></li>
                    <li><strong>Phone:</strong> <a href="tel:${basics.phone.replace(/[^0-9+]/g, '')}">${basics.phone}</a></li>
                    <li><strong>Location:</strong> ${basics.location.city}, ${basics.location.region} ${basics.location.postalCode}</li>
                </ul>
            </div>

            <div class="about-profiles">
                <h3>Profiles</h3>
                <ul>
                    ${basics.profiles.map(profile => `
                        <li><a href="${profile.url}" target="_blank" rel="noopener noreferrer">${profile.network}</a></li>
                    `).join('')}
                </ul>
            </div>

            ${interests.length > 0 ? `
            <div class="about-interests">
                <h3>Interests & Additional Info</h3>
                ${interests.map(interest => `
                    <div class="interest-group">
                        <h4>${interest.name}</h4>
                        <ul>
                            ${interest.keywords.map(keyword => `<li>${keyword}</li>`).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>
            ` : ''}
        </div>
    `;

    container.innerHTML = html;
}
