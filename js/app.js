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
    render();
})
const render = () =>{
    const previousToDos = JSON.parse(localStorage.getItem('ToDos'));
    const ul = $('todo-container');
    ul.innerHTML = '';
    previousToDos.forEach(todo =>{
        const li = document.createElement('li');
        li.className = ('list-decimal ml-2 p-1');
        li.innerHTML = `
            ${todo.title}
            <button onclick="removeItem()" class="bg-red-500 text-white px-4 rounded-xl hover:bg-red-900">Remove</button>
        `;
        ul.appendChild(li);
    })
}
$('btn-minus').addEventListener('click',function(){
    localStorage.removeItem('ToDos');
    render();
})
const removeItem = (todo) =>{
    console.log(event.target.parentNode);
    event.target.parentNode.className = 'hidden';
}
render();