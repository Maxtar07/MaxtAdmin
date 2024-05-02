const messageContextMenusHandler = require(`../../handlers/messageContextMenusHandler`);
const inactiveMessageContextMenus = require(`../../models/InactiveMessageContextMenus`);
const areMessageContextMenusDifferent = require(`../../utils/areMessageContextMenusDifferent`);
module.exports = async (bot, interaction) => {
    const localMessageContextMenus = messageContextMenusHandler();
    const botMessageContextMenus = await bot.application.commands.fetch();
    for (const botMessageContextMenu of botMessageContextMenus.values()) {
        if (botMessageContextMenu.type === 3) {
            let inactivemessagecontextmenu = await inactiveMessageContextMenus.findOne({ name: botMessageContextMenu.name });
            const localMessageContextMenu = localMessageContextMenus.find((c) => c.name === botMessageContextMenu.name);
            if (!localMessageContextMenu) {
                if (inactivemessagecontextmenu) {
                    await inactivemessagecontextmenu.deleteOne();
                }
                await botMessageContextMenu.delete();
                console.log(`MessageContextMenu supprimé : ${botMessageContextMenu.name}`);
            } else {
                if (!inactivemessagecontextmenu) {
                    const newInactiveMessageContextMenu = new inactiveMessageContextMenus({
                        name: localMessageContextMenu.name
                    });
                    newInactiveMessageContextMenu.save().then(() => {
                        console.log(`Le MessageContextMenu ${localMessageContextMenu.name} a été enregistré avec succès dans la base de données.`);
                    });
                } else {
                    if (inactivemessagecontextmenu.inactive) {
                        await botMessageContextMenu.delete();
                        console.log(`MessageContextMenu supprimé : ${botMessageContextMenu.name}`);
                    }
                    const differences = areMessageContextMenusDifferent(localMessageContextMenu, botMessageContextMenu);

                    if (Object.keys(differences).length > 0) {
                        await botMessageContextMenu.edit(localMessageContextMenu);
                        console.log(`MessageContextMenu mis à jour : ${botMessageContextMenu.name}`);
                        logOptionDifferences(differences);
                    }
                }
            }
        }
    }
    for (const localMessageContextMenu of localMessageContextMenus) {
        if (localMessageContextMenu.type === 3) {
            const botMessageContextMenu = botMessageContextMenus.find((c) => c.name === localMessageContextMenu.name);

            let inactivemessagecontextmenu = await inactiveMessageContextMenus.findOne({ name: localMessageContextMenu.name });
            if (!inactivemessagecontextmenu) {
                const newInactiveMessageContextMenu = new inactiveMessageContextMenus({
                    name: localMessageContextMenu.name
                });
                newInactiveMessageContextMenu.save().then(() => {
                    console.log(`MessageContextMenu ${localMessageContextMenu.name} enregistré avec succès dans la base de données.`);
                }).then(async () => {
                    if (!botMessageContextMenu) {
                        await bot.application.commands.create(localMessageContextMenu);
                        console.log(`MessageContextMenu créé : ${localMessageContextMenu.name}`);
                    }
                })
            } else {
                if (!botMessageContextMenu) {
                    if (!inactivemessagecontextmenu.inactive) {
                        await bot.application.commands.create(localMessageContextMenu);
                        console.log(`MessageContextMenu créé : ${localMessageContextMenu.name}`);
                    }
                }

            }
        }
    }
    console.log(`Les messagecontextmenus ont été enregistrés avec succès.`);
}
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