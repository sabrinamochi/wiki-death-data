const fs = require('fs');
const cheerio = require('cheerio');

const inputPath = './output/year-pages';
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octorbor', 'November', 'December'];

function parseLi(sel) {
    const isPerson = !sel.find('ul').length;
    if (isPerson){
        const a = sel.find('a');
        const numATags = a.length;
        // name
        // there are 3 a tags when the date is baked in
        const nameIndex = numATags === 3 ? 1 : 0; 
        const nameSel = sel.find('a').eq(nameIndex);
        const name = nameSel.attr('title');
        const link = nameSel.attr('href');

        // birth year
        const birthSel = a.eq(-1);
        const year_of_birth = birthSel.attr('title');

        // date of death 
        let date_of_death = null;
        if (numATags === 3) {
            date_of_death = a.eq(0).attr('title');
        } else {
            const parentLi = sel.parentsUntil('ul');
            date_of_death = parentLi.find('a').eq(0).attr('title')
        }

        console.log({name, year_of_birth, date_of_death})

    }

        // return {
        //     name:
        //     link:
        //     year_of_birth: 
        //     description: 
        // }
    
}

function extractPeople(file){
    const html = fs.readFileSync(`${inputPath}/${file}`, 'utf-8');
    const $ = cheerio.load(html);
    const parent = $(`#${months[0]}_2`).parent();
    const ul = parent.nextAll('ul').eq(0);
    const output = ul.find('li').map((i, el) => parseLi($(el)));
}

function init(){

    const files = fs.readdirSync(inputPath)
        .filter(d => d.includes('.html'));
    
    files.slice(0,1).map(extractPeople);


};

init();