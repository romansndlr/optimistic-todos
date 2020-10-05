import React from 'react'
import { useTodos } from '../hooks'
import { updateTodo } from '../services'

const toggleAll = (todos) => Promise.all(todos.map((todo) => updateTodo(todo)))

function TodosToggleAll() {
  const { todos, refetchTodos } = useTodos()
  const anyNotCompleted = todos.some((todo) => !todo.completed)

  return (
    <React.Fragment>
      <input
        id="toggle-all"
        onChange={async () => {
          await toggleAll(todos.map((todo) => ({ ...todo, completed: anyNotCompleted })))
          refetchTodos()
        }}
        className="toggle-all"
        type="checkbox"
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
    </React.Fragment>
  )
}

export default TodosToggleAll
