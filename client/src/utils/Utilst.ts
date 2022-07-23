export const getCheckedItems = (checkedItems:boolean[], itemsNames:string[]):string[] => {
    const checkedItemsIndexes = checkedItems.map((item, index) => {
        if(item) return index
        return -1
    })
    let resultArr = checkedItemsIndexes.map(i => itemsNames[i])
    return resultArr.filter(element => element !== undefined)
}

export const checkForOne = (array: boolean[]):boolean => (new Set(array)).size === 1


