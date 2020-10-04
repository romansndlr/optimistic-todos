async function createTodo(todo) {
  return await fetch('/api/todos', {
    method: 'POST',
    body: JSON.stringify(todo),
  })
}

export default createTodo
