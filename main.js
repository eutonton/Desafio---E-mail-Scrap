// main.js
require('dotenv').config();
const { scrapeTopScorers } = require('./scrape');  // Importando função de scraping
const { sendEmail } = require('./email');          // Importando função de envio de e-mail

async function main() {
    // Realiza o scraping dos dados
    const scorersData = await scrapeTopScorers();
    console.log(scorersData); // Apenas para confirmar os dados no console

    // Envia os dados por e-mail
    await sendEmail(scorersData);
}

main();
