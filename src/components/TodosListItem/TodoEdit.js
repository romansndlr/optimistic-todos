import produce from 'immer'
import React from 'react'
import { queryCache, useMutation } from 'react-query'
import { useTodoItem, useTodos } from '../../hooks'
import { updateTodo } from '../../services'

function TodoEdit() {
  const editTodoInputRef = React.useRef()
  const { todo, stopEditing } = useTodoItem()
  const { invalidateAllFilters, currentFilter } = useTodos()
  const [value, setValue] = React.useState(todo.title)

  const [runUpdateTodo] = useMutation(updateTodo, {
    onMutate: (updatedTodo) => {
      queryCache.cancelQueries(['todos', currentFilter])

      const previousTodos = queryCache.getQueryData(['todos', currentFilter])

      const updatedTodos = produce(previousTodos, (draftTodos) => {
        draftTodos.forEach((todo) => {
          if (todo.id === updatedTodo.id) {
            todo.title = updatedTodo.title
          }
        })
      })

      queryCache.setQueryData(['todos', currentFilter], updatedTodos)

      stopEditing()

      return () => queryCache.setQueryData(['todos', currentFilter], previousTodos)
    },
    onError: (_err, _variables, rollback) => rollback(),
    onSuccess: () => invalidateAllFilters(),
  })

  const onClickOutsideEdit = React.useCallback(
    async (e) => {
      if (!editTodoInputRef.current) return
      if (!editTodoInputRef.current.contains(e.target)) {
        runUpdateTodo({ ...todo, title: value })
      }
    },
    [runUpdateTodo, todo, value]
  )

  function onEditSubmit(e) {
    if (e.key === 'Enter') {
      runUpdateTodo({ ...todo, title: value })
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
