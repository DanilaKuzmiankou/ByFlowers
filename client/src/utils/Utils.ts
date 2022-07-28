export const getCheckedItems = (checkedItems:boolean[], itemsNames:string[], lastProducts: string[]):(string)[] => {
    const allChecked:string[] = []
    const products = checkedItems.map((item, index) => {
        if(item) {
            allChecked.push(itemsNames[index])
            if(!lastProducts.includes(itemsNames[index])) return itemsNames[index]
        }
        return 'undefined'
    })
    return [...lastProducts.filter(product => product!=='' && allChecked.includes(product)), ...products.filter(element => element !== 'undefined')]
}

export const checkForOne = (array: boolean[]):boolean => (new Set(array)).size === 1


