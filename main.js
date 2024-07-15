import { Task } from "./components/task";
import { getData, postData, patchData, deleteData } from "./lib/http";
import { reload } from "./lib/ui";

const modalTask = document.querySelector("#modal-task")
const closeBtn = document.querySelector(".close-btn")
const addTaskBtn = document.querySelector(".add-card-btn")
const formTask = document.forms.namedItem("form-task")
const containers = document.querySelectorAll("[data-status]")
const trashCan = document.querySelector("#trash-can");
const trashCanLid = document.querySelector(".trash-top");
const musorka = document.querySelector(".musorka");

addTaskBtn.onclick = () => {
    modalTask.style.display = "block";
};

closeBtn.onclick = () => {
    modalTask.style.display = "none";
};

getData("/todos")
    .then(res => reload(res.data, Task, containers))

formTask.onsubmit = async (e) => {
    e.preventDefault();

    const task = {
        id: crypto.randomUUID(),
        created_at: new Date().toLocaleDateString(),
        
    };
    console.log(task);
    const fm = new FormData(e.target)

    fm.forEach((val, key) => task[key] = val)

    const {title, description} = task

    if (title && description) {
        const res = await postData("/todos", task)

        if(res.status === 200 || res.status === 201){
            const todo = await getData('/todos')
            if (todo.status === 200 || todo.status === 201) {
                reload(todo.data, Task, containers)
                console.log(res.data);
            }
        }
    }
};

for (let container of containers) {
    let parent = container.parentElement
    container.ondragover = (e) => {
        e.preventDefault()
    }
    container.ondragenter = (e) => {
        e.preventDefault()
        parent.classList.add("hovered")
    }
    container.ondragleave = () => {
        parent.classList.remove("hovered")
    }
    container.ondrop = async () => {
        const droppingElem = document.querySelector(".hide")
        const id = droppingElem.getAttribute("data-id")
        const status = container.getAttribute("data-status")
        
        parent.classList.remove("hovered")
        try{
            const res = await patchData(`/todos/${id}`, {status: status})
            container.append(droppingElem)
        }
        catch(e){
            alert(e.message)
        }
    }
}

document.ondragstart = () => {
    trashCan.classList.add("visible");
}

document.ondragend = () => {
    trashCan.classList.remove("visible");
}

trashCan.ondragover = (e) => {
    e.preventDefault();
    trashCan.querySelector(".trash-top").style.transform = "translate(-50%, -15%) rotate(-20deg)";
};

trashCan.ondragleave = (e) => {
    trashCan.querySelector(".trash-top").style.transform = "translate(-50%, -15%)";
};


trashCan.ondrop = async (e) => {
    e.preventDefault();
    const droppingElem = document.querySelector(".hide");
    const id = droppingElem.getAttribute("data-id");

    try {
        const res = await deleteData(`/todos/${id}`);
        if (res.status === 200 || res.status === 201) {
            droppingElem.remove();
        }
    } catch (error) {
        alert(error.message);
    }

    trashCan.classList.remove("visible");
    trashCan.querySelector(".trash-top").style.transform = "translate(-50%, -15%)";
    musorka.play()
};