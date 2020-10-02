import React from 'react'
import { updateTodo } from '../services'

function TodosToggleAll({ todos, onAllTodosToggled }) {
  const anyNotCompleted = todos.some((todo) => !todo.completed)

  async function onToggleAll() {
    for (const todo of todos) {
      await updateTodo({ ...todo, completed: anyNotCompleted })
    }

    onAllTodosToggled()
  }

  return (
    <React.Fragment>
      <input id="toggle-all" onChange={onToggleAll} className="toggle-all" type="checkbox" />
      <label htmlFor="toggle-all">Mark all as complete</label>
    </React.Fragment>
  )
}

export default TodosToggleAll
