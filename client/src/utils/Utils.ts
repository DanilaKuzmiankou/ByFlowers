export const phoneRegExp = /^[^\d\n]*(?:\d[^\d\n]*){11}$/
export const areArraysEquals = <T>(arr1: Array<T>, arr2: Array<T>): boolean => {
  return (
    arr1.length === arr2.length &&
    arr1.every(function (arr1_i, arr2_i) {
      return arr1_i === arr2[arr2_i]
    })
  )
}
