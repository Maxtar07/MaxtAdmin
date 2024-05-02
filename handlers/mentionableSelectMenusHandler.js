const path = require(`path`);
const getAllFiles = require(`../utils/getAllFiles`);
module.exports = (exceptions = []) => {
    let localMentionableSelectMenus = [];
    const mentionableSelectMenuCategories = getAllFiles(path.join(__dirname, `..`, `selectmenus`), true);
    for (const mentionableSelectMenuCategory of mentionableSelectMenuCategories) {
        const mentionableSelectMenuFiles = getAllFiles(mentionableSelectMenuCategory);
        for (const mentionableSelectMenuFile of mentionableSelectMenuFiles) {
            const mentionableSelectMenuObject = require(mentionableSelectMenuFile);
            if (exceptions.includes(mentionableSelectMenuObject.mentionableSelectMenuId)) {
                continue;
            }
            localMentionableSelectMenus.push(mentionableSelectMenuObject);
        }
    }
    return localMentionableSelectMenus;
};