const client = require("../index");
const Discord = require(`discord.js`);
const chalk = require('chalk');
const simplydjs = require("simply-djs");

let statuses = [
                ".help | @DOOM","SUBBEEEYY",
                ]
let e = statuses.length

function status()
  {
i = Math.floor(Math.random() * (e))
client.user.setActivity(statuses[i]
  ,
  {
    type: "WATCHING",
  });
    
  }


client.on("ready", async () => {

simplydjs.connect(process.env.MONGO)

setInterval(status,3000)

console.clear()
console.log(chalk.bgBlack(chalk.greenBright(`═════════════════════════════════════════════`)));
console.log(chalk.magenta(`
DOOM | DOOM Forever
`))
    console.log(chalk.bgBlack(chalk.magentaBright(`═════════════════════════════════════════════`)));
    console.log(chalk.yellowBright("DOOM | Online And Fully Functional"))
    console.log(chalk.bgBlack(chalk.yellowBright(`═════════════════════════════════════════════`)))

    console.log(chalk.cyanBright(`DOOM | Node: ${process.version}
DOOM | Discord.js: ${Discord.version}
DOOM | Connected as: ${client.user.username}
DOOM | ID: ${client.user.id}
DOOM | Owner: ⍟ ・🜲 SUBBEEEYY`));
    console.log(chalk.bgBlack(chalk.cyanBright(`═════════════════════════════════════════════`)))
    console.log(chalk.red(`DOOM | Currently watching ${client.guilds.cache.size} Servers`));
    console.log(chalk.bgBlack(chalk.red(`═════════════════════════════════════════════`)));
    })


  

  
  // loading database
  require('../handlers/Database')(client)

  client.guilds.cache.forEach(async (guild) => {
    await client.updateembed(client, guild)
  })
