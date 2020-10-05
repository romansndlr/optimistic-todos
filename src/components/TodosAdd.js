import React from 'react'
import createTodo from '../services/create-todo'
import { useTodos } from '../hooks'

function TodosAdd() {
  const addTodoInputRef = React.useRef()
  const { refetchTodos } = useTodos()

  async function onKeyDown(e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
      const title = e.target.value
      const todo = { title, completed: false }
      await createTodo(todo)
      await refetchTodos(todo)
      addTodoInputRef.current.value = ''
    }
  }

  return <input ref={addTodoInputRef} onKeyDown={onKeyDown} className="new-todo" placeholder="What needs to be done?" />
}

export default TodosAdd
