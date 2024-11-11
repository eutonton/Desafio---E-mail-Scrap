// scrape.js
const puppeteer = require('puppeteer');

async function scrapeTopScorers() {
    const url = 'https://www.transfermarkt.com.br/uefa-champions-league/torschuetzenliste/pokalwettbewerb/CL';
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'load', timeout: 0 });

    const scorersData = await page.evaluate(() => {
        const rows = document.querySelectorAll('.items tbody tr');
        const data = [];

        rows.forEach(row => {
            const player = row.querySelector('.spielprofil_tooltip')?.innerText.trim();
            const goals = row.querySelectorAll('td')[4]?.innerText.trim();
            const age = row.querySelectorAll('td')[2]?.innerText.trim();
            const club = row.querySelectorAll('td')[1]?.querySelector('img')?.alt;

            if (player && goals && age && club) {
                data.push({ player, goals, age, club });
            }
        });

        return data;
    });

    await browser.close();
    return scorersData;
}

// Exporta a função de scraping
module.exports = { scrapeTopScorers };
