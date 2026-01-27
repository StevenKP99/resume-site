import degrees from './degrees.json';

export function renderDegreeCards(containerSelector) {
    const container = document.querySelector(containerSelector);
    const unorderedList = document.createElement('ul');

    degrees.forEach(degree => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `

            <h4>${degree.degree}</h4>
            <p>${degree.institution}</p>
        `;
        unorderedList.appendChild(listItem);
    });

    container.appendChild(unorderedList);
}