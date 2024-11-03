// document.addEventListener("DOMContentLoaded", () => {
//   const todoInput = document.getElementById("todo-input");
//   const addTaskButton = document.getElementById("add-task-btn");
//   const todoList = document.getElementById("todo-list");

//   let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

//   tasks.forEach((task) => renderTask(task));

//   addTaskButton.addEventListener("click", () => {
//     const taskText = todoInput.value.trim();
//     if (taskText === "") return;

//     const newTask = {
//       id: Date.now(),
//       text: taskText,
//       completed: false,
//     };
//     tasks.push(newTask);
//     saveTasks();
//     renderTask(newTask);
//     todoInput.value = ""; //clear input
//     console.log(tasks);
//   });

//   function renderTask(task) {
//     const li = document.createElement("li");
//     li.setAttribute("data-id", task.id);
//     if (task.completed) li.classList.add("completed");
//     li.innerHTML = `
//     <span>${task.text}</span>
//     <button>delete</button>
//     `;
//     li.addEventListener("click", (e) => {
//       if (e.target.tagName === "BUTTON") return;
//       task.completed = !task.completed;
//       li.classList.toggle("completed");
//       saveTasks();
//     });

//     li.querySelector("button").addEventListener("click", (e) => {
//       e.stopPropagation(); //prevent toggle from firing
//       tasks = tasks.filter((t) => t.id === task.id);
//       li.remove();
//       saveTasks();
//     });

//     todoList.appendChild(li);
//   }

//   function saveTasks() {
//     localStorage.setItem("tasks", JSON.stringify(tasks));
//   }
// });

document.addEventListener("DOMContentLoaded", () => {
  // get the element from HTML which are in use.
  const todoInput = document.getElementById("todo-input");
  const addTaskButton = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");

  // initializing empty task list for all the todos.
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach(task => renderTask(task));

  // setting up the event listener on click of the add task button.
  addTaskButton.addEventListener("click", () => {
    const taskText = todoInput.value.trim() // getting the value of todo from input field.

    if(taskText === "") return; // do nothing if the input field is empty.

    // If not empty then create a new object for that task to store in the local storage.
    const newTask = {
      id: Date.now(),
      text: taskText,
      isCompleted: false,
    };

    // push the task into the task array, clear the input field.
    tasks.push(newTask);
    saveTaskstoLocalStorage();
    renderTask(newTask);
    todoInput.value = "";
    console.log(tasks);
      
  })

  function renderTask(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    if (task.isCompleted) li.classList.add("isCompleted");
    li.innerHTML = `
    <span>${task.text}</span>
    <button>delete</button>
    `;
    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      task.isCompleted = !task.isCompleted;
      li.classList.toggle("isCompleted");
      saveTaskstoLocalStorage();
      
    });

    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation(); //prevent toggle from firing
      tasks = tasks.filter((t) => t.id === task.id);
      li.remove();
      saveTaskstoLocalStorage();
      
    });

    todoList.appendChild(li);
      
  }

  // Function the store the task to local storage of the browser.
  function saveTaskstoLocalStorage(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
})

