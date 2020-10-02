import React from 'react'
import classNames from 'classnames'

const TodosItem = ({ children, todo }) => {
  const [editing, setEditing] = React.useState({})

  return (
    <li
      onDoubleClick={() => {
        setEditing(todo)
      }}
      key={todo.id}
      className={classNames('todo', {
        completed: todo.completed,
        editing: todo.id && editing.id === todo.id,
      })}
      aria-label={todo.title}
    >
      {children({ editing, stopEditing: () => setEditing(false) })}
    </li>
  )
}

export default TodosItem
