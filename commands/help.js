const Discord = require('discord.js');

module.exports.run = async (client, msg, args, config) => {
    let embed = new Discord.RichEmbed()
        .setColor('#E09099')
        .setDescription(`
Type **${config.PREFIX}help <command>** for more information about a command.
For arguments <> means required, [] means optional.`)
        .addField('Commands', client.commands.map(x => `\`${x.help.name}\``).join(', '))
        .setFooter(`Bot made by jewdev | Ping: ${client.ping}`)
        .setTimestamp();

        if(!args.join(' ')) return msg.channel.send(embed);

        let searchCmd = args.join(' ');
        if(client.commands.has(searchCmd)) {
            searchCmd = client.commands.get(searchCmd);

            let helpEmbed = new Discord.RichEmbed()
            .setColor('#E09099')
            .setDescription(`
**Name:** ${searchCmd.help.name}
**Description:** ${searchCmd.help.description}`);

            msg.channel.send(helpEmbed);
        } else {
            msg.reply('This command doesn\'t exists.');
        }
};

module.exports.help = {
    name: `help`,
    description: `Bot's commands`
};