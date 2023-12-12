const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const { addTodo, getTodos } = require('./todo-utils.js')

const app = express()

app.use(express.json())

const port = 3000

const db = new sqlite3.Database('todos')

const api = {
  getTodos: getTodos(db),
  addTodo: addTodo(db),
}

app.get('/', (req, res) => api.getTodos().then(todos => res.json(todos)))
app.post('/', (req, res) => {
  api.addTodo(req.body.title).then(todo => {
    res.json(todo)
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
