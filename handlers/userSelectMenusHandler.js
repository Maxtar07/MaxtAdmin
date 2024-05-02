const path = require(`path`);
const getAllFiles = require(`../utils/getAllFiles`);
module.exports = (exceptions = []) => {
    let localUserSelectMenus = [];
    const userSelectMenuCategories = getAllFiles(path.join(__dirname, `..`, `selectmenus`), true);
    for (const userSelectMenuCategory of userSelectMenuCategories) {
        const userSelectMenuFiles = getAllFiles(userSelectMenuCategory);
        for (const userSelectMenuFile of userSelectMenuFiles) {
            const userSelectMenuObject = require(userSelectMenuFile);
            if (exceptions.includes(userSelectMenuObject.userSelectMenuId)) {
                continue;
            }
            localUserSelectMenus.push(userSelectMenuObject);
        }
    }
    return localUserSelectMenus;
};