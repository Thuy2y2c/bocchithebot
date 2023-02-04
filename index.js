const mineflayer = require('mineflayer');
require('dotenv').config(); // .env
const { username } = require('./config.json');
const ms = require('ms');

const loggers = require('./logging.js');
const logger = loggers.logger;

// Mineflayer plugins :
const { autototem } = require('mineflayer-auto-totem') // autototem

const botArgs = { // Tạo bot
    host: '51.81.220.187',
    port: '25565',
    username: username,
    version: '1.12.2'
};

const initBot = () => {

    // Create the bot
    let bot = mineflayer.createBot(botArgs);

    // Loads the plugins that are installed ^^
    bot.loadPlugin(autototem);

    bot.on('message', message => { // logs messages to console + logins
        logger.info(message.toString())
            if (message.toString() === ("[8b8t] Please, login with the command: /login <password>")) {
                bot.chat('/login') }
      });

      bot.on("physicsTick", async () => { // Auto-totem
        bot.autototem.equip()
    })

    bot.on('death', () => {
        logger.warn(
           `Bot killed.. respawning..`
        );
     });

    bot.on('end', () => { // Reconnect system when the bot is kicked
        console.warn(`Bot got disconnected.. reconnecting`);

        // Attempt to reconnect
        setTimeout(initBot, 5000); // reconnect
    });

    bot.on('error', (err) => {
        if (err.code === 'ECONNREFUSED') {
            console.warn(`Can't connect to : ${err.address}:${err.port}`)
        }
        else {
            console.warn(`Unhandled error: ${err}`);
        }
    });
};

initBot();