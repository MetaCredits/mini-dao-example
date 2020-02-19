export const upsertStringToLocalStorageArray = (name, value) => {
    //first see if its empty
    if (!localStorage.getItem(name)) {
        console.log("local storage empty")
        //its empty
        let array = JSON.stringify([value])
        localStorage.setItem(name, array)
    } else {
        let array = JSON.parse(localStorage.getItem(name))
        if (array.includes(value)){
            return
        }
        array.push(value)
        localStorage.setItem(name, JSON.stringify(array)) 
    }
}

export const getLocalStorageArray = (name) => {
    if (!localStorage.getItem(name)){
        return []
    }
    return JSON.parse(localStorage.getItem(name))
}
