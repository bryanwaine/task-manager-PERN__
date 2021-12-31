const express = require('express');
const cors = require('cors');
require('dotenv').config();
const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} = require('./queries');
const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());

app.post('/tasks', createTask);
app.get('/tasks', getTasks);
app.get('/tasks/:id', getTask);
app.put('/tasks/:id', updateTask);
app.delete('/tasks/:id', deleteTask);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
