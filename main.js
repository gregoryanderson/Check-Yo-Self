newTaskItem = document.querySelector('.nav__input--item');
addTaskBtn = document.querySelector('.nav__img--plus');
newTasksSection = document.querySelector('.nav__section--tasks');
navWhole = document.querySelector('.nav--whole');
newTaskTitle = document.querySelector('.nav__input--title');
makeListBtn = document.querySelector('.nav__btn--list');
// deleteNewTask = document.querySelector('nav__img--delete')
mainDisplay = document.querySelector('.card__main')
newListArray = [];

newTaskItem.addEventListener('keyup', enableBtn);
newTaskTitle.addEventListener('keyup', enableBtn);
navWhole.addEventListener('click', listenOnNav);
mainDisplay.addEventListener('click', listenOnMain)

makeListBtn.disabled = true;


function listenOnNav(e) {
  e.preventDefault();
  if (e.target === addTaskBtn){
    showNewTask();
  }
  if (e.target === makeListBtn){
    handleMakeList(e);
  }
  if (e.target.className === 'nav__img--delete'){
    deleteTask(e);
  }
}

function listenOnMain(e) {
  e.preventDefault();
  if (e.target.id === 'card__img--delete') {
  console.log('hey')
    deleteList(e);
  }
  if (e.target.id === 'card__img--urgent') {
    changeUrgency(e);
  }
}

function enableBtn(event) {
  if (this.value !== '') {
    makeListBtn.disabled = false;
  } else {
    makeListBtn.disabled = true;
  }
}

function clearInputs() {
  newTaskItem.value = '';
  newTaskTitle.value = '';
}

function showNewTask() {
  if (newTaskItem.value !== '' && newTaskTitle.value !== ''){
  var newTask = newTaskItem.value;
  var newTaskList = 
    `<article class="nav__div--tasks" data-id=Date.now()>
      <img src="images/delete.svg" class="nav__img--delete">
      <p class="nav__p--tasks">${newTask}</p
    </article>`;
  newTasksSection.insertAdjacentHTML('afterbegin', newTaskList);
  newListArray.push(newTask);
  console.log(newListArray)
  // instantiateTask({id: Date.now(), title: newTaskTitle.value, tasks: newListArray, urgent: false});
  clearInputs();
  }
}

function appendCard(){
  // newListArray.map(function(task){
  // appendCard(task)
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
          <div class="card__div">
            <input type=radio class="card__input--list">
            <p class="card__p--task">Task Two</p>
          </div>
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
  // })
}


function instantiateTask (obj) {
  console.log(obj)
  var taskTitle = newTaskTitle.value;
  var taskItem = newTaskItem.value;
  var taskId = Date.now();
  var taskUrgency = false;
  toDo = new ToDo(obj)
  toDo.saveToStorage(newListArray);
  console.log(localStorage)
  console.log(newListArray)
}

function deleteTask(e) {
  console.log('hi')
  var task = e.target.closest('.nav__div--tasks');
  var taskId = e.target.closest('.nav__div--tasks').getAttribute('data-id');
  task.remove();
}

function deleteList(e) {
  var list = e.target.closest('.card__article');
  var listId = e.target.closest('.card__article').getAttribute('data-id');
  list.remove();
}

function handleMakeList(e) {
  e.preventDefault;
  appendCard();
  // instantiateTask({id: Date.now(), title: newTaskTitle.value, tasks: newListArray, urgent: false});
  clearInputs();
}


function instantiateIdea(obj) {
  var ideaTitle = obj.title;
  var ideaBody = obj.body; 
  var ideaId = obj.id;
  var ideaStar = obj.star
  var ideaQuality = obj.quality;
  //could be obj below
  idea = new Idea({id: ideaId, title: ideaTitle, body: ideaBody, star: ideaStar, quality: ideaQuality});
  ideaList.push(idea);
  idea.saveToStorage(ideaList);
  appendCard(idea);
}
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