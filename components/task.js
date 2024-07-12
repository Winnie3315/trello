export function createTaskCard(task) {
    const card = document.createElement("div");
    card.classList.add("card")
    card.innerHTML = task.tytle;
    card.draggable = true;
    card.dataset.id = task.id;

    card.ondragstart = function(event) {
        event.dataTransfer.setData("text/plain", task.id);
    };

    return card;
}



