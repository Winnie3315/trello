export function reload(arr, component, place){
    place.innerHTML = ""

    for(let item of arr){
        const elem = component(item)

        place.append(elem)
    }
}

