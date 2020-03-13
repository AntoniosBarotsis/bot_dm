module.exports = {
    name: 'role',
    description: 'Returns amount of people that have the given role',
    execute(message, args) {

        let str = "";
        str = str.concat(args).replace(/,/g, " ");

        let role = message.guild.roles.find(role => role.name === str);
        let membersWithRole = message.guild.roles.get(role.id).members;
        message.channel.send(membersWithRole.size);
    },
};