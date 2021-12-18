// DATE
let todos = [
    {
        id: 1,
        text: 'Watch TV',
        isCompleted: false,
        date: new Date().toLocaleTimeString(),
    },
    {
        id: 2,
        text: 'Play games',
        isCompleted: false,
        date: new Date().toLocaleTimeString(),
    },
    {
        id: 3,
        text: 'Learn Front-End',
        isCompleted: false,
        date: new Date().toLocaleTimeString(),
    },
]

//ROOT
const root = document.querySelector('#root');
const header = createHeader();
const todoList = createTodoList(todos);
header.addEventListener('click', e => onHeaderClick(e));
root.append(header, todoList);

//HANDLERS
//Hendler Header
const onHeaderClick = (event) => {
    if (event.target.id === 'btnAdd') {
        const todo = {
            id: todos.length + 1,
            text: event.target.previousElementSibling.value,
            isCompleted: false,
            date: new Date().toLocaleTimeString(),
        }
        todos.push(todo);
        renderTodos();
    } else if (event.target.id === 'btnDeleteAll') {
        todos.length = 0;
        renderTodos();
    }
}

//Hendler Item
function onTodoItemClick(event) {
    if (event.target.id === 'fieldItem') {
        index = event.target.parentElement.id - 1;
        if (todos[index].isCompleted === true) {
            todos[index].isCompleted = false;
        } else {
            todos[index].isCompleted = true;
        }
        renderTodos();
        return todos;
    } else if (event.target.id === "btnDelete") {
        todos = todos.filter((item) => item.id != event.target.parentElement.id);
        recountIdItem();
    }
    renderTodos();
    return todos;
}

//RENDER
function renderTodos() {
    const todoList = createTodoList(todos);
    root.innerHTML = '';
    root.append(header, todoList);
}

//COMPONENTS
//Header
function createHeader() {
    const header = createElement('header', 'd-flex align-item-center gap-2');
    const input = createElement('input', 'form-control flex-grow-1', '');
    const btnAdd = createElement('button', 'btn btn-outline-success', 'Add');
    const btnDeleteAll = createElement('button', 'btn btn-outline-danger', 'Delete');

    input.id = 'field';
    btnAdd.id = 'btnAdd';
    btnDeleteAll.id = 'btnDeleteAll';
    header.append(btnDeleteAll, input, btnAdd);
    return header;
}
//List
function createTodoList(todos) {
    const list = createElement('div', 'd-flex flex-column gap-1', '');
    todos.forEach(todo => {
        const todoItem = createTodoItem(todo);
        list.append(todoItem);
    })
    return list;
}
//Item+
function createTodoItem(todo) {
    const todoItem = createElement(
        'div',
        'd-flex aline-item-center gap-2 border py-2 px-4 rounded-3'
    );
    todoItem.id = todo.id;
    const input = createElement('input', 'my-2', '');
    input.type = 'checkbox';
    input.checked = todo.isCompleted;
    let textDecoration = '';
    if (input.checked === true) {
        textDecoration = 'text-decoration-line-through bg-success bg-opacity-25';
    }
    const text = createElement('p', `m-0 flex-grow-1 ${textDecoration}`, todo.text);
    const date = createElement('span', 'my-1 badge bg-secondary', todo.date);
    const btnDelete = createElement('button', 'btn-close', '');
    todoItem.append(input, text, date, btnDelete);
    input.id = 'fieldItem';
    btnDelete.id = 'btnDelete';
    todoItem.addEventListener('click', e => onTodoItemClick(e));
    return todoItem;
}

//UTILS
function createElement(tag, className, text = '') {
    const element = document.createElement(tag);
    element.className = className;
    element.textContent = text;
    return element;
}

function recountIdItem(id) {
    todos.forEach((_id, index) => { todos[index].id = ++index })
    return id;
}