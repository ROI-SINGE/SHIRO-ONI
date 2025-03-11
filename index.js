// 𝐁𝐘 𝚫𝚴𝐆𝚵𝐋𝐔𝐒 𝐃𝐄𝐕 𝐆𝐈𝐕𝐄 𝐂𝐑𝐄𝐃𝐈𝐓:
//𝐖𝐀.𝐌𝐄/241062880842

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Gestionnaire de commandes
const commands = {
    help: "Voici la liste des commandes disponibles : help, joke, weather",
    joke: async () => {
        const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
        return `${response.data.setup} ${response.data.punchline}`;
    },
    weather: async (city) => {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY`);
        return `Température à ${city}: ${response.data.main.temp}°C`;
    }
};

app.post('/webhook', async (req, res) => {
    const message = req.body.messages[0];
    let responseText = "Commande inconnue";

    if (message.text.startsWith('°help')) {
        responseText = commands.help;
    } else if (message.text.startsWith('°joke')) {
        responseText = await commands.joke();
    } else if (message.text.startsWith('°weather')) {
        const city = message.text.split(' ')[1];
        responseText = await commands.weather(city);
    }

    // Envoyer la réponse (exemple simple)
    console.log(`Sending response: ${responseText}`);

    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
