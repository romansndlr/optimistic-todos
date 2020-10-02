async function updateTodo(todo) {
  return await fetch(`/api/todos/${todo.id}`, {
    method: 'PATCH',
    body: JSON.stringify(todo),
  })
}

export default updateTodo
