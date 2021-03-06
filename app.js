const Discord = require('discord.js')
const fs = require('fs')
require('dotenv').config();

const { prefix } = require('./config.json')
const token = process.env.token
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
const client = new Discord.Client()
client.commands = new Discord.Collection()



for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
}

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)
    client.user.setActivity(`${prefix} 😳`)
})

client.on('error', m => logger.log('error', m))

client.on('message', message => {

    if (!message.content.startsWith(prefix) || message.author.bot) {
        return;
    }

    let args = message.content.substring(prefix.length).split(" ");
    const command = args.shift().toLowerCase();
console.log(message)
    if (!client.commands.has(command)) return;

    try {
        client.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('Bruh??');
    }
})

console.log(prefix)
client.login(token);