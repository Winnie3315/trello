export function Task(task) {
    const card = document.createElement("div");

    card.classList.add("card")
    card.innerHTML = task.title;
    card.draggable = true;
    card.dataset.id = task.id;

    card.ondragstart = (event) => {
        card.dataset.selected = true
        setTimeout(() => {
            card.classList.add("hide")
        }, 0)
    };
    card.ondragend = () => {
        delete card.dataset.selected
        card.classList.remove("hide")
    }

    return card;
}



