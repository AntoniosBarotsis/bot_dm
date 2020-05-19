const Discord = require('discord.js')
const client = new Discord.Client()

module.exports = {
    name: 'programmedm',
    description: 'sends a dm to all users with no programme roles!',
    execute(message, args) {

        var msgTxt = "I have noticed that you haven't picked up a *programme role* on the applicants" +
            " server for the Dutch TUs (*3TU*). Programme roles give you access to special channels related to your programme. " +
            "If you plan to stick around please hop on over the roles text channel (*#roles*) " +
            "on the server and pick one by reacting to the messages or ask a staff member (*the people with green names/NWA role*) " +
            "to help you out.\n\nThis is a bot and the message is automatically sent to all users of the " +
            "server who have not picked any programme roles so please do not reply here!"

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

            const programmeRoles = new Set([
                "Aerospace Engineering",
                "Applied Physics",
                "Architecture",
                "Chemical Engineering",
                "Computer Science and Engineering",
                "Electrical Engineering",
                "Mechanical Engineering",
                "Molecular Science & Technology",
                "Nanobiology",
                "TUD Aero Students",
                "TUD Applied Physics Students",
                "TUD CSE Students",
                "TUD EE Students",
                "TUD Mech Students",
                "TUD Molecular Science & Technology Students",
                "TUE CSE students",
                "UTwente CSE students",
                "UTwente Mech Students",
            ])

            var users = guildMembers.members.array().filter(users => users.user.bot === false &&
                users.roles.size > 1 && !users.deleted &&
                !users.roles.some(r => programmeRoles.has(r.name)))

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
