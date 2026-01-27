import skills from './skills.json'

export function renderSkillCards(containerSelector) {
    const container = document.querySelector(containerSelector);
    const unorderedList = document.createElement('ul');

    skills.forEach(skill => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `

            <h4>${skill.category}:</h4>
            <p>${skill.technologies.join(', ')}</p>
        `;
        unorderedList.appendChild(listItem);
    });

    container.appendChild(unorderedList);
}