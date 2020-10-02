import React from 'react'

function TodosAdd({ onTodoAdded }) {
  const addTodoInputRef = React.useRef()

  async function createTodo(todo) {
    await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify(todo),
    }).then((res) => res.json())

    onTodoAdded()
  }

  async function onKeyDown(e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
      const title = e.target.value
      const todo = { title, completed: false }
      createTodo(todo)
      addTodoInputRef.current.value = ''
    }
  }

  return <input ref={addTodoInputRef} onKeyDown={onKeyDown} className="new-todo" placeholder="What needs to be done?" />
}

export default TodosAdd
