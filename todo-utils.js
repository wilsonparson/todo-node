const getTodos = db => () =>
  new Promise((resolve, reject) =>
    db.all('select * from todos', (err, result) =>
      err ? reject(err) : resolve(result)
    )
  )

const addTodo = db => title =>
  new Promise((resolve, reject) =>
    db.run('insert into todos (title) values (?)', title, function (err) {
      if (err) reject(err)

      db.get('select * from todos where id = ?', this.lastID, (err, row) => {
        if (err) reject(err)
        resolve(row)
      })
    })
  )

module.exports = {
  getTodos,
  addTodo,
}
