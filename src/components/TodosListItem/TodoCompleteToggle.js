import React from 'react'
import { updateTodo } from '../../services'
import { useTodoItem, useTodos } from '../../hooks'

function TodoCompleteToggle() {
  const { refetchTodos } = useTodos()
  const { todo } = useTodoItem()

  return (
    <input
      aria-label="Todo checked toggle"
      className="toggle"
      type="checkbox"
      onChange={async () => {
        await updateTodo({ ...todo, completed: !todo.completed })
        refetchTodos()
      }}
      checked={todo.completed}
    />
  )
}

export default TodoCompleteToggle
