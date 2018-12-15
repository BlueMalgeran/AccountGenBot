// Account generator bot for Discord by jewdev (fromm Nulled.TO)
const Discord = require('discord.js');
const client = new Discord.Client({disableEveryone: true});

const config = require('./config.json');

const chalk = require('chalk');

const fs = require('fs');

client.commands = new Discord.Collection();

fs.readdir('./commands/', (err, files) => {
    if(err) throw err;

    let file = files.filter(f => f.endsWith('.js'));
    if(file.length <= 0) return console.log('There is js files in the commands folder');

    file.forEach((f) => {
        let props = require(`./commands/${f}`);
        console.log(chalk.yellow(`Attempting to load ${f}`));

        client.commands.set(props.help.name, props);
    });
    console.log(chalk.bold.bgGreen('Everything loaded properly.'));
});

process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});

client.on('error', () => console.error);

client.on('warn', () => console.warn);

client.on('ready', async () => {
    console.log(`This bot made by ${chalk.cyan('jewdev')} from ${chalk.bold.bgBlue('Nulled.TO')}!`);

    client.user.setActivity('jewdev#8929 is epic!', {
        type: 'STREAMING',
        url: 'https://www.twitch.tv/BlueMalgeran'
    });
});

client.on('message', async (msg) => {
    if(msg.author.bot) return;
    if(!msg.content.startsWith(config.PREFIX)) return;
    if(msg.content.indexOf(config.PREFIX) != 0) return;
    if(msg.channel.type == 'dm') return;

    const args = msg.content.slice(config.PREFIX.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, msg, args, config);
});

client.login(config.TOKEN);
