const Discord = require('discord.js');
const { token } = require('./config.json');
const client = new Discord.Client();

// The id of the channel where the bot will operate. Change to your needs.
const bot_channel = "743877236935098388";
const indent = "  ->"
const groups = 26;

client.once("ready", () => {
	console.log("Ready!\n"); // Print "Ready!" when bot is up and running.
});

client.on('message', message => {

    if (message.channel.id === bot_channel && !message.member.user.bot) {

        const content = message.content;
        console.log(`${message.member.displayName} entered string "${content}"`);
        // TODO: Add a time and date to the above.

        if (!isNaN(content)) { // Check if input is a number.

            const number = +content; // Convert string to integer.
            console.log(`${indent} ${content} IS a valid number. Integer: ${number}`);

            if (number > 0 && number <= groups) {

                console.log(`${indent} ${content} IS between 1 and ${groups}.`);
                console.log(`${indent} Success.\n`);

                const role_name = `gruppe${content}`;
                const role = message.guild.roles.cache.find(role => role.name === role_name);
                message.member.roles.add(role); // Assign role to user.

            }
            else {

                console.log(`${indent} ${content} is NOT between 1 and ${groups}.`);
                console.log(`${indent} Failure.\n`);

                message.reply(`please enter a number between 1 and ${groups}.`)
                .then(msg => {
                    msg.delete({timeout: 10000}) // Delete reply after 10 seconds.
                })
                .catch();

            }
        }
        else if (content.toUpperCase() == "LKT") {
            console.log(`${indent} ${content} IS a valid code.`);
            console.log(`${indent} Success.\n`);

            const role_name = `gruppe${content.toUpperCase()}`;
            const role = message.guild.roles.cache.find(role => role.name === role_name);
            message.member.roles.add(role); // Assign role to user.
        }
        else {

            console.log(`${indent} "${content}" is NOT a valid number / code.`);
            console.log(`${indent} Failure.\n`);

            message.reply(`please enter a number between 1 and ${groups}, or a valid code.`)
            .then(msg => {
                msg.delete({timeout: 10000}) // Delete reply after 10 seconds.
            })
            .catch();

        }
        message.delete(); // Delete user's message.
    }

});

client.login(token);