import resume from '../../../data/resume.json';

export function renderDegreeCards(containerSelector) {
    const container = document.querySelector(containerSelector);
    const unorderedList = document.createElement('ul');

    resume.education.forEach(edu => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `

            <h4>${edu.studyType} in ${edu.area}</h4>
            <p>${edu.institution}</p>
        `;
        unorderedList.appendChild(listItem);
    });

    container.appendChild(unorderedList);
}