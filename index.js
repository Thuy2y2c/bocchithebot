const mineflayer = require('mineflayer');
var tpsPlugin = require('mineflayer-tps')(mineflayer)
const { username, prefix, password } = require('./config.json');
const ms = require('ms');

console.log('\x1b[33m%s\x1b[0m','[Console] Creating bot...');

const botArgs = { // Create bot
    host: '51.81.220.187', // 51.81.220.187 for 8b8t
    port: '25565',
    username: username,
    version: '1.12.2'
};

const initBot = () => {

    // Create the bot
    let bot = mineflayer.createBot(botArgs);

    // Load Mineflayer Plugins
    bot.loadPlugin(tpsPlugin)

    console.log('\x1b[33m%s\x1b[0m',`[Console] Logged in as ${username}`);

    bot.on('message', message => { // logs messages to console + logins for the server
        console.log('\x1b[36m%s\x1b[0m', '[CHAT]' + '\x1b[0m', '' + message.toString());
            if (message.toString() === ("[8b8t] Please, login with the command: /login <password>")) {
                bot.chat(`/login ` + password) } // Login (not gonna use .env, if you're using a public service like repl.it and you got hacked its your fault.)
            if (message.toString() === ("Successful login!")) {
                console.log('\x1b[33m%s\x1b[0m','[Console] Bot has joined the server!') } // Bot has joined the server
      });
    
      bot.on("move", ()=>{ // Tried this on 2b2t. A player kidnapped the bot.
        let enemy = bot.nearestEntity();
    
        if (enemy) {
            bot.lookAt(enemy.position.offset(0, enemy.height, 0))
            bot.swingArm('right')
            setInterval(() => {
               bot.setControlState('sneak', true)
           }, 450);
           setInterval(() => {
            bot.setControlState('sneak', false)
        }, 200); // friendly got cool downs for anticheats
      }
    });

        bot.on('chat', (username, message) => {
            if (username === bot.username) return
            if (message === prefix + 'help') {
              bot.chat('Commands : help, info, botstatus, ping, serverstatus')
              console.log('\x1b[33m%s\x1b[0m',`[Console] ${username} executed help command!`)
            }
          });

          bot.on('chat', (username, message) => {
            if (username === bot.username) return
            if (message === prefix + 'info') {
              bot.chat(`${bot.username} is using Thuy2y2c/bocchithebot source code.`)
              console.log('\x1b[33m%s\x1b[0m',`[Console] ${username} executed info command!`)
            }
          });
          
          bot.on('chat', (username, message) => {
            if (username === bot.username) return
            if (message === prefix + 'botstatus') {
              bot.chat(`${bot.username} currently has ${bot.health}hp and ${bot.food} as hunger.`)
              console.log('\x1b[33m%s\x1b[0m',`[Console] ${username} executed botstatus command!`)
            }
          });

          bot.on('chat', (username, message) => {
            if (username === bot.username) return
            if (message === prefix + 'ping') {
              bot.chat(`Your ping: ${bot.player.ping}ms`) // only checks for the player that executes the command. (might do the $ping (player) so other players can check their friend ping.)
              console.log('\x1b[33m%s\x1b[0m',`[Console] ${username} executed ping command!`)
            }
          });

          bot.on('chat', (username, message) => {
            if (username === bot.username) return
            if (message === prefix + 'serverstatus') {
            bot.chat(`TPS: ${bot.getTps()} | Players: ${Object.values(bot.players).map(player => player.username).length}`)
              console.log('\x1b[33m%s\x1b[0m',`[Console] ${username} executed serverstatus command!`)
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
