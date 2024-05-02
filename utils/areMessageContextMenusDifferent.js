function compareOptions(localOptions, botOptions) {
  const differences = {};
  for (let i = 0; i < localOptions.length; i++) {
    const localOption = localOptions[i];
    const botOption = botOptions[i];
    const optionDifferences = {};
    if (localOption.name !== botOption.name) {
      optionDifferences.name = true;
    }
    if (localOption.description !== botOption.description) {
      optionDifferences.description = true;
    }
    if (localOption.type !== botOption.type) {
      optionDifferences.type = true;
    }
    if (localOption.autocomplete !== botOption.autocomplete) {
      optionDifferences.autocomplete = true;
    }
    if (localOption.required !== botOption.required) {
      optionDifferences.required = true;
    }
    const localChoices = localOption.choices || [];
    const botChoices = botOption.choices || [];
    if (localChoices.length !== botChoices.length) {
      optionDifferences.choices = true;
    } else {
      for (let j = 0; j < localChoices.length; j++) {
        const localChoice = localChoices[j];
        const botChoice = botChoices[j];

        if (localChoice.name !== botChoice.name || localChoice.value !== botChoice.value) {
          optionDifferences.choices = true;
          break;
        }
      }
    }
    const localSubOptions = localOption.options || [];
    const botSubOptions = botOption.options || [];
    if (localSubOptions.length !== botSubOptions.length) {
      optionDifferences.options = true;
    } else {
      const subDifferences = compareOptions(localSubOptions, botSubOptions);
      if (Object.keys(subDifferences).length > 0) {
        optionDifferences.options = subDifferences;
      }
    }
    if (Object.keys(optionDifferences).length > 0) {
      differences[i] = optionDifferences;
    }
  }
  return differences;
}
module.exports = (localMessageContextMenu, botMessageContextMenu) => {
  const differences = {};

  if (localMessageContextMenu.name !== botMessageContextMenu.name) {
    differences.name = true;
  }
  //if (localMessageContextMenu.description !== botMessageContextMenu.description) {
  //  differences.description = true;
  //}
  const localOptions = localMessageContextMenu.options || [];
  const botOptions = botMessageContextMenu.options || [];
  if (localOptions.length !== botOptions.length) {
    differences.options = true;
  } else {
    const optionsDifferences = compareOptions(localOptions, botOptions);
    if (Object.keys(optionsDifferences).length > 0) {
      differences.options = optionsDifferences;
    }
  }
  return differences;
};
