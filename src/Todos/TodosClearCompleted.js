import React from 'react'
import { deleteTodo } from '../services'

function TodosClearCompleted({ todos, onCompletedTodosCleared }) {
  async function onClearCompleted() {
    for (const todo of todos) {
      todo.completed && (await deleteTodo(todo.id))
    }

    onCompletedTodosCleared()
  }

  return (
    <button className="clear-completed" onClick={onClearCompleted}>
      Clear completed
    </button>
  )
}

export default TodosClearCompleted
