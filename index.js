const mineflayer = require('mineflayer');
require('dotenv').config(); // .env
const { username, prefix } = require('./config.json');
const ms = require('ms');

const loggers = require('./logging.js');
const logger = loggers.logger;

    // Mineflayer plugins :
    var tpsPlugin = require('mineflayer-tps')(mineflayer);

const botArgs = {
    host: '51.81.220.187',
    port: '25565',
    username: username,
    version: '1.12.2'
};

const initBot = () => {

    // Create the bot
    let bot = mineflayer.createBot(botArgs);

    // Load Mineflayer plugins :
    bot.loadPlugin(tpsPlugin) // tps

    bot.on('message', message => { // logs messages to console + logins for the server
        logger.info(message.toString())
            if (message.toString() === ("[8b8t] Please, login with the command: /login <password>")) {
                bot.chat('/login (yourpassword)') } // Login
      });
    
    // TPS command
    bot.on('chat', (username, message) => {
        if (username === bot.username) return
        if (message === prefix + 'tps') {
          bot.chat(`> The current TPS of the server is : ` + bot.getTps())
        }
      });

    // super lazy to make a command handler, sorry ;)
    bot.on('chat', async (username, message) => { // A list of commands instead of repeating the same thing ^^
        command = message.split(' ')
        switch (command[0]) {
          case 'AnarchyVN':
          bot.chat("shut the fuck up bro! that server is disgusting!")
          case prefix + 'botinfo':
           bot.chat(`> Hey ${username}! My hunger bar : ${bot.food} | My hearts (health) left : ${bot.health}`)
          case prefix + 'help':
           bot.chat(`> Hey ${username}! tps , botinfo , help`)
          case prefix + 'ping':
           bot.chat(`> Hey ${username}! your ping is : ${bot.player.ping}ms`)
        }
    });

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
