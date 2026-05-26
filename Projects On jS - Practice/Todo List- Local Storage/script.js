document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addTaskButton = document.getElementById('add-task-btn');
    const todoList = document.getElementById('todo-list');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => { renderTasks(task)});
    addTaskButton.addEventListener(("click") ,() => {
        const taskText = todoInput.value.trim();
        if ( !taskText )  return;
        const newTask = {
            id: Date.now(),
            task: taskText,
            isCompleted : false,
        }
        tasks.push(newTask);
        saveTasks();
        todoInput.value = "";
        console.log(tasks)
    })

    // Read Tasks from local Storage
    function renderTasks(task){
       const li = document.createElement('li');
       li.setAttribute('data-id',task.id);
       if (task.completed) li.classList.add()
       li.innerHTML = `
       <span> ${task.text} </span>
       <button> delete </button>
       `;
       li.addEventListener('click', (event) => {
            if(event.target.tagName  === 'BUTTON') return;
            task.completed = !task.completed;
            li.classList.toggle('completed')
            saveTasks();
       })
       li.querySelector("button").addEventListener('click' , (event) => {
            event.stopPropagation() //Prevent Toggle From Firing
            tasks = tasks.filter( t => t.id !== task.id);
            li.remove();
            saveTasks();
       })
       todoList.appendChild(li);
    }


    // Saving all the tasks on Local Storage
    function saveTasks(){
        localStorage.setItem('tasks',JSON.stringify(tasks));
    }
})