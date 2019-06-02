newTaskItem = document.querySelector('.nav__input--item');
addTaskBtn = document.querySelector('.nav__img--plus');
newTasksSection = document.querySelector('.nav__section--tasks');
navWhole = document.querySelector('.nav--whole');
newTaskTitle = document.querySelector('.nav__input--title');
makeListBtn = document.querySelector('.nav__btn--list');
mainDisplay = document.querySelector('.card__main');
clearBtn = document.querySelector('.nav__btn--clear');
newListOfTasks = [];
newListOfToDos = [];

newTaskItem.addEventListener('keyup', enableBtn);
newTaskTitle.addEventListener('keyup', enableBtn);
navWhole.addEventListener('click', listenOnNav);
mainDisplay.addEventListener('click', listenOnMain)

makeListBtn.disabled = true;


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
    // clearInputs(e);
    //maybe forEach.pop?
    console.log(newTasksSection);
    newTasksSection = 'b';
  }
}

function listenOnMain(e) {
  e.preventDefault();
  if (e.target.id === 'card__img--delete') {
    deleteList(e);
  }
  if (e.target.id === 'card__img--urgent') {
    changeUrgency(e);
  }

  if (e.target.id === 'card__img--checkbox') {
    checkboxToggle(e)
  }
}

function handleMakeList(e) {
  e.preventDefault;
  var toDo = new ToDo ({id: Date.now(), title: newTaskTitle.value, tasks: newListOfTasks, urgent: false});
  newListOfToDos.push(toDo);
  toDo.saveToStorage(newListOfToDos)
  appendList(toDo);
  clearInputs(e);
}

function enableBtn(e) {
  if (this.value !== '') {
    makeListBtn.disabled = false;
  } else {
    makeListBtn.disabled = true;
  }
}

function clearInputs(e) {
  if(e.target === addTaskBtn){
  newTaskItem.value = '';
  }

  //adding clear button a problem here for some reason
  if(e.target === makeListBtn){
  newTaskTitle.value = '';
  newTaskItem.value = '';
  }
}

function pushNewTask(e) {
  if (newTaskItem.value !== '' && newTaskTitle.value !== ''){
    var newTaskName = newTaskItem.value;
    var task = new Task ({id: Date.now(), name: newTaskName});
    newListOfTasks.push(task);
    task.saveToStorage(newListOfTasks);
    insertTask(e, task);
    clearInputs(e);
  }
}

function insertTask(e, obj) {
  var newTaskListItem = 
    `<article class="nav__div--tasks" data-id=${obj.id}>
      <img src="images/delete.svg" class="nav__img--delete">
      <p class="nav__p--tasks">${obj.name}</p
    </article>`;
  newTasksSection.insertAdjacentHTML('afterbegin', newTaskListItem);
  clearInputs(e);
}

function appendList(obj){
  var taskDisplay = '';
  obj.tasks.forEach(function(task){
    //cant be var task display
    taskDisplay = taskDisplay + 
            `<div class="card__div">
              <img src="images/checkbox.svg" class="card__img--checkbox" id="card__img--checkbox">
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
              <img src="images/urgent.svg" class="card__img card__img--urgent" id="card__img--urgent">
              <p class="card__p card__p--urgent">Urgent</p>
            </section>
            <section class="card__section--right">
              <img src="images/delete.svg" class="card__img card__img--delete" id="card__img--delete">
              <p class="card__p card__p--delete">Delete</p>
            </section>
          </footer>
        </article>`
      mainDisplay.insertAdjacentHTML('afterbegin', newList);
}



function deleteTask(e) {
  var task = e.target.closest('.nav__div--tasks');
  var taskId = e.target.closest('.nav__div--tasks').getAttribute('data-id');
  task.remove();
}

function deleteList(e) {
  var toDoCard = e.target.closest('.card__article');
  var toDoId = toDoCard.getAttribute('data-id');
  toDoCard.remove();
  findToDo(toDoId).deleteFromStorage(toDoId);
}

function findToDo(toDoId){
  var toDo = newListOfToDos.find(function(toDo){
    return toDo.id == toDoId;
  })
  return toDo
}

function checkboxToggle(e){
  updateCheckbox = e.target;
  unchecked = 'images/checkbox.svg';
  checked = 'images/checkbox-active.svg';
  if (e.target=== unchecked){
    console.log('this isnt done')
  }
}

function changeUrgency(e) {
  urgencyUpdate = e.target;
  activeUrgent = 'images/urgent-active.svg';
  inactiveUrgent = 'images/urgent.svg'
  if (e.target.src === activeUrgent){
    e.target.src = inactiveUrgent;
  }
  if (e.target.src === inactiveUrgent){
    e.target.src = activeUrgent;
  }
}

function reloadLists() {
  var newWorkingLists = JSON.parse(localStorage.getItem('to-do-lists')) || [];
  newWorkingLists.forEach(function(object) {
    rebuildToDo(object);
  })
}

function rebuildToDo(toDoObject) {
  var toDo = new ToDo (toDoObject);
  rebuildTasks(toDo);
  appendList(toDo)
  newListOfToDos.push(toDo);
}

function rebuildTasks(toDo) {
  for (i = 0; i < toDo.tasks.length; i++){
    toDo.tasks[i]= new Task(toDo.tasks[i])
  }
}

window.onload = function() {
  reloadLists();
}


// function instantiateIdea(obj) {
//   var ideaTitle = obj.title;
//   var ideaBody = obj.body; 
//   var ideaId = obj.id;
//   var ideaStar = obj.star
//   var ideaQuality = obj.quality;
//   //could be obj below
//   idea = new Idea({id: ideaId, title: ideaTitle, body: ideaBody, star: ideaStar, quality: ideaQuality});
//   ideaList.push(idea);
//   idea.saveToStorage(ideaList);
//   appendCard(idea);
// }
// function appendCard(object) {
//   var starState = object.star ? 'star-active.svg' : 'star.svg';
//   var ideaCard = `
//   <article class="card" data-id="${object.id}">
//         <header>
//           <img src="images/${starState}" class="card__img--card card__img--star" id="card__img--star"> 
//           <img src="images/delete.svg" class="delete">
//         </header>
//         <div class="card__main--card">
//           <h2 class="card__h2--title card__text" contenteditable>${object.title}</h2>
//           <p class="card__p--body card__text" contenteditable>${object.body}</p>
//         </div>
//         <footer>
//           <img src="images/upvote.svg" class="card__img--card" id="card__img--upvote">
//           <p class="card__footer--quality">Quality: <span class="card__span--quality">${qualityList[object.quality]}</span></p>
//           <img src="images/downvote.svg" class="card__img--card" id="card__img--downvote">
//         </footer>
//       </article>`
//       ;  
//   display.insertAdjacentHTML('afterbegin', ideaCard);
//   hideIdeaCue();
// }