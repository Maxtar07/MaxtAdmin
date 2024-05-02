const path = require(`path`);
const getAllFiles = require(`../utils/getAllFiles`);
module.exports = (exceptions = []) => {
    let localChannelSelectMenus = [];
    const channelSelectMenuCategories = getAllFiles(path.join(__dirname, `..`, `selectmenus`), true);
    for (const channelSelectMenuCategory of channelSelectMenuCategories) {
        const channelSelectMenuFiles = getAllFiles(channelSelectMenuCategory);
        for (const channelSelectMenuFile of channelSelectMenuFiles) {
            const channelSelectMenuObject = require(channelSelectMenuFile);
            if (exceptions.includes(channelSelectMenuObject.channelSelectMenuId)) {
                continue;
            }
            localChannelSelectMenus.push(channelSelectMenuObject);
        }
    }
    return localChannelSelectMenus;
};