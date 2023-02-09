const mineflayer = require('mineflayer');
var tpsPlugin = require('mineflayer-tps')(mineflayer)
const { username, prefix, password } = require('./config.json');
const ms = require('ms');

console.log('\x1b[33m%s\x1b[0m','[Console] Creating bot...');

const config = require('./botsettings.json');

// Mineflayer plugins sits here.
const pvp = require('mineflayer-pvp').plugin
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder')
var tpsPlugin = require('mineflayer-tps')(mineflayer)
const armorManager = require('mineflayer-armor-manager')

const botArgs = { // Create bot
    host: 'localhost', // 51.81.220.187 for 8b8t
    port: '49533',
    username: username,
    version: '1.12.2'
};

const initBot = () => {

    // Create the bot
    let bot = mineflayer.createBot(botArgs);

    // Load Mineflayer Plugins
    bot.loadPlugin(tpsPlugin)
    bot.loadPlugin(armorManager)
    bot.loadPlugin(pathfinder)
    bot.loadPlugin(pvp)

    console.log('\x1b[33m%s\x1b[0m',`[Console] Logged in as ${username}`);

    bot.on('message', message => { // logs messages to console + logins for the server
        console.log('\x1b[36m%s\x1b[0m', '[CHAT]' + '\x1b[0m', '' + message.toString());
            if (message.toString() === ("[8b8t] Please, login with the command: /login <password>")) {
                bot.chat(`/login ` + password) } // Login (not gonna use .env, if you're using a public service like repl.it and you got hacked its your fault.)
                if (message.toString() === ("[8b8t] Please register to play 8b8t /register <password>")) {
                bot.chat(`/register ` + password) } // Registers into 8b. Might made this universal for servers that uses the same login concept.
            if (message.toString() === ("Successful login!")) {
                console.log('\x1b[33m%s\x1b[0m','[Console] Bot has joined the server!') } // Bot has joined the server
            if (message.toString() === ("Successfully registered!")) {
                console.log('\x1b[33m%s\x1b[0m','[Console] Bot has successfully registered to the server!') } // huhu   
      });
    
    bot.armorManager.equipAll()

    bot.on("login", () => { // CHATGPT (MIGHT INTERRUPT USERS FROM USING ,help nor any commands!)
      setInterval(() => {
        {
          bot.chat(`This bot is using Thuy2y2c/bocchithebot sourcecode. ${prefix}help for commands.`); // might make a array for the bot to spam one by one per setted second, not all at once.
        }
      }, 3600000); // 1000 = 1 second (A HOUR WTF!!!)
    });

    if (config.friendlymode.enabled) {  // Don't use friendlymode when PVP feature is enabled.
      console.log('\x1b[33m%s\x1b[0m',`[Console] Friendly Mode enabled (DO NOT ENABLE PVP MODE IF THIS FEATURE IS ENABLED)`);

      bot.on("move", ()=>{ // Tried this on 2b2t. A player kidnapped the bot.
        const playerFilter = (entity) => entity.type === 'player' // filters out all entities except the player.
        let enemy = bot.nearestEntity(playerFilter);
    
        if (player) {
            bot.lookAt(player.position.offset(0, enemy.height, 0))
            bot.swingArm('right')
            setInterval(() => {
               bot.setControlState('sneak', true)
           }, 450);
           setInterval(() => {
            bot.setControlState('sneak', false)
        }, 200); // friendly got cool downs for anticheats
      }
    })
  };

  if (config.pvpmode.enabled) {  // Don't use friendlymode when PVP feature is enabled.
    console.log('\x1b[33m%s\x1b[0m',`[Console] PVP mode enabled (DO NOT ENABLE FRIENDLY MODE IF THIS FEATURE IS ENABLED)`);
      bot.on('chat', (username, message) => {
        if (message === prefix + 'pvp') {
        bot.chat("youre dead :DD i will kil u!!")
        const player = bot.players[username]
  
        if (!player) {
          bot.chat("You're not on my range, pls find me and give me armor and a sword and ask me to pvp again :D")
        return
      }
  
      bot.pvp.attack(player.entity)
    }

      if (message === prefix + 'stoppvp') {
        bot.chat("okay okay!! i will stop hurting you :(")
        bot.pvp.stop()
      }
    })
  };

        bot.on('chat', (username, message) => {
            if (username === bot.username) return
            if (message === prefix + 'help') {
              bot.chat('Commands : help, info, botstatus, ping, serverstatus, kill')
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
            if (message === prefix + 'kill') {
              bot.chat(`/kill`) 
              console.log('\x1b[33m%s\x1b[0m',`[Console] ${username} executed kill command!`)
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
