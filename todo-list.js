class ToDo {
  constructor (obj) {
    this.id = obj.id;
    this.title = obj.title;
    this.tasks = obj.tasks;
    this.urgent = obj.urgent;
  }

  saveToStorage(globalArray) {
    localStorage.setItem('to-do-lists', JSON.stringify(globalArray));
  }

  deleteFromStorage(taskId) {
    console.log('hey')
    var deleteToDoArray = newListOfToDos.filter(function(item) {
      return item.id !== parseInt(taskId);
    });
    newListOfToDos = deleteToDoArray;
    this.saveToStorage(newListOfToDos);
  }

  updateToDo() {

  }

  updateTask() {

  }

}

class Task {
  constructor (obj) {
    this.id = obj.id;
    this.name = obj.name;
  }

  saveToStorage(globalArray){
  localStorage.setItem('tasks', JSON.stringify(globalArray));
  }
}






//color of the inside of the delete button