const formCreate = document.getElementById('form-create')
const formEdit = document.getElementById('form-edit')
const listGroupTodo = document.getElementById('list-group-todo')
// const messageCreate = document.getElementById('message-create')
const time = document.getElementById('time')

// time element
const fullDay = document.getElementById('full-day')
const hourEl = document.getElementById('hour')
const minuteEl = document.getElementById('minute')
const secondEl = document.getElementById('second')

let todos = JSON.parse(localStorage.getItem('')) ? JSON.parse
(localStorage.getItem('list')) : []

//setTods to Localstorage
function setTodos(){
    localStorage.setItem('list', JSON.stringify(todos))
}


// show todos
function showTodos(){
    const todos = JSON.parse(localStorage.getItem('list'))
}

// show error
function showMessage(where, message){
    document.getElementById(`${where}`).textContent = message


    setTimeout(() =>{
        document.getElementById(`${where}`).textContent = ''
    } , 2500)
}


// get Todos
formCreate.addEventListener('submit',(e)=> {
 e.preventDefault()
 const todoText = formCreate[ 'input-create'].value.trim()
 formCreate.reset()
 if(todoText.length){
    todos.push({ text:todoText, time:'10:03, 17.10.2025', completed:
        false})
        setTodos()
 }else{
    showMessage('message-create', 'Please, Enter some todo...')
 }
})