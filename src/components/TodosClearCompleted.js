import React from 'react'
import { queryCache, useMutation } from 'react-query'
import { useTodos } from '../hooks'
import { deleteTodo } from '../services'

function TodosClearCompleted() {
  const { todos, invalidateAllFilters, currentFilter } = useTodos()
  const completedTodos = todos.filter((todo) => todo.completed)

  function deleteCompleted(todos) {
    return Promise.all(todos.map((todo) => deleteTodo(todo.id)))
  }

  const [runDeleteCompleted] = useMutation(deleteCompleted, {
    onMutate: () => {
      queryCache.cancelQueries(['todos', currentFilter])

      const previousTodos = queryCache.getQueryData(['todos', currentFilter])

      queryCache.setQueryData(['todos', currentFilter], (todos) => todos.filter((todo) => !todo.completed))

      return () => queryCache.setQueryData(['todos', currentFilter], previousTodos)
    },
    onError: (_err, _variables, rollback) => rollback(),
    onSuccess: () => invalidateAllFilters(),
  })

  return (
    <button className="clear-completed" onClick={() => runDeleteCompleted(completedTodos)}>
      Clear completed
    </button>
  )
}

export default TodosClearCompleted
