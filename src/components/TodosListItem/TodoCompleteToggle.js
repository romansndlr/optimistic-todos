import produce from 'immer'
import React from 'react'
import { queryCache, useMutation } from 'react-query'
import { updateTodo } from '../../services'
import { useTodoItem, useTodos } from '../../hooks'

function TodoCompleteToggle() {
  const { currentFilter, invalidateAllFilters } = useTodos()
  const { todo } = useTodoItem()

  const [runUpdateTodo] = useMutation(updateTodo, {
    onMutate: (newTodo) => {
      queryCache.cancelQueries(['todos', currentFilter])

      const previousTodos = queryCache.getQueryData(['todos', currentFilter])

      const updatedTodos = produce(previousTodos, (draftTodos) => {
        draftTodos.forEach((todo) => {
          if (todo.id === newTodo.id) {
            todo.completed = newTodo.completed
          }
        })
      })

      queryCache.setQueryData(['todos', currentFilter], updatedTodos)

      return () => queryCache.setQueryData(['todos', currentFilter], previousTodos)
    },
    onError: (_err, _variables, rollback) => rollback(),
    onSuccess: () => invalidateAllFilters(),
  })

  return (
    <input
      aria-label="Todo checked toggle"
      className="toggle"
      type="checkbox"
      onChange={() => runUpdateTodo({ ...todo, completed: !todo.completed })}
      checked={todo.completed}
    />
  )
}

export default TodoCompleteToggle
