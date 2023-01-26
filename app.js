// selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
// event listener 
document.addEventListener('DOMContentLoaded',gettodo);

todoButton.addEventListener("click" , addTodo);
todoList.addEventListener("click" ,deleteCheck);
filterOption.addEventListener("click",filterTodo);
// functions 

function addTodo(e){
    // to prevent it from refersh we are going to use 
    e.preventDefault();

    // todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    // crete the LI tags
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // add todo to local storage 
    saveLocalTodos(todoInput.value);

    // complete and check marks button 

    const CompletedButton = document.createElement('button');
    CompletedButton.innerHTML = '<i class="fas fa-check"></i>';
    CompletedButton.classList.add('complete-btn');
    todoDiv.appendChild(CompletedButton);

    // traash marks button 

    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    // append to do list 
    todoList.appendChild(todoDiv);
   
    todoInput.value ="";
}

function deleteCheck(e){
    const item  = e.target;
    // delete todo 
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        todo.remove();
    }
    removalLocal(item);
    // delete todo 
    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e){
    const todos = [...todoList.children];
    todos.forEach(function(todo) {
        switch (e.target.value) {
            case "all" :
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo){
    // check do i have already things in it 
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
}

function gettodo(){
    // check do i have already things in it 
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        // todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    // crete the LI tags
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    // complete and check marks button 

    const CompletedButton = document.createElement('button');
    CompletedButton.innerHTML = '<i class="fas fa-check"></i>';
    CompletedButton.classList.add('complete-btn');
    todoDiv.appendChild(CompletedButton);

    // traash marks button 

    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    // append to do list 
    todoList.appendChild(todoDiv);
    })
}

function removalLocal(todo){
    // check do i have already things in it 
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos",JSON.stringify(todos));
}
