import React from 'react'

function TodosList({ children, todos, filter }) {
  return (
    <ul className="todo-list" aria-label="Todos">
      {todos
        .filter((todo) => {
          switch (filter) {
            case 'all':
              return true
            case 'active':
              return !todo.completed
            case 'completed':
              return todo.completed
            default:
              return false
          }
        })
        .map((todo) => todo && children(todo))}
    </ul>
  )
}

export default TodosList
