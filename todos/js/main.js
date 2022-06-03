var todos = [
    {id:1, title:"Maktabga boraman", isCompleted:true},
    {id:2, title:"Bog'chaga boraman", isCompleted:false},
    {id:3, title:"Uxlayman", isCompleted:false},
    {id:4, title:"Ovqatlanaman", isCompleted:false},
    {id:5, title:"Dars qilaman", isCompleted:true},
]

var containerEl = document.createElement('div')
containerEl.className = 'container'
document.body.appendChild(containerEl)


var todoInputForm = document.createElement('form')
todoInputForm.className = 'todo-form'
todoInputForm.addEventListener('submit', (event) => {
    event.preventDefault()
    let id =todos.length >0 ? todos[todos.length-1].id+1 : 0
    const newTodo = {
        id:id,
        title:todoInput.value,
        isCompleted:false
    }
    todos.push(newTodo)
    todoInput.value = ""
    renderTodos(todos)
})



containerEl.appendChild(todoInputForm)

var todoInput = document.createElement('input')
todoInput.className = 'todo-input'

var todoAddBtn = document.createElement('button')
todoAddBtn.textContent = "Add"
todoAddBtn.type = 'submit'
todoAddBtn.className = 'todo-add-btn'


todoInputForm.appendChild(todoInput)
todoInputForm.appendChild(todoAddBtn)


var todoListEl = document.createElement('div')
todoListEl.className = "todolist-container"
containerEl.appendChild(todoListEl)


var sortType = 1 // default o'sish tartibida sortlangan
var sortBy = 1; // id bo'yicha sortlangan
// Sort elementlari konteyneri


function sortAndRender(sortType = 1, sortBy = 1){
        todos = todos.sort((a, b) => {
            switch(sortBy){
                case 1:
                    return sortType * (a.id - b.id);
                case 2: return sortType * (a.isCompleted - b.isCompleted);
                case 3: return sortType * (a.title.charCodeAt() - b.title.charCodeAt());
                default: return sortType * (a.id - b.id);
            }
        })
        renderTodos(todos)
}


sortAndRender(sortType, sortBy)
let sortBtnsEl = document.createElement('div')
containerEl.appendChild(sortBtnsEl)

const optsSortBy = [
    {value:1, text:"Sortby id"},
    {value:2, text:"Sortby isCompleted"},
    {value:3, text:"Sortby title"},
]


let sortBySelectEl =createSelectEl(optsSortBy) 
sortBySelectEl.addEventListener("change", (e) => {
    
    sortBy = e.target.value - 0
    sortAndRender(sortType, sortBy)
})

sortBtnsEl.appendChild(sortBySelectEl)
const optsGreaterOrLess = [
    {value:1, text:"O'sish"},
    {value:-1, text:"Kamayish"},
] 

let typeSortSelectEl = createSelectEl(optsGreaterOrLess)
sortBtnsEl.appendChild(typeSortSelectEl)

typeSortSelectEl.addEventListener('change', (e) => {
    sortType = e.target.value - 0
    sortAndRender(sortType, sortBy)
})

function createSelectEl(opts=[]){
    let selectEl = document.createElement('select')
    let option = document.createElement('option')
    option.textContent = "--Select--"
    option.selected = true
    option.disabled = true
    selectEl.appendChild(option)

    opts.forEach((value) => {
        let option = document.createElement('option')
        option.textContent = value.text
        option.value = value.value
        selectEl.appendChild(option)
    })
    return selectEl
}


function createTodoItem(todo){
    let todoContainer = document.createElement('div')
    todoContainer.className = 'todo-item'

    let todoCheckEl = document.createElement('input')
    todoCheckEl.type = 'checkbox'
    todoCheckEl.className = 'todo-item__check'
    todoCheckEl.checked = todo.isCompleted
    todoContainer.appendChild(todoCheckEl)


    todoCheckEl.addEventListener('change', () => {
        todos = todos.map(value => {
            if(value.id === todo.id){
                value.isCompleted = todoCheckEl.checked
            }
            return value
        })
        renderTodos(todos)
        console.log(todos)
    })
    let todoTitleEl = document.createElement('p')
    todoTitleEl.textContent = todo.title
    todoTitleEl.className = 'todo-item__title'
    todoContainer.appendChild(todoTitleEl)

    let todoDelEl = document.createElement('button')
    todoDelEl.textContent = 'delete'
    todoDelEl.className = 'todo-item__delete'
    todoContainer.appendChild(todoDelEl)
    todoDelEl.addEventListener('click', () => {
        todos = todos.filter(value =>value.id!== todo.id)
        renderTodos(todos)
    })
    return todoContainer
}

function renderTodos(todosData){
    todoListEl.innerHTML = null
    if(todosData.length >0){
        todosData.forEach((todo, index) => {
            let todoEl = createTodoItem(todo)
            todoListEl.appendChild(todoEl)
        })
    }else{
        todoListEl.textContent = "Todos not found"
    }
    
}

renderTodos(todos)