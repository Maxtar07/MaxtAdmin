const path = require(`path`);
const getAllFiles = require(`../utils/getAllFiles`);
module.exports = (exceptions = []) => {
    let localRoleSelectMenus = [];
    const roleSelectMenuCategories = getAllFiles(path.join(__dirname, `..`, `selectmenus`), true);
    for (const roleSelectMenuCategory of roleSelectMenuCategories) {
        const roleSelectMenuFiles = getAllFiles(roleSelectMenuCategory);
        for (const roleSelectMenuFile of roleSelectMenuFiles) {
            const roleSelectMenuObject = require(roleSelectMenuFile);
            if (exceptions.includes(roleSelectMenuObject.roleSelectMenuId)) {
                continue;
            }
            localRoleSelectMenus.push(roleSelectMenuObject);
        }
    }
    return localRoleSelectMenus;
};