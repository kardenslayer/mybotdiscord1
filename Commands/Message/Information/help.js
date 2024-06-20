const {
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
} = require("discord.js");

module.exports = {
  name: "help",
  aliases: ["h", "cmds", "commands"],
  edesc:"help",
  description: `need help ? see my all commands`,
  userPermissions: [],
  botPermissions: [],
  category: "Information",
  cooldown: 5,


  run: async (client, message, args, prefix) => {
    // Code

    message.delete({ timeout: 1000 })

    const emoji = {
      Channel:"<:channel:1157978919954284635>",
      Fun:"<:icons_star:1158294366050332682> ",
      Games:"<:games:1157977737059905567>",
      Information:"<:exclamation_kastro:1135202881209913449>",
      Level:"<:icons_up:1158294918712795136>",
      Moderation:"<:icons_staff:1158294197535772773>",
      Music:"<:music626:1157977518305984534>",
      Settings:"<:settings:1157976849117368351>",
      Utility:"<:VIP_Icon:1158066776349876264>",
    };

    const desc = {
      Channel:"View commands related to channels",
      Fun:"View commands that are fun related",
      Games:"View commands that can be used to play games",
      Information:"View commands to get info about bot",
      Level:"View commands that can be used for level system",
      Moderation:"View commands that can be used for moderation",
      Music:"View music related commands",
      Settings:"View setup and settings related commands",
      Utility:"View utility related commands",
    };



    let raw = new MessageActionRow().addComponents([
      new MessageSelectMenu()
        .setCustomId("help-menu")
        .setPlaceholder(`DOOM Help Menu . . .`)
        .addOptions([
          {
            label: `Home`,
            value: "home",
            emoji: `<:icons_home:1158294543276462080>`,
            description: `Click to go to Homepage`,
          },
          client.mcategories.map((cat) => {
            return {
              label: `${cat.toLocaleUpperCase()}`,
              value: cat,
              emoji: emoji[cat],
              description: desc[cat],
            };
          }),
        ]),
    ]);

    let help_embed = new MessageEmbed()
      .setColor("#343A40")
      .setAuthor({
        name: client.user.username + ` Help Menu`,
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      })
      .setFooter("This Command Will Be Deactivated After 60sec.")
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .setDescription(" • Prefix for this server is `.`\n• Total commands: 78\n• [Invite](https://discord.com/api/oauth2/authorize?client_id=1152262538772353084&permissions=8&scope=applications.commands%20bot) | [Join](https://discord.gg/GM3kXbhHww)\n > <:kronixCrown:1075039553976549386> **__My Categories are__** :\n\n >>>   <:icons_home:1158294543276462080>  Home\n<:channel:1157978919954284635>  Channel\n<:icons_star:1158294366050332682>  Fun\n<:games:1157977737059905567>   Games\n<:exclamation_kastro:1135202881209913449>   Information\n<:icons_up:1158294918712795136>  Level\n<:icons_staff:1158294197535772773>  Moderation\n<:music626:1157977518305984534>  Music\n<:settings:1157976849117368351>  Settings\n<:VIP_Icon:1158066776349876264>  Utility")
        .addField("<:kronixCrown:1075039553976549386> **__STATS:__**",
  `>>> <:api_latency_kastro:1064433448242122803> on **${client.guilds.cache.size} Servers**\n<:ping_kastro:1064433484501876826>  **\`${Math.floor(client.ws.ping)}ms\` Ping**`)
      

    let main_msg = await message.channel.send({
      embeds: [help_embed],
      components: [raw],
    });

    let filter = (i) => i.user.id === message.author.id;
    let colector = await main_msg.createMessageComponentCollector({
      filter: filter,
      time: 60000,
    });
    colector.on("collect", async (i) => {
      if (i.isSelectMenu()) {
        await i.deferUpdate().catch((e) => { });
        if (i.customId === "help-menu") {
          let [directory] = i.values;
          if (directory == "home") {
            main_msg.edit({ embeds: [help_embed] }).catch((e) => { });
          } else {
            main_msg
              .edit({
                embeds: [
                  new MessageEmbed()
                    .setColor("#0B666A")
                    .setTitle(
                      `${emoji[directory]} ${directory} Commands ${emoji[directory]}`
                    )
                    .setThumbnail(message.guild.iconURL({ dynamic: true }))
                    .setDescription(
                      `>>> ${client.mcommands
                        .filter((cmd) => cmd.category === directory)
                        .map((cmd) => {
                          return `• ** ${cmd.name}** → ${cmd.description} \n`;
                        })
                        .join("")}`
                    )
                  .setFooter(client.getFooter(message.author)),
                ],
              })
              .catch((e) => null);
          }
        }
      }
    });

    colector.on("end", async (c, i) => {
      raw.components.forEach((c) => c.setDisabled(true));
      main_msg.edit({ components: [raw] }).catch((e) => { }).then(msg => {
        setTimeout(() => msg.delete(), 1000)
      })
    });
  },
};
