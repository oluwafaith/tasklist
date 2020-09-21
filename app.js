//ui variables
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//load event listeners
loadEvenListeners();
function loadEvenListeners() {
  //dom load event
  document.addEventListener("DOMContentLoaded", getTasks);
  //add task form
  form.addEventListener("submit", addTask);
  //remove task event
  taskList.addEventListener("click", removeTask);
  //clear task events
  clearBtn.addEventListener("click", clearTasks);
  //filter task event
  filter.addEventListener("keyup", filterTasks);
}

//get tasks from ls
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task) {
    //create li
    const li = document.createElement("li");
    //add class
    li.className = "collection-item";

    //create text node and append to li
    li.appendChild(document.createTextNode(task));

    //create new link element
    const link = document.createElement("a");

    //add class
    link.className = "delete-item secondary-content";

    //add icon html
    link.innerHTML = '<i class="fa fa-remove" ></i>';

    //append link to li
    li.appendChild(link);

    //append li to ul
    taskList.appendChild(li);
  });
}

//add task
function addTask(e) {
  if (taskInput.value === "") {
    alert(" add a task");
  }
  //create li
  const li = document.createElement("li");
  //add class
  li.className = "collection-item";

  //create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));

  //create new link element
  const link = document.createElement("a");

  //add class
  link.className = "delete-item secondary-content";

  //add icon html
  link.innerHTML = '<i class="fa fa-remove" ></i>';

  //append link to li
  li.appendChild(link);

  //append li to ul
  taskList.appendChild(li);

  //store in local storage
  storeTaskInLocalStorage(taskInput.value);

  //clear input
  taskInput.value = "";
  e.preventDefault();
}

//store task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure")) {
      e.target.parentElement.parentElement.remove();

      //remove task from local storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

//remove from ls
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearTasks() {
  // taskList.innerHTML = ''
  //faster method to remove
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  clearTaskFromLocalStorage();
}
//clear task from ls
function clearTaskFromLocalStorage() {
  localStorage.clear();
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLocaleLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
