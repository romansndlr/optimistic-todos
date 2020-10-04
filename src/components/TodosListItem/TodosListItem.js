import React from 'react'
import classNames from 'classnames'
import TodoEdit from './TodoEdit'
import TodoDelete from './TodoDelete'
import TodoCompleteToggle from './TodoCompleteToggle'
import TodoListItemContext from './TodoListItemContext'

const TodosListItem = ({ todo }) => {
  const [editing, setEditing] = React.useState({})

  return (
    <TodoListItemContext.Provider value={{ editing, stopEditing: () => setEditing({}), todo }}>
      <li
        onDoubleClick={() => setEditing(todo)}
        key={todo.id}
        className={classNames('todo', {
          completed: todo.completed,
          editing: todo.id && editing.id === todo.id,
        })}
        aria-label={todo.title}
      >
        <div className="view">
          <TodoCompleteToggle />
          <label>{todo.title}</label>
          <TodoDelete />
        </div>
        {editing.id === todo.id && <TodoEdit />}
      </li>
    </TodoListItemContext.Provider>
  )
}

export default TodosListItem
