import React from 'react'
import { useTodoItem, useTodos } from '../../hooks'
import { deleteTodo } from '../../services'

function TodoDelete() {
  const { refetchTodos } = useTodos()
  const { todo } = useTodoItem()

  return (
    <button
      data-test-id="delete-todo"
      onClick={async () => {
        await deleteTodo(todo.id)
        refetchTodos()
      }}
      className="destroy"
    />
  )
}

export default TodoDelete
