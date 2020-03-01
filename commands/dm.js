const Discord = require('discord.js')
const client = new Discord.Client()

module.exports = {
    name: 'dm',
    description: 'sends a dm to all users with no roles!',
    execute(message, args) {

        var msgTxt = "I have noticed that you haven't picked up any roles at the applicants" +
            " server for the dutch TUs. If you plan to stick around please hop on over the roles text channel (*#roles*) " +
            "on the server and pick a few by reacting to the messages or ask a staff member (*the people with green names/NWA role*) " +
            "to help you out with them and country roles if you want. Having roles for everyone helps us organize and allows you to " +
            "access channels that might help you (*University specific channels and more*). If you don't pick up roles, you'll be labeled as inactive " +
            "and possibly removed to keep the member count cleaner.\n\nThis is a bot and the message is automatically sent to all users of the " +
            "server that have not picked any roles so please do not reply here!"

        var msg = new Discord.RichEmbed().setColor("#00A6D6").addField(`**Hello there,**\n`, msgTxt)

        async function sendDm() {

            if (!message.member.hasPermission("ADMINISTRATOR")) {
                message.reply("You dont have Admin perms")
                return;
            }

            const channel = message.guild.channels.find(channel => channel.name === "nwa")

            if (message.channel !== channel) {
                message.reply("Command is not allowed in this channel")
                return;
            }

            const guildMembers = await message.guild.fetchMembers()

            var users = guildMembers.members.array().filter(users => users.user.bot === false && users._roles.length === 0 && !users.deleted)

            console.log("\nSending messages...\n")

            for (var i = 0; i < users.length; i++) {
                users[i].user.send(msg)
                    .then(console.log(`User: ${users[i].user.username} (${i + 1}/${users.length}).`))
            }

            console.log("\nDone")
            message.channel.send("Done")
        }

        sendDm();


    },
}