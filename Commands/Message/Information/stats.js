const { Message, MessageEmbed, version } = require("discord.js");
const BOT = require("../../../handlers/Client");
const { Queue } = require("distube");
let os = require("os");
let cpuStat = require("cpu-stat");

module.exports = {
  name: "stats",
  aliases: ["botinfo"],
  description: `see stats of bot`,
  userPermissions: ["SEND_MESSAGES"],
  botPermissions: ["EMBED_LINKS"],
  category: "Information",
  cooldown: 5,
  inVoiceChannel: false,
  inSameVoiceChannel: false,
  Player: false,
  djOnly: false,


  run: async (client, message, args, prefix, queue) => {
    // Code
    message.delete()

    
  let totalSeconds = message.client.uptime / 1000;
  let days = Math.floor(totalSeconds / 86400);
  totalSeconds %= 86400;
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = Math.floor(totalSeconds % 60);
            
  let uptime = `${days}d ${hours}h ${minutes}m and ${seconds}s `;

        let connectedchannelsamount = 0;
            let guilds = client.guilds.cache.map((guild) => guild);
            for (let i = 0; i < guilds.length; i++) {
                if (guilds[i].me.voice.channel) connectedchannelsamount += 1;
            }
            if (connectedchannelsamount > client.guilds.cache.size) connectedchannelsamount = client.guilds.cache.size;
      cpuStat.usagePercent(function(err, percent, seconds) {
        message.channel.send({
          embeds: [
            new MessageEmbed()
              .setColor("#343A40")
              .setAuthor({
                name: client.user.username ,
                iconURL: client.user.displayAvatarURL({ dynamic: true }),
              })
              .addFields (
                { 
                    name: `<a:Loading:1135109620914999317> • **Ping**`, 
                    value: `\`\`\`${client.ws.ping}ms\`\`\``, 
                    inline: true 
                },
                { 
                    name: `<a:server:1147887344905625650> • **Servers**`, 
                    value: `\`\`\`Total: ${client.guilds.cache.size} servers\`\`\``, 
                    inline: true 
                },
                {
                    name: `<a:Users:1157957175080140811> • **Users**`,
                    value: `\`\`\`Total: ${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} users\`\`\``, 
                    inline: true 
                },
                { 
                    name: `<:nodeJS:1157955938322481162> • **Node Version**`, 
                    value: `\`\`\`v${process.versions.node}\`\`\``, 
                    inline: true 
                },
                { 
                    name: `<a:discord:1147888069203210310> • **Discord.js**`, 
                    value: `\`\`\`v${version}\`\`\``, 
                    inline: true 
                },
                { 
                    name: `<a:Clock:1157956060510949478> • **Uptime**`, 
                    value: `\`\`\`${uptime}\`\`\``, 
                    inline: true 
                },               
                { 
                    name: `<:ssd:1157957707882578010> • **Arch**`, 
                    value: `\`\`\`${os.platform()} ${os.arch()}\`\`\``, 
                    inline: true 
                },
                { 
                    name: `<a:cpu:1147886961005170818> • **CPU usage**`, 
                    value: `\`\`\`${percent.toFixed(2)} %\`\`\``, 
                    inline: true
                },
                { 
                    name: `<:ram:1157956752977969182> • **RAM usage**`, 
                    value: `\`\`\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} mb\`\`\``, 
                    inline: true 
                },
				{ 
                    name: `<a:disk:1147889406720626839> • **Music**`, 
                    value: `\`\`\`Singing ${connectedchannelsamount} Servers\`\`\``, 
                    inline: true 
                },
                { 
                    name: `<a:b_crown:1157956472135757844> • **Developers**`, 
                    value: `\`\`\`mr.fickling\`\`\``, 
                    inline: true 
                },
                { 
                    name: `<a:cpu:1147886961005170818> • **CPU of Virtual Private Server (Pterodactyl)**`, 
                    value: `\`\`\`${os.cpus().map((i) => `${i.model}`)[0]}\`\`\``, 
                    inline: false 
                }
            )
              .setFooter(`Aaji Ghanta`)

          ],
        });
      });
  },
};
