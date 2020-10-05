import React from 'react'
import { useTodoItem, useTodos } from '../../hooks'
import { updateTodo } from '../../services'

function TodoEdit() {
  const editTodoInputRef = React.useRef()
  const { todo, stopEditing } = useTodoItem()
  const { refetchTodos } = useTodos()
  const [value, setValue] = React.useState(todo.title)

  const onClickOutsideEdit = React.useCallback(
    async (e) => {
      if (!editTodoInputRef.current) return
      if (!editTodoInputRef.current.contains(e.target)) {
        await updateTodo({ ...todo, title: value })
        await refetchTodos()
        stopEditing()
      }
    },
    [refetchTodos, stopEditing, todo, value]
  )

  async function onEditSubmit(e) {
    if (e.key === 'Enter') {
      await updateTodo({ ...todo, title: value })
      await refetchTodos()
      stopEditing()
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

export default TodoEdit
