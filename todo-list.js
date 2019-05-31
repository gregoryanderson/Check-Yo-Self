class ToDo {
  constructor (obj){
    this.id = obj.id;
    this.title = obj.title;
    this.tasks = obj.tasks;
    this.urgent = obj.urgent;
  }

  saveToStorage(globalArray) {
    localStorage.setItem('tasks', JSON.stringify(globalArray));
  }

  deleteFromStorage() {

  }

  updateToDo() {

  }

  updateTask() {

  }

}






//color of the inside of the delete button