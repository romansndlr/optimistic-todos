import React from 'react'
import { useMutation, queryCache } from 'react-query'
import { useTodoItem, useTodos } from '../../hooks'
import { deleteTodo } from '../../services'

function TodoDelete() {
  const { currentFilter, invalidateAllFilters } = useTodos()
  const { todo } = useTodoItem()

  const [runDeleteTodo] = useMutation(deleteTodo, {
    onMutate: (todoId) => {
      queryCache.cancelQueries(['todos', currentFilter])

      const previousTodos = queryCache.getQueryData(['todos', currentFilter])

      queryCache.setQueryData(['todos', currentFilter], (todos) => todos.filter((todo) => todo.id !== todoId))

      return () => queryCache.setQueryData(['todos', currentFilter], previousTodos)
    },
    onError: (_err, _variables, rollback) => rollback(),
    onSuccess: () => invalidateAllFilters(),
  })

  return <button data-test-id="delete-todo" onClick={() => runDeleteTodo(todo.id)} className="destroy" />
}

export default TodoDelete
