const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/todoapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Modelo de Tarea
const Todo = mongoose.model('Todo', new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
}));

// Ruta de prueba
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Crear una tarea
app.post('/todos', async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
  });
  await todo.save();
  res.status(201).send(todo);
});

// Obtener todas las tareas
app.get('/todos', async (req, res) => {
  const todos = await Todo.find();
  res.send(todos);
});

// Actualizar una tarea
// Actualizar una tarea
app.put('/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, { title: req.body.title }, { new: true });
    if (!todo) return res.status(404).send('Tarea no encontrada');
    res.send(todo);
  } catch (error) {
    res.status(500).send('Error al actualizar la tarea');
  }
});


// Eliminar una tarea
app.delete('/todos/:id', async (req, res) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);
  if (!todo) return res.status(404).send('Tarea no encontrada');

  res.send(todo);
});

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
