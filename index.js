const Discord = require("discord.js");
const client = new Discord.Client();
const { MessageEmbed } = require('discord.js');
const { getMember } = require('./utils'); 
const config = {
  prefix: "tu-prefix",
  token: "tu-token"
}
client.on("ready", () => {
  console.log(`${client.user.tag}listo`)
});

client.on("message", async (message) => {

  if (message.author.bot) return;
  if (!message.content.startsWith(config.prefix)) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift();

  if (command == "avatar"){

    const embed = new MessageEmbed();
    const member = await getMember(message, args.join(''));
    const avaurl = member.user.displayAvatarURL({ format: 'jpg', dynamic: true, size: 4096 });
    embed.setImage(avaurl)
    .setColor("PURPLE")
    .setTitle(`Avatar de ${member.user.username}`)
    .setDescription(`[Avatar URL](${avaurl})`)
    .setFooter(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp()

    .setColor(message.guild.me.displayHexColor)
    message.channel.send(embed);
  }
});

client.login(config.token)
