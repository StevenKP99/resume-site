import resume from '../../../data/resume.json'

export function renderSkillCards(containerSelector) {
    const container = document.querySelector(containerSelector);
    const unorderedList = document.createElement('ul');

    resume.skills.forEach(skill => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `

            <h4>${skill.name}:</h4>
            <p>${skill.keywords.join(', ')}</p>
        `;
        unorderedList.appendChild(listItem);
    });

    container.appendChild(unorderedList);
}