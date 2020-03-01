module.exports = {
    name: 'perms',
    description: 'Shows how the checks implemented in dm.js would work',
    execute(message, args) {

        message.channel.send(`Admin: ${message.member.hasPermission("ADMINISTRATOR")}\n` +
            `Channel: ${message.guild.channels.find(channel => channel.name === "nwa") === message.channel}`)

    },
};