require('dotenv');
const Pool = require('pg').Pool;

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

const createTask = async (req, res) => {
  try {
    const { description } = req.body;
    const newTask = await pool.query(
      `INSERT INTO task (description) VALUES($1) RETURNING *`,
      [description]
    );
    res.json(newTask.rows);
  } catch (err) {
    console.error(err.message);
  }
};

const getTasks = async (req, res) => {
  try {
    const allTasks = await pool.query(`SELECT * FROM task`);
    res.json(allTasks.rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await pool.query(`SELECT * FROM task WHERE task_id = $1`, [
      id,
    ]);

    res.json(task.rows[0]);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const isTask = await pool.query(`SELECT * FROM task WHERE task_id = $1`, [
      id,
    ]);

    await pool.query(`UPDATE task SET description = $1 WHERE task_id = $2`, [
      description,
      id,
    ]);

    res.json('Task has been updated!');
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const isTask = await pool.query(`SELECT * FROM task WHERE task_id = $1`, [
      id,
    ]);

    await pool.query(`DELETE FROM task WHERE task_id = $1`, [id]);

    res.json('Task has been deleted!');
  } catch (err) {
    res.status(500).error(err.message);
  }
};

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
};
