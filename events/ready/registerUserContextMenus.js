const userContextMenusHandler = require(`../../handlers/userContextMenusHandler`);
const inactiveUserContextMenus = require(`../../models/InactiveUserContextMenus`);
const areUserContextMenusDifferent = require(`../../utils/areUserContextMenusDifferent`);
module.exports = async (bot, interaction) => {
    const localUserContextMenus = userContextMenusHandler();
    const botUserContextMenus = await bot.application.commands.fetch();
    for (const botUserContextMenu of botUserContextMenus.values()) {
        if (botUserContextMenu.type === 2) {
            let inactiveusercontextmenu = await inactiveUserContextMenus.findOne({ name: botUserContextMenu.name });
            const localUserContextMenu = localUserContextMenus.find((c) => c.name === botUserContextMenu.name);
            if (!localUserContextMenu) {
                if (inactiveusercontextmenu) {
                    await inactiveusercontextmenu.deleteOne();
                }
                await botUserContextMenu.delete();
                console.log(`UserContextMenu supprimé : ${botUserContextMenu.name}`);
            } else {
                if (!inactiveusercontextmenu) {
                    const newInactiveUserContextMenu = new inactiveUserContextMenus({
                        name: localUserContextMenu.name
                    });
                    newInactiveUserContextMenu.save().then(() => {
                        console.log(`Context Menu ${localUserContextMenu.name} enregistré avec succès dans la base de données.`);
                    });
                } else {
                    if (inactiveusercontextmenu.inactive) {
                        await botUserContextMenu.delete();
                        console.log(`UserContextMenu supprimé : ${botUserContextMenu.name}`);
                    }
                    const differences = areUserContextMenusDifferent(localUserContextMenu, botUserContextMenu);

                    if (Object.keys(differences).length > 0) {
                        await botUserContextMenu.edit(localUserContextMenu);
                        console.log(`UserContextMenu mis à jour : ${botUserContextMenu.name}`);
                        logOptionDifferences(differences);
                    }
                }
            }
        }
    }
    for (const localUserContextMenu of localUserContextMenus) {
        if (localUserContextMenu.type === 2) {
            const botUserContextMenu = botUserContextMenus.find((c) => c.name === localUserContextMenu.name);

            let inactiveusercontextmenu = await inactiveUserContextMenus.findOne({ name: localUserContextMenu.name });
            if (!inactiveusercontextmenu) {
                const newInactiveUserContextMenu = new inactiveUserContextMenus({
                    name: localUserContextMenu.name
                });
                newInactiveUserContextMenu.save().then(() => {
                    console.log(`UserContextMenu ${localUserContextMenu.name} enregistré avec succès dans la base de données.`);
                }).then(async () => {
                    if (!botUserContextMenu) {
                        await bot.application.commands.create(localUserContextMenu);
                        console.log(`UserContextMenu créé : ${localUserContextMenu.name}`);
                    }
                })
            } else {
                if (!botUserContextMenu) {
                    if (!inactiveusercontextmenu.inactive) {
                        await bot.application.commands.create(localUserContextMenu);
                        console.log(`UserContextMenu créé : ${localUserContextMenu.name}`);
                    }
                }

            }
        }
    }
    console.log(`Les usercontextmenus ont été enregistrés avec succès.`);
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