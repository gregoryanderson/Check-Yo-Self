class ToDoList {
  constructor (obj) {
    this.id = obj.id;
    this.title = obj.title;
    this.tasks = obj.tasks;
    this.urgent = obj.urgent;
  }

  saveToStorage(globalArray) {
    localStorage.setItem('to-do-lists', JSON.stringify(globalArray));
  }

  deleteFromStorage(toDoId) {
    var deleteToDoArray = newListOfToDos.filter(function(item) {
      return item.id !== parseInt(toDoId);
    });
    newListOfToDos = deleteToDoArray;
    this.saveToStorage(newListOfToDos);
  }

  updateToDo(urgent) {
    this.urgent = urgent;
    this.saveToStorage(newListOfToDos);
  }

  updateTask(taskIndex, checked) {
    this.tasks[taskIndex].checked = checked;
    this.saveToStorage(newListOfToDos)
  }

}

class Task {
  constructor (obj) {
    this.id = obj.id;
    this.name = obj.name;
    this.checked = obj.checked || false;
  }

  saveToStorage(globalArray){
  localStorage.setItem('tasks', JSON.stringify(globalArray));
  }
}

//search tasks
//disabled button colors
//CSS on completed tasks
//css on urgency
//remove task from global array
//The “Delete” button should only be enabled if all of the tasks on the checklist have been checked off.
//Upon clicking the “Delete” button, the appropriate todo list should be removed from the DOM.
//color of the inside of the delete button