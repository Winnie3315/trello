import { createTaskCard } from "./components/task";
import { getData, postData, patchData } from "./lib/http";
import { reload } from "./lib/ui";

const modalTask = document.querySelector("#modal-task");
const closeBtn = document.querySelector(".close-btn");
const addTaskBtn = document.querySelector(".add-card-btn");
const formTask = document.forms.namedItem("form-task");
const lists = document.querySelectorAll(".list");


const columns = {
    'Todos': document.querySelector(".list-header.todo").parentElement,
    'In progress': document.querySelector(".list-header.in-progress").parentElement,
    'Completed': document.querySelector(".list-header.done").parentElement
};

addTaskBtn.onclick = () => {
    modalTask.style.display = "block";
};

closeBtn.onclick = () => {
    modalTask.style.display = "none";
};

formTask.onsubmit = (e) => {
    e.preventDefault();
    const taskTitle = document.querySelector("#task").value;
    const taskDescription = document.querySelector("#description").value;
    const status = formTask.elements['status'].value

    
    const task = {
        id: crypto.randomUUID(),
        title: taskTitle,
        description: taskDescription,
        created_at: new Date().toLocaleDateString(),
        status: status
    };
   
    postData("/todos", task)
        .then(res => {
            if (res.status === 200 || res.status === 201) {
                alert('Success');
                reload(res.data.filter(t => t.status === task.status), createTaskCard, columns[task.status])
            }
        });
};

function populateColumns(tasks) {
    tasks.forEach(task => {
        const column = columns[task.status];
        if (column) {
            const taskCard = createTaskCard(task);
            column.append(taskCard);
        }
    });
}

getData("/todos")
    .then(res => {
        if (res.status === 200 || res.status === 201) {
            populateColumns(res.data)
        }
    })