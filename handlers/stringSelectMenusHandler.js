const path = require(`path`);
const getAllFiles = require(`../utils/getAllFiles`);
module.exports = (exceptions = []) => {
    let localStringSelectMenus = [];
    const stringSelectMenuCategories = getAllFiles(path.join(__dirname, `..`, `selectmenus`), true);
    for (const stringSelectMenuCategory of stringSelectMenuCategories) {
        const stringSelectMenuFiles = getAllFiles(stringSelectMenuCategory);
        for (const stringSelectMenuFile of stringSelectMenuFiles) {
            const stringSelectMenuObject = require(stringSelectMenuFile);
            if (exceptions.includes(stringSelectMenuObject.stringSelectMenuId)) {
                continue;
            }
            localStringSelectMenus.push(stringSelectMenuObject);
        }
    }
    return localStringSelectMenus;
};