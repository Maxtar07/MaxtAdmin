const path = require(`path`);
const getAllFiles = require(`../utils/getAllFiles`);
module.exports = (exceptions = []) => {
    let localUserContextMenus = [];
    const userContextMenuCategories = getAllFiles(path.join(__dirname, `..`, `contextmenus`), true);
    for (const userContextMenuCategory of userContextMenuCategories) {
        const userContextMenuFiles = getAllFiles(userContextMenuCategory);
        for (const userContextMenuFile of userContextMenuFiles) {
            const userContextMenuObject = require(userContextMenuFile);
            if (exceptions.includes(userContextMenuObject.userContextMenuId)) {
                continue;
            }
            localUserContextMenus.push(userContextMenuObject);
        }
    }
    return localUserContextMenus;
};