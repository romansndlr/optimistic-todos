import React from 'react'
import TodosToggle from './TodosToggle'
import TodosDelete from './TodosDelete'
import TodosLabel from './TodosLabel'

const Todo = ({ children }) => {
  return <div className="view">{children}</div>
}

Todo.Toggle = TodosToggle
Todo.Delete = TodosDelete
Todo.Label = TodosLabel

export default Todo
