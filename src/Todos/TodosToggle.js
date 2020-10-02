import React from 'react'
import { updateTodo } from '../services'

function TodosToggle({ todo, onTodoToggled }) {
  async function onToggle() {
    await updateTodo({ ...todo, completed: !todo.completed })
    onTodoToggled()
  }

  return (
    <input
      aria-label="Todo checked toggle"
      className="toggle"
      type="checkbox"
      onChange={onToggle}
      checked={todo.completed}
    />
  )
}

export default TodosToggle
