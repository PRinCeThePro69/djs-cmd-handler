const { Client, Collection } = require("discord.js");

const client = new Client({
    intents: 32767,
});
module.exports = client;
require('dotenv').config()
// Global Variables
client.commands = new Collection();


// Initializing the project
require("./handler/index")(client);
require("./handler/antiCrash")(client);


client.login(process.env.token);
