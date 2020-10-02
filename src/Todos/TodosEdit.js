import React from 'react'
import { updateTodo } from '../services'

function TodosEdit({ todo, onBlur }) {
  const editTodoInputRef = React.useRef()
  const [value, setValue] = React.useState(todo.title)

  const onClickOutsideEdit = React.useCallback(
    async (e) => {
      if (!editTodoInputRef.current) return
      if (!editTodoInputRef.current.contains(e.target)) {
        await updateTodo({ ...todo, title: value })
        onBlur()
      }
    },
    [onBlur, todo, value]
  )

  function onEditSubmit(e) {
    if (e.key === 'Enter') {
      updateTodo({ ...todo, title: value })
    }
  }

  React.useEffect(() => {
    editTodoInputRef.current && editTodoInputRef.current.focus()
  }, [])

  React.useEffect(() => {
    document.addEventListener('mousedown', onClickOutsideEdit)
    return () => document.removeEventListener('mousedown', onClickOutsideEdit)
  }, [onClickOutsideEdit])

  return (
    <input
      aria-label="Todo edit"
      ref={editTodoInputRef}
      onChange={(e) => setValue(e.target.value)}
      onKeyPress={onEditSubmit}
      value={value}
      className="edit"
      type="text"
    />
  )
}

export default TodosEdit
