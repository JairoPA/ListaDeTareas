document.addEventListener('DOMContentLoaded', function() {
  const todoForm = document.getElementById('todoForm');
  const todoInput = document.getElementById('todoInput');
  const todoList = document.getElementById('todoList');

  // Obtener todas las tareas
  fetch('/todos')
    .then(response => response.json())
    .then(todos => {
      todos.forEach(todo => addTodoToList(todo));
    });

  // Agregar tarea
  todoForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const title = todoInput.value;
    if (title) {
      fetch('/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title })
      })
        .then(response => response.json())
        .then(todo => {
          addTodoToList(todo);
          todoInput.value = '';
        });
    }
  });

  // Añadir tarea a la lista
  function addTodoToList(todo) {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    
    // Crear un span para el título de la tarea y agregar una clase
    const todoTitle = document.createElement('span');
    todoTitle.className = 'todo-title';
    todoTitle.textContent = todo.title;

    li.appendChild(todoTitle);

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger btn-sm mr-2';
    deleteButton.textContent = 'Eliminar';
    deleteButton.addEventListener('click', function() {
      fetch(`/todos/${todo._id}`, {
        method: 'DELETE'
      })
        .then(response => response.json())
        .then(() => {
          li.remove();
        });
    });

    const editButton = document.createElement('button');
    editButton.className = 'btn btn-primary btn-sm';
    editButton.textContent = 'Editar';
    editButton.addEventListener('click', function() {
  const newTitle = prompt('Editar tarea:', todo.title);
  if (newTitle !== null) {
    // Deshabilitamos el botón de "Editar"
    editButton.disabled = true;

    fetch(`/todos/${todo._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: newTitle })
    })
      .then(response => response.json())
      .then(updatedTodo => {
        console.log('Tarea actualizada:', updatedTodo);

        li.remove();
        addTodoToList(updatedTodo);

        console.log('Tarea actualizada en la lista');
      })
      .catch(error => {
        console.error('Error al actualizar la tarea:', error);
      })
      .finally(() => {
        // Habilitamos el botón de "Editar" después de que se complete la operación
        editButton.disabled = false;
      });
  }
});




    li.appendChild(deleteButton);
    li.appendChild(editButton);
    todoList.appendChild(li);
  }
});

