import React from 'react'
import { deleteTodo } from '../services'

function TodosDelete({ todo, onTodoDeleted }) {
  async function onDelete(id) {
    await deleteTodo(id)
    onTodoDeleted()
  }

  return <button data-test-id="delete-todo" onClick={() => onDelete(todo.id)} className="destroy" />
}

export default TodosDelete
