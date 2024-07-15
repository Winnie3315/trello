export function reload(arr, component, places){
    places.forEach(place => place.innerHTML = "")

    for(let item of arr){
        const elem = component(item)

        places[item.status].append(elem)
    }
}

