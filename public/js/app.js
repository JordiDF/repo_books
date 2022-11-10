const divLibros = document.getElementById('libros');

const URL = 'http://localhost:4000/scraper';

fetch(URL)
    .then(response => {
        // console.log(response);
        return response.json();
    })
    .then( data => {
        data.forEach(libro => {
            let resultado = '';
            resultado += '<div class="libro">'
            resultado += `<img src=${libro.portada}>`;
            resultado += '<br>';
            resultado += `<a href="${libro.enlace}" target="_blank">${libro.texto}</a>`
            resultado += '</div>';
            divLibros.insertAdjacentHTML('beforeend',resultado);
        });
    })
.catch(err => console.log(err))