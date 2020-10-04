import React from 'react'
import { queryCache, useMutation } from 'react-query'
import { useTodos } from '../hooks'
import { updateTodo } from '../services'

const toggleAll = (todos) => Promise.all(todos.map((todo) => updateTodo(todo)))

function TodosToggleAll() {
  const { currentFilter, todos, invalidateAllFilters } = useTodos()
  const anyNotCompleted = todos.some((todo) => !todo.completed)

  const [runToggleAll] = useMutation(toggleAll, {
    onMutate: (updatedTodos) => {
      queryCache.cancelQueries(['todos', currentFilter])

      const previousTodos = queryCache.getQueryData(['todos', currentFilter])

      queryCache.setQueryData(['todos', currentFilter], updatedTodos)

      return () => queryCache.setQueryData(['todos', currentFilter], previousTodos)
    },
    onError: (_err, _variables, rollback) => rollback(),
    onSuccess: () => invalidateAllFilters(),
  })

  return (
    <React.Fragment>
      <input
        id="toggle-all"
        onChange={() => runToggleAll(todos.map((todo) => ({ ...todo, completed: anyNotCompleted })))}
        className="toggle-all"
        type="checkbox"
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
    </React.Fragment>
  )
}

export default TodosToggleAll
