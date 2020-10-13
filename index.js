module.exports = {
    assignTaskWithAssociatedDependency(task, dependencies) {
        const taskAssociatedDependencies = {}
        task.forEach(element => {
            taskAssociatedDependencies[element] = [];
        });
        dependencies.forEach(element => {
            const dependencies = element.split(' => ');
            if (dependencies[0] in taskAssociatedDependencies) {
                taskAssociatedDependencies[dependencies[0]].push(dependencies[1]);
            }
        });
        const result = findOrderOfTasks(taskAssociatedDependencies)
        return result;
    }
}

// Find dependency or throw error if any circular dependency 
const findOrderOfTasks = (dependencies) => {
    // currentKeyLength is used to store the current keyArray length.
    let iterator, sortedItem, currentKeyLength;
    // To store all depedency keys
    let keyArray = Object.keys(dependencies);
    // To store the used dependency key
    let visited = new Set;
    // To store the sorted dependencies
    let sortedArray = [];
    do {
        // To store current key length
        currentKeyLength = keyArray.length;
        iterator = 0;
        while (iterator < keyArray.length) {
            if (dependencies[keyArray[iterator]].every(Set.prototype.has, visited)) {
                // Remove key from keyArray length which dependcies are resolved
                sortedItem = keyArray.splice(iterator, 1)[0];
                sortedArray.push(sortedItem);
                visited.add(sortedItem);
                continue;
            }
            iterator++;
        }
    } while (keyArray.length && keyArray.length !== currentKeyLength)
    if (keyArray.length) { throw new Error('This is a cyclic dependency.') };
    console.log('Actual Result:' + ' ', sortedArray, '\n');
    return sortedArray;
};


