const Discord = require('discord.js');
const fs = require('fs');
const cooldown = new Set();

exports.run = async (client, msg, args, config) => {
    msg.delete();

    if(cooldown.has(msg.author.id)) {
        msg.reply(`You need to wait ${config.cooldown} minutes to use this command again!`)
        .then(m => {
            setTimeout(() => {
                m.delete();
            }, 5000);
        });

    } else {
        fs.readFile('./accounts/fortnite.txt', function(err, data) {
            if(err) throw err;
            data = data + '';
            var lines = data.split('\n');
            let randomAcc = lines[Math.floor(Math.random() * lines.length)];

            let embed = new Discord.RichEmbed()
            .addField('Fortnite account', `Random account (email:password): \n**${randomAcc}**`)
            .setThumbnail('https://i.imgur.com/09Fxrfw.png')
            .setColor('#FFFFFF')
            .setFooter('Bot made by jewdev')
            .setTimestamp();

            msg.author.send(embed);

            msg.reply('I\'ve sent you a the account! Please check your DM!')
            .then(m => {
                setTimeout(() => {
                    m.delete()
                }, 5000);
            });

            cooldown.add(msg.author.id);
            setTimeout(() => {
                cooldown.delete(msg.author.id);
            }, config.cooldown * 60 * 1000);
        });
    }
};