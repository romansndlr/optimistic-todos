import React from 'react'
import { queryCache } from 'react-query'
import { TODOS_FILTERS } from '../constants'
import { getTodos } from '../services'
import TodosContext from '../TodosContext'

export default function useTodos() {
  const context = React.useContext(TodosContext)

  const invalidateAllFilters = React.useCallback(() => {
    queryCache.invalidateQueries('todos')

    Object.values(TODOS_FILTERS).forEach((filter) => {
      queryCache.prefetchQuery(['todos', filter], getTodos)
    })
  }, [])

  if (!context) {
    throw new Error("context can't be acceced outside of a provider")
  }

  return { invalidateAllFilters, ...context }
}
