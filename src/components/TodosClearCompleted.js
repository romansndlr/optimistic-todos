import React from 'react'
import { useTodos } from '../hooks'
import { deleteTodo } from '../services'

function TodosClearCompleted() {
  const { todos, refetchTodos } = useTodos()

  function deleteAllCompleted() {
    return Promise.all(todos.filter((todo) => todo.completed).map((todo) => deleteTodo(todo.id)))
  }

  return (
    <button
      className="clear-completed"
      onClick={async () => {
        await deleteAllCompleted()
        refetchTodos()
      }}
    >
      Clear completed
    </button>
  )
}

export default TodosClearCompleted
