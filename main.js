newTaskItem = document.querySelector('.nav__input--item');
addTaskBtn = document.querySelector('.nav__img--plus');
newTasksSection = document.querySelector('.nav__section--tasks');
navWhole = document.querySelector('.nav--whole');
newTaskTitle = document.querySelector('.nav__input--title');
makeListBtn = document.querySelector('.nav__btn--list');
mainDisplay = document.querySelector('.card__main')
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
}

function listenOnMain(e) {
  e.preventDefault();
  if (e.target.id === 'card__img--delete') {
    deleteList(e);
  }
  if (e.target.id === 'card__img--urgent') {
    changeUrgency(e);
  }
}

function handleMakeList(e) {
  e.preventDefault;
  var toDo = new ToDo ({id: Date.now(), title: newTaskTitle.value, tasks: newListOfTasks, urgent: false});
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
    insertTask(e, task);
    clearInputs(e);
  }
}

function instantiateTask (obj) {
  var taskTitle = obj.title;
  var taskItem = obj.tasks;
  var taskId = obj.id;
  var taskUrgency = obj.urgent;
  // toDo = new ToDo(obj)
  // toDo.saveToStorage(newListArray);
  // console.log(taskItem)
  // console.log(obj)
}

  // insertTask();


function insertTask(e, obj) {
  // console.log(obj)
  // newListArray.forEach(function(newTask){
  //   console.log(obj)
  var newTaskListItem = 
    `<article class="nav__div--tasks" data-id=${obj.id}>
      <img src="images/delete.svg" class="nav__img--delete">
      <p class="nav__p--tasks">${obj.name}</p
    </article>`;
  newTasksSection.insertAdjacentHTML('afterbegin', newTaskListItem);
  // })
  clearInputs(e);
}

function appendList(obj){
  console.log(obj.tasks)
  console.log(obj.tasks.name)
  newListOfTasks.forEach(function(obj){
  var taskDisplay =  
          `<div class="card__div">
            <input type=radio class="card__input--list">
            <p class="card__p--task">${obj.tasks}</p>
          </div>`
  var newList =           
  `<article class="card__article">
        <header class="card__header"> 
          <h2 class="card__h2--title">New Title</h2>
        </header>
        <section class="card__section">
          <div class="card__div">
            <input type=radio class="card__input--list">
            <p class="card__p--task">Task One</p>
          </div>
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
  })
}



function deleteTask(e) {
  var task = e.target.closest('.nav__div--tasks');
  var taskId = e.target.closest('.nav__div--tasks').getAttribute('data-id');
  task.remove();
}

function deleteList(e) {
  var list = e.target.closest('.card__article');
  var listId = e.target.closest('.card__article').getAttribute('data-id');
  list.remove();
}

function changeUrgency(e) {
  urgencyUpdate = e.target;
  activeUrgent = 'images/urgent-active.svg';
  inactiveUrgent = 'images/urgent.svg'
  if (e.target.src === activeUrgent){
    e.target.src = inactiveUrgent;
  } else {
    e.target.src = activeUrgent;
  }
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