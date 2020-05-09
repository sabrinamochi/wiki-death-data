const fs = require('fs');
const wiki = require('wikijs').default;

const years = ['2015', '2016', '2017', '2018'];
const outputPath = './output/year-pages';

function download(year) {
    wiki().page(year)
    .then(page => page.html())
    .then(html => {
        fs.writeFileSync(`${outputPath}/${year}.html`, html);
    });
}

years.forEach(download);