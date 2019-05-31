newTaskItem = document.querySelector('.nav__input--item');
addTaskBtn = document.querySelector('.nav__img--plus');
newTasksSection = document.querySelector('.nav__section--tasks');
navWhole = document.querySelector('.nav--whole');
newTaskTitle = document.querySelector('.nav__input--title');
makeListBtn = document.querySelector('.nav__btn--list');
newListArray = [];

newTaskItem.addEventListener('keyup', enableBtn);
newTaskTitle.addEventListener('keyup', enableBtn);
navWhole.addEventListener('click', listenOnNav);

makeListBtn.disabled = true;


function listenOnNav(e) {
  e.preventDefault();
  if (e.target === addTaskBtn){
    showNewTask();
  }
  if (e.target === makeListBtn) {
    appendList();
  }
}

function enableBtn(event) {
  if (this.value !== '') {
    makeListBtn.disabled = false;
  } else {
    makeListBtn.disabled = true;
  }
}

function showNewTask() {
  if (newTaskItem.value !== '' && newTaskTitle.value !== ''){
  var newTask = newTaskItem.value;
  var newTaskList = 
    `<div data-id=Date.now() class="nav__div--tasks">
      <input type="radio" class="nav__input--tasks">
      <p class="nav__p--tasks">${newTask}</p
    </div>`;
  newTasksSection.insertAdjacentHTML('afterbegin', newTaskList);
  instantiateTask();
  }
}

function instantiateTask () {
  var taskTitle = newTaskTitle.value;
  var taskToDo = newListArray; 
  var taskId = Date.now();
  var taskUrgency = false;
  var newTaskObject = ({id: Date.now(), title: newTaskTitle.value, tasks: newListArray, urgent: false});
  console.log(newTaskObject);
}


// function appendList() {
//   instantiateList();
// }

// function handleSaveBtn(e) {
//   e.preventDefault();
//   instantiateIdea({id: Date.now(), title: titleInput.value, body: bodyInput.value, star: false, quality: 0});
//   clearInputs();
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