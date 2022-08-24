const todoListDOM = document.querySelector("#todoList"),
    todoInput = document.querySelector("#todoInput")

todoInput.addEventListener("submit", e => {
    e.preventDefault();
    console.log(e)
})