const mineflayer = require('mineflayer');
require('dotenv').config(); // .env
const { username, prefix } = require('./config.json');
const ms = require('ms');

const config = {
    password: process.env.PASSWORD // khong be oi 
  };

console.log('\x1b[33m%s\x1b[0m','[Console] Creating bot...');

    // Mineflayer plugins :
    var tpsPlugin = require('mineflayer-tps')(mineflayer);

const botArgs = { // Tạo bot
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

    console.log('\x1b[33m%s\x1b[0m',`[Console] Logged in as ${username}`);

    bot.on('message', message => { // logs messages to console + logins for the server
        console.log('\x1b[36m%s\x1b[0m', '[CHAT]' + '\x1b[0m', '' + message.toString());
            if (message.toString() === ("[8b8t] Please, login with the command: /login <password>")) {
                bot.chat(`/login ${config.token}`) } // Login (hope this works, fuck the session reconnection)
            if (message.toString() === ("Successful login!")) {
                console.log('\x1b[33m%s\x1b[0m','[Console] Bot has joined the server!') } // Bot has joined the server
      });

    // TPS command
    bot.on('chat', (username, message) => {
        if (username === bot.username) return
        if (message === prefix + 'tps') {
          bot.chat(`> The current TPS of the server is : ` + bot.getTps())
          console.log('\x1b[33m%s\x1b[0m',`[Console] ${username} executed tps command!`)
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
        console.log('\x1b[33m%s\x1b[0m',
           `Bot killed.. respawning..`
        );
     });

    bot.on('end', () => { // Reconnect system when the bot is kicked
        console.log('\x1b[33m%s\x1b[0m',`Bot got disconnected.. reconnecting`);

        // Attempt to reconnect
        setTimeout(initBot, 5000); // reconnect
    });

    bot.on('error', (err) => {
        if (err.code === 'ECONNREFUSED') {
            console.log('\x1b[33m%s\x1b[0m',`Can't connect to : ${err.address}:${err.port}`)
        }
        else {
            console.log('\x1b[33m%s\x1b[0m',`Unhandled error: ${err}`);
        }
    });
};

initBot();
