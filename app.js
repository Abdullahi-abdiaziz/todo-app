const todoInput = document.querySelector("#todo-input");
const todosContainer = document.querySelector(".todos");
const completedCount = document.querySelector(".completedCount");

let elem = null;
let todos = [];

todoInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter" || e.key === 13) {
    let value = e.target.value;
    todos.push({ value: value, checked: false });
    NewTodo(value);
    todoInput.value = "";
    countCompleted();
  }
});

function NewTodo(value) {
  const todo = document.createElement("div");
  const todoText = document.createElement("p");
  const todoCheckBox = document.createElement("input");
  const todoCheckBoxLabel = document.createElement("label");
  const todoCross = document.createElement("span");

  let obj = todos.find((t) => t.value === value);

  todoText.textContent = value;
  todoCheckBox.type = "checkbox";
  todoCheckBox.name = "checkbox";
  todoCheckBoxLabel.htmlFor = "checkbox";

  todoCheckBoxLabel.addEventListener("click", (e) => {
    if (todoCheckBox.checked) {
      todoCheckBox.checked = false;
      todoText.style.textDecoration = "none";
      todoCheckBoxLabel.classList.remove("active");
      obj.checked = false;
      countCompleted();
    } else {
      obj.checked = true;
      countCompleted();
      todoCheckBox.checked = true;
      todoText.style.textDecoration = "line-through";
      todoCheckBoxLabel.classList.add("active");
    }
  });

  todoCross.textContent = "";
  todoCross.addEventListener("click", (e) => {
    e.target.parentElement.remove();
    todos = todos.filter((t) => t !== obj);
    obj.checked = false;
    countCompleted();
  });

  todo.classList.add("todo");
  todoCheckBoxLabel.classList.add("circle");
  todoCross.classList.add("cross");

  todo.appendChild(todoCheckBox);
  todo.appendChild(todoCheckBoxLabel);
  todo.appendChild(todoText);
  todo.appendChild(todoCross);

  // todo.draggable = true;
  // todo.addEventListener("dragstart", (e) => {
  //   e.dataTransfer.effectAllowed = "move";
  //   e.dataTransfer.setData("text/plain, null");
  //   elem = e.target;
  //   console.log(elem)
  // });

  todosContainer.appendChild(todo);
}

function countCompleted() {
  completedCount.textContent = `${
    todos.filter((t) => t.checked === false).length
  } items left`;
}

function clearCompleted() {
  document.querySelectorAll(".todo").forEach((todo) => {
    todo.style.display = "grid";
    if (todo.querySelector("input").checked) {
      todo.remove();
      countCompleted();
    }
  });
}

function showAll() {
  document.querySelectorAll(".filters button").forEach((d, i) => {
    if (i === 0) {
      d.classList.add("filter-active");
      console.log("added")
    } else {
      d.classList.remove("filter-active");
      console.log('removed')
    }
  });
  document.querySelectorAll(".todo").forEach((todo) => {
    todo.style.display = "grid";
  });
}

function filterCompleted() {
  document.querySelectorAll(".filters button").forEach((d, i) => {
    if (i === 2) {
      d.classList.add("filter-active");
    } else {
      d.classList.remove("filter-active");
    }
  });
  document.querySelectorAll(".todo").forEach((todo) => {
    todo.style.display = "grid";
    if (!todo.querySelector("input").checked) {
      todo.style.display = "none";
    }
  });
}

function filterActive() {
  document.querySelectorAll(".filters button").forEach((d, i) => {
    if (i === 1) {
      d.classList.add("filter-active");
    } else {
      d.classList.remove("filter-active");
    }
  });
  document.querySelectorAll(".todo").forEach((todo) => {
    todo.style.display = "grid";
    if (todo.querySelector("input").checked) {
      todo.style.display = "none";
    }
  });
}

function changeTheme() {
  document.body.classList.toggle("light");
}
