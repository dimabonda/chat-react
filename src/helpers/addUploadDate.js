export const addUploadDate = (arr) => {
    const changedArray = arr.map((item, index) => {
        item.uploadDate = + new Date + index
        return item
    })
    return changedArray

}