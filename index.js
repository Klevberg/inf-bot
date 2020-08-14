const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();

// The id of the channel where the bot will operate. Change to your needs.
const bot_channel = "743877236935098388";

client.once('ready', () => {
	console.log('Ready!'); // Print "Ready!" when bot is up and running.
});

client.on('message', message => {

    if (message.channel.id === bot_channel && !message.member.user.bot) {

        const content = message.content;
        console.log(content);

        if (!isNaN(content)) { // Check if input is a number.

            console.log(content + " IS a valid number.");

            const number = +content; // Convert string to integer.
            console.log("Integer: " + number);

            if (number > 0 && number <= 24) {

                console.log(content + " IS between 1 and 24.");

                const role_name = "gruppe" + content;
                const role = message.guild.roles.cache.find(role => role.name === role_name);
                message.member.roles.add(role); // Assign role to user.

            }
            else {

                console.log(content + " is NOT between 1 and 24.");

                message.reply("Please enter a number between 1 and 24.")
                .then(msg => {
                    msg.delete({timeout: 10000}) // Delete reply after 10 seconds.
                })
                .catch();

            }
        }
        else {

            console.log(message + " is NOT a valid number.");

            message.reply("Please enter a number between 1 and 24.")
            .then(msg => {
                msg.delete({timeout: 10000}) // Delete reply after 10 seconds.
            })
            .catch();

        }
        message.delete(); // Delete user's message.
    }

});

client.login(token);