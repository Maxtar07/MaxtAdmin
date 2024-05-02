const areCommandsDifferent = require(`../../utils/areCommandsDifferent`);
const commandsHandler = require(`../../handlers/commandsHandler`);
const inactiveCommands = require(`../../models/InactiveCommands`);

module.exports = async (bot, interaction) => {
    const localCommands = commandsHandler();
    const botCommands = await bot.application.commands.fetch();
    for await (const botCommand of botCommands.values()) {
        if (botCommand.type === 1) {
            let inactivecommand = await inactiveCommands.findOne({ name: botCommand.name });
            const localCommand = localCommands.find((c) => c.name === botCommand.name);
            if (!localCommand) {
                if (inactivecommand) {
                    await inactivecommand.deleteOne();
                }
                await botCommand.delete();
                console.log(`Commande supprimée : ${botCommand.name}`);
            } else {
                if (!inactivecommand) {
                    const newinactivecommand = new inactiveCommands({
                        name: localCommand.name,
                    });
                    newinactivecommand.save().then(() => {
                        console.log(`La commande ${localCommand.name} a été enregistrée avec succès dans la base de données.`);
                    });
                } else {
                    if (inactivecommand.inactive) {
                        await botCommand.delete();
                        console.log(`Commande supprimée : ${botCommand.name}`);
                    }
                    const differences = areCommandsDifferent(localCommand, botCommand);

                    if (Object.keys(differences).length > 0) {
                        await botCommand.edit(localCommand);
                        console.log(`Commande mise à jour : ${botCommand.name}`);
                        logOptionDifferences(differences);
                    }
                }
            }
        }
    }

    for await (const localCommand of localCommands) {
        if (localCommand.type === 1) {
            const botCommand = botCommands.find((c) => c.name === localCommand.name);

            let inactivecommand = await inactiveCommands.findOne({ name: localCommand.name });
            if (!inactivecommand) {
                const newinactivecommand = new inactiveCommands({
                    name: localCommand.name,
                });
                newinactivecommand.save().then(() => {
                    console.log(`Commande ${localCommand.name} enregistrée avec succès dans la base de données.`);
                }).then(async () => {
                    if (!botCommand) {
                        await bot.application.commands.create(localCommand);
                        console.log(`Commande créée : ${localCommand.name}`);
                    }
                })
            } else {
                if (!botCommand) {
                    if (!inactivecommand.inactive) {
                        await bot.application.commands.create(localCommand);
                        console.log(`Commande créée : ${localCommand.name}`);
                    }
                }

            }
        }
    }

    console.log(`Les commandes ont été enregistrées avec succès.`);
};

function logOptionDifferences(differences, prefix = ``) {
    for (const key in differences) {
        const optionPrefix = `${prefix}${key}`;

        if (typeof differences[key] === `boolean`) {
            const path = optionPrefix.split(`.`).reverse().join(` `);
            const words = path.replace(/(\d+)\s(options)/g, (_, p1) => `de l'option ${Number(p1) + 1}`).split(` `);
            const formattedPath = words.join(` `);
            console.log(` - ${formattedPath} a été modifié`);
        } else {
            const subDifferences = differences[key];
            if (Object.keys(subDifferences).length > 0) {
                logOptionDifferences(subDifferences, `${optionPrefix}.`);
            } else {
                const path = optionPrefix.split(`.`).reverse().join(` `);
                const words = path.replace(/(\d+)\s(options)/g, (_, p1) => `de l'option ${Number(p1) + 1}`).split(` `);
                const formattedPath = words.join(` `);
                console.log(` - ${formattedPath} a été modifié`);
            }
        }
    }
}