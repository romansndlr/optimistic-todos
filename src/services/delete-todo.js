async function deleteTodo(id) {
  return await fetch(`/api/todos/${id}`, {
    method: 'DELETE',
  })
}

export default deleteTodo
