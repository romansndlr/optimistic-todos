import React from 'react'
import TodoListItemContext from '../components/TodosListItem/TodoListItemContext'

export default function useTodoItem() {
  const context = React.useContext(TodoListItemContext)

  if (!context) {
    throw new Error("context can't be acceced outside of a provider")
  }

  return context
}
