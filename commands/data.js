module.exports = {
    name: 'data',
    description: 'reterns pure data',
    execute(message, args) {

        async function func() {

            if (!message.member.hasPermission("ADMINISTRATOR")) {
                message.reply("You dont have Admin perms")
                return;
            }

            const guildMembers = await message.guild.fetchMembers()

            var users = guildMembers.members.array().filter(users => users.user.bot === false && users._roles.length === 0 && !users.deleted)

            console.log("\nSending messages...\n")

            // for (var i = 0; i < users.length; i++){
            //     console.log(users[i].user.username)
            // }

            console.log(users[0])


            console.log("\nDone")
            message.channel.send(`Done`)
        }

        func();

    },
};