const $ = (id) => document.getElementById(id);

$('btn-plus').addEventListener('click',function(){
    const inputField = $('input-field');
    const value = inputField.value;
    inputField.value = '';
    if(value == ''){
        alert('Please write something');
        return;
    }
    const previousToDos = JSON.parse(localStorage.getItem('ToDos'));
    if(!previousToDos){
        const ToDos = [{
            title: value
        }];
        const stringiFied = JSON.stringify(ToDos);
        localStorage.setItem('ToDos',stringiFied);
    }
    else{
        const ToDos = [
            ...previousToDos,
            {
                title: value
            }
        ];
        const stringiFied = JSON.stringify(ToDos);
        localStorage.setItem('ToDos',stringiFied);
    }
    displayFromLS();
})
//display from localstorage
const displayFromLS = () =>{
    const previousToDos = JSON.parse(localStorage.getItem('ToDos'));
    const ul = $('todo-container');
    ul.innerHTML = '';
    previousToDos.forEach(todo =>{
        const li = document.createElement('li');
        li.className = ('list-decimal ml-2 p-1');
        li.innerHTML = `
            <span>${todo.title}</span>
            <button onclick="removeItem()" class="bg-red-500 text-white px-4 rounded-xl hover:bg-red-900">Remove</button>
        `;
        ul.appendChild(li);
    })
}
//button romove all for clear all data from local storage
$('btn-minus').addEventListener('click',function(){
    localStorage.removeItem('ToDos');
    displayFromLS();
})
//remove selected item from local storage
const removeItem = () =>{
    const text = event.target.parentNode.children[0].innerText;
    const todosString = localStorage.getItem('ToDos');
    const todos = JSON.parse(todosString);
    const remainingTodos = todos.filter(todo => todo.title !== text);
    const todosStringified = JSON.stringify(remainingTodos);
    localStorage.setItem('ToDos',todosStringified);
    displayFromLS();
}
displayFromLS();