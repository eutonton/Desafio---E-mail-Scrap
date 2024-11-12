require('dotenv').config();
const nodemailer = require('nodemailer');

// Variáveis do .env
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const RECEIVER_EMAIL = process.env.RECEIVER_EMAIL;

async function sendEmail(data) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', // Configuração do host
        port: 587,              // Configuração da porta
        secure: false,          // Usar TLS
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS,
        },
    });

    // Gerar conteúdo do e-mail
    const htmlContent = `
        <h2>Artilheiros da Champions League</h2>
        <table border="1" cellpadding="5" cellspacing="0">
            <thead>
                <tr>
                    <th>Jogador</th>
                    <th>Gols</th>
                    <th>Idade</th>
                    <th>Clube</th>
                </tr>
            </thead>
            <tbody>
                ${data.map(scorer => `
                    <tr>
                        <td>${scorer.nome || 'Indefinido'}</td>
                        <td>${scorer.gols || 'Indefinido'}</td>
                        <td>${scorer.idade || 'Indefinido'}</td>
                        <td>${scorer.clube || 'Indefinido'}</td>
                    </tr>`).join('')}
            </tbody>
        </table>
    `;

    const mailOptions = {
        from: EMAIL_USER,
        to: RECEIVER_EMAIL,
        subject: 'Artilheiros da Champions League - Dados do Scraping',
        html: htmlContent,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('E-mail enviado com sucesso!');
    } catch (error) {
        console.error('Erro ao enviar o e-mail:', error);
    }
}

// Exporta a função de envio de e-mail
module.exports = { sendEmail };
