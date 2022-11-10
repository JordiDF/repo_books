const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');
const {join} = require('path');
const cors = require('cors');

const app = express();
const PORT = 4000;
const URL = 'https://books.toscrape.com/';

app.use(cors());

app.use(express.static(join(__dirname, 'public')));

// app.get('/', (req,res) => {
//     res.send('OK');
// });

app.get('/scraper',(req,res) => {
    axios(URL)
    .then((response) => {
        const html = response.data;
        // console.log('html',html);
        const $ = cheerio.load(html);
        const libros = [];
        $('.product_pod',html).each(function(){
            const portada = URL + $(this).find('img').attr('src');
            const enlace = URL + $(this).find('a').attr('href');
            const texto = $(this).find('a').text();
            libros.push({
                portada,
                enlace,
                texto
            })
        });
        // console.log(libros);
        res.json(libros);
    })
    .catch((err) => {
        console.log(err);
    });
});

app.listen(PORT, () => console.log(`Escuchando en el puerto ${PORT}`));