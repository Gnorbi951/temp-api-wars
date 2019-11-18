
export function fillModal(characterInfo) {
    const modalBody = document.querySelector('.modal_body');
    let tableRow = document.createElement('tr');
    tableRow.innerHTML = `
                    <td id="modal_td">${characterInfo.name}</td>
                    <td id="modal_td">${characterInfo.height}</td>
                    <td id="modal_td">${characterInfo.mass}</td>
                    <td id="modal_td">${characterInfo.hair_color}</td>
                    <td id="modal_td">${characterInfo.skin_color}</td>
                    <td id="modal_td">${characterInfo.eye_color}</td>
                    <td id="modal_td">${characterInfo.birth_year}</td>
                    <td id="modal_td">${characterInfo.gender}</td>`;

    //tableRow = document.createRange().createContextualFragment(tableRow);
    modalBody.appendChild(tableRow);

}

export function removeRows() {
    let previousRows = document.querySelectorAll('#modal_td');
    for (let row of previousRows) {
        row.remove();
    }
}


