import React from 'react'
import { queryCache, useMutation } from 'react-query'
import uuid from 'uuid'
import createTodo from '../services/create-todo'
import { useTodos } from '../hooks'

function TodosAdd() {
  const addTodoInputRef = React.useRef()
  const { currentFilter } = useTodos()

  const [runCreateTodo] = useMutation(createTodo, {
    onMutate: (newTodo) => {
      queryCache.cancelQueries(['todos', currentFilter])

      const previousTodos = queryCache.getQueryData(['todos', currentFilter])

      queryCache.setQueryData(['todos', currentFilter], (todos) => [...todos, { ...newTodo, id: uuid() }])

      return () => queryCache.setQueryData(['todos', currentFilter], previousTodos)
    },
    onError: (_err, _variables, rollback) => rollback(),
    onSuccess: () => queryCache.invalidateQueries('todos'),
  })

  async function onKeyDown(e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
      const title = e.target.value
      const todo = { title, completed: false }
      runCreateTodo(todo)
      addTodoInputRef.current.value = ''
    }
  }

  return <input ref={addTodoInputRef} onKeyDown={onKeyDown} className="new-todo" placeholder="What needs to be done?" />
}

export default TodosAdd
