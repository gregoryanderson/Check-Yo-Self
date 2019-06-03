newTaskItem = document.querySelector('.nav__input--item');
addTaskBtn = document.querySelector('.nav__img--plus');
newTasksSection = document.querySelector('.nav__section--tasks');
navWhole = document.querySelector('.nav--whole');
newTaskTitle = document.querySelector('.nav__input--title');
makeListBtn = document.querySelector('.nav__btn--list');
mainDisplay = document.querySelector('.card__main');
clearBtn = document.querySelector('.nav__btn--clear');
noTask = document.querySelector('.card__div--statement');
searchBar = document.querySelector('.header__input--search');
urgencyFilterBtn = document.querySelector('.nav__btn--urgency');
newListOfTasks = [];
newListOfToDos = [];

newTaskItem.addEventListener('keyup', enableBtn);
newTaskTitle.addEventListener('keyup', enableBtn);
navWhole.addEventListener('click', listenOnNav);
mainDisplay.addEventListener('click', listenOnMain);
searchBar.addEventListener('keyup', searchThru);

makeListBtn.disabled = true;
clearBtn.disabled = true;


function listenOnNav(e) {
  e.preventDefault();
  if (e.target === addTaskBtn) {
    pushNewTask(e);
  }
  if (e.target === makeListBtn) {
    handleMakeList(e);
  }
  if (e.target.className === 'nav__img--delete') {
    deleteTask(e);
  }
  if (e.target === clearBtn){
    clearInputs(e);
    resetTaskArray();
  }
  if (e.target === urgencyFilterBtn){
    filterByUrgency();
  }
}

function listenOnMain(e) {
  e.preventDefault();
  if (e.target.id === 'card__img--delete') {
    deleteList(e);
  }
  if (e.target.id === 'card__img--urgent') {
    triggerUrgency(e);
  }

  if (e.target.id === 'card__img--checkbox') {
    triggerCheckbox(e)
  }
}

function handleMakeList(e) {
  e.preventDefault;
  var toDo = new ToDoList ({id: Date.now(), title: newTaskTitle.value, tasks: newListOfTasks, urgent: false});
  newListOfToDos.push(toDo);
  toDo.saveToStorage(newListOfToDos)
  appendList(toDo);
  clearInputs(e);
}

function enableBtn(e) {
  if (this.value !== '') {
    makeListBtn.disabled = false;
    clearBtn.disabled = false;
  } else {
    makeListBtn.disabled = true;
    clearBtn.disabled = true;
  }
}

function clearInputs(e) {
  if(e.target === addTaskBtn){
  newTaskItem.value = '';
  } else {
  newTaskTitle.value = '';
  newTaskItem.value = '';
  newTasksSection.innerHTML = '';
  newListOfTasks = [];
  }
}

function pushNewTask(e) {
  if (newTaskItem.value !== '' && newTaskTitle.value !== ''){
    var newTaskName = newTaskItem.value;
    var task = new Task ({id: Date.now(), name: newTaskName, checked: false});
    newListOfTasks.push(task);
    task.saveToStorage(newListOfTasks);
    insertTask(e, task);
    clearInputs(e);
  }
}

function insertTask(e, obj) {
  var newTaskListItem = 
    `<article class="nav__article--tasks" data-id=${obj.id}>
      <img src="images/delete.svg" class="nav__img--delete">
      <p class="nav__p--tasks">${obj.name}</p
    </article>`;
  newTasksSection.insertAdjacentHTML('afterbegin', newTaskListItem);
  clearInputs(e);
}

function appendList(obj){
  var urgentState = obj.urgent ? 'urgent-active.svg' : 'urgent.svg';
  // seeIfChecked(obj)
  var checkedState = obj.checked ? 'checkbox-active.svg' : 'checkbox.svg';
  var taskDisplay = '';
  obj.tasks.forEach(function(task){
    taskDisplay = taskDisplay + 
            `<div class="card__div" data-id=${task.id}>
              <img src="images/${checkedState}" class="card__img--checkbox" id="card__img--checkbox">
              <p class="card__p--task">${task.name}</p>
            </div>`
    })
    var newList =           
    `<article class="card__article" data-id=${obj.id}>
          <header class="card__header"> 
            <h2 class="card__h2--title">${obj.title}</h2>
          </header>
          <section class="card__section">
            ${taskDisplay}
          </section>
          <footer class="card__footer">
            <section class="card__section--left">
              <img src="images/${urgentState}" class="card__img card__img--urgent" id="card__img--urgent">
              <p class="card__p card__p--urgent">Urgent</p>
            </section>
            <section class="card__section--right">
              <img src="images/delete.svg" class="card__img card__img--delete" id="card__img--delete">
              <p class="card__p card__p--delete">Delete</p>
            </section>
          </footer>
        </article>`
      mainDisplay.insertAdjacentHTML('afterbegin', newList);
      hideIdeaCue();
}

// function seeIfChecked(obj){
//   for (i = 0; i > obj.tasks.)
// }







function deleteTask(e) {
  var task = e.target.closest('.nav__article--tasks');
  var taskId = e.target.closest('.nav__article--tasks').getAttribute('data-id');
  task.remove();
  taskIndex = findNavTaskIndex(taskId)
  newListOfTasks.splice(taskIndex, 1)
}

function deleteList(e) {
  var toDoCard = e.target.closest('.card__article');
  var toDoId = toDoCard.getAttribute('data-id');
  enableDltBtn(e, toDoId);
}

function enableDltBtn(e, toDoId) {

  toDoCard.remove();
  findToDo(toDoId).deleteFromStorage(toDoId);
  hideIdeaCue();
}

function findToDo(toDoId) {
  var foundToDo = newListOfToDos.find(function(toDo) {
    return toDo.id == toDoId;
  })
  return foundToDo;
}

function checkboxToggle (e, toDoIndex, taskIndex) {
  checkboxTarget = e.target;
  unchecked = 'images/checkbox.svg';
  checked = 'images/checkbox-active.svg';
  if (newListOfToDos[toDoIndex].tasks[taskIndex].checked === false) {
    checkboxTarget.src = unchecked;
  } else {
    checkboxTarget.src = checked;
  };
  addStyle(e, toDoIndex, taskIndex)
}

function addStyle(e, toDoIndex, taskIndex) {
  var taskName = newListOfToDos[toDoIndex].tasks[taskIndex].name;
  var taskNameClass = e.target.nextElementSibling;
  if (newListOfToDos[toDoIndex].tasks[taskIndex].checked === true) {
    taskNameClass.style.color = '#3C6577';
    taskNameClass.style.fontStyle = 'italic';
  } else {
    taskNameClass.style.color = '#1F1F3D';
    taskNameClass.style.fontStyle = 'normal';
  }
}

function triggerCheckbox(e) {
  var toDoIndex = findToDoIndex(e);
  var taskIndex = findTaskIndex(e, toDoIndex);
  newListOfToDos[toDoIndex].tasks[taskIndex].checked = !newListOfToDos[toDoIndex].tasks[taskIndex].checked;
  var checkboxStatus = newListOfToDos[toDoIndex].tasks[taskIndex].checked;
  newListOfToDos[toDoIndex].updateTask(taskIndex, checkboxStatus);
  checkboxToggle(e, toDoIndex, taskIndex);
}

function urgencyToggle(e, toDoIndex) {
  urgencyTarget = e.target;
  activeUrgent = 'images/urgent-active.svg';
  inactiveUrgent = 'images/urgent.svg';
  if (newListOfToDos[toDoIndex].urgent === false) {
    urgencyTarget.src = inactiveUrgent;
  } else {
    urgencyTarget.src = activeUrgent;
  };
}

function triggerUrgency(e) {
  var toDoIndex = findToDoIndex(e)
  newListOfToDos[toDoIndex].urgent = !newListOfToDos[toDoIndex].urgent;
  newListOfToDos[toDoIndex].updateToDo(newListOfToDos[toDoIndex].urgent)
  urgencyToggle(e, toDoIndex)
}

function findToDoIndex(e){
  var listId = e.target.closest('.card__article').getAttribute('data-id');
  return newListOfToDos.findIndex(function(item){
    return item.id === parseInt(listId)
  })
}

function findTaskIndex(e, toDoIndex){
  var taskId = e.target.closest('.card__div').getAttribute('data-id');
  return newListOfToDos[toDoIndex].tasks.findIndex(function(item){
    return item.id === parseInt(taskId)
  })
}

function findNavTaskIndex(taskId) {
  return newListOfTasks.findIndex(function(item){
    return item.id === parseInt(taskId)
  })
}

function reloadLists() {
  var newWorkingLists = JSON.parse(localStorage.getItem('to-do-lists')) || [];
  newWorkingLists.forEach(function(object) {
    rebuildToDo(object);
  })
  hideIdeaCue();
}

function rebuildToDo(toDoObject) {
  var toDo = new ToDoList (toDoObject);
  rebuildTasks(toDo);
  appendList(toDo)
  newListOfToDos.push(toDo);
}

function rebuildTasks(toDo) {
  for (i = 0; i < toDo.tasks.length; i++){
    toDo.tasks[i]= new Task(toDo.tasks[i])
  }
}

function hideIdeaCue() {
  if (newListOfToDos.length > 0) {
    noTask.classList.add("hidden");
  }
  if (newListOfToDos.length < 1) {
    noTask.classList.remove("hidden")
  }
}

function searchThru(e) {
  var searchInput = e.target.value.toLowerCase();
  var results = newListOfToDos.filter(function(toDo){
    return toDo.title.toLowerCase().includes(searchInput)
     // || toDo.tasks.toLowerCase().includes(searchInput);  
  });
  mainDisplay.innerHTML = '';
  results.map(function(toDo){
    appendList(toDo)
  });
}

function filterByUrgency(){
  var results = newListOfToDos.filter(function(toDo){
    return toDo.urgent === true;
  })
  mainDisplay.innerHTML = '';
  results.map(function(toDo){
    appendList(toDo)
  })
}

window.onload = function() {
  reloadLists();
}
