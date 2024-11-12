require('dotenv').config();
const { getPlayersData } = require('./scrape');
const { sendEmail } = require('./email');

async function main() {
    const scorersData = await getPlayersData();
    console.log(scorersData); // Verifica se os dados estão corretos

    await sendEmail(scorersData);
}

main();
