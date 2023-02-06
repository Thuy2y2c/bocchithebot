const mineflayer = require('mineflayer');
const { username, prefix, password } = require('./config.json');
const ms = require('ms');

console.log('\x1b[33m%s\x1b[0m','[Console] Creating bot...');

    // Mineflayer plugins :
    var tpsPlugin = require('mineflayer-tps')(mineflayer);
    
const botArgs = { // Create bot
    host: '51.81.220.187', // 51.81.220.187 for 8b8t
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
                bot.chat(`/login ` + password) } // Login (not gonna use .env, if you're using a public service like repl.it and you got hacked its your fault.)
            if (message.toString() === ("Successful login!")) {
                console.log('\x1b[33m%s\x1b[0m','[Console] Bot has joined the server!') } // Bot has joined the server
      });
    
      bot.on("move", ()=>{ // THE FRIENDLY FEATURE. (remove if you want) https://streamable.com/2pj3ur
        let gamer = bot.nearestEntity();
    
        if (gamer) {
            bot.lookAt(gamer.position.offset(0, gamer.height, 0)); // look at their head
            bot.setControlState('jump', true) 
            bot.swingArm('right')
            setInterval(() => {
                bot.setControlState('sneak', true) 
                bot.setControlState('sneak', false);
              }, 450); // the lower the amount the friendlier (this could lags the server remove if u want) 
         // console.log(`looking at ${gamer.username}`)
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
