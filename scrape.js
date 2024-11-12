// scrape.js
const puppeteer = require('puppeteer');

async function getPlayersData() {
    const url = 'https://www.transfermarkt.com.br/uefa-champions-league/torschuetzenliste/pokalwettbewerb/CL';
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'load', timeout: 0 });

    const playersData = await page.evaluate(() => {
        const players = [];
        
        // Verificando a estrutura da página e se estamos acessando a tabela corretamente
        const rows = document.querySelectorAll('.items tr');
        
        // Para cada linha da tabela, extraímos os dados
        rows.forEach(row => {
            const player = {};

            // Nome do jogador
            const playerName = row.querySelector('td:nth-child(2) a');
            if (playerName) {
                player.nome = playerName.textContent.trim();
            }

            // Nacionalidade do jogador
            const nationality = row.querySelector('td:nth-child(3) img');
            if (nationality) {
                player.nacionalidade = nationality.getAttribute('title');
            }

            // Gols
            const goals = row.querySelector('td:nth-child(7) a');
            if (goals) {
                player.gols = goals.textContent.trim();
            }

            // Clube
            const club = row.querySelector('td:nth-child(5) a');
            if (club) {
                player.clube = club.textContent.trim();
            }

            // Idade
            const age = row.querySelector('td:nth-child(4)');
            if (age) {
                player.idade = age.textContent.trim();
            }

            // Verifica se os dados essenciais (nome e gols) estão presentes
            if (player.nome && player.gols) {
                players.push(player);
            } else {
                // Para depuração, se faltar algum dado, loga os detalhes da linha
                console.log('Dados ausentes para uma linha:', row);
            }
        });

        return players;
    });

    await browser.close();
    return playersData;
}

module.exports = { getPlayersData };  // Exporte a função
