import React from 'react'
import TodosList from './TodosList'
import TodosAdd from './TodosAdd'
import TodosToggleAll from './TodosToggleAll'
import TodosFilters from './TodosFilters'
import TodosClearCompleted from './TodosClearCompleted'
import TodosCount from './TodosCount'
import TodosToggle from './TodosToggle'
import TodosMain from './TodosMain'
import TodosFooter from './TodosFooter'
import TodosHeader from './TodosHeader'
import TodosItem from './TodosItem'
import TodosEdit from './TodosEdit'

function Todos({ children }) {
  return (
    <main>
      <section className="todoapp">{children}</section>
      <footer className="info">
        <p>Double-click to edit a todo</p>
        <p>
          Created by <a href="http://twitter.com/RomanSndlr">Roman Sandler</a>
        </p>
        <p>
          Part of <a href="http://todomvc.com">TodoMVC</a>
        </p>
      </footer>
    </main>
  )
}

Todos.List = TodosList
Todos.ListItem = TodosItem
Todos.Toggle = TodosToggle
Todos.Add = TodosAdd
Todos.Edit = TodosEdit
Todos.ToggleAll = TodosToggleAll
Todos.Filters = TodosFilters
Todos.Count = TodosCount
Todos.ClearCompleted = TodosClearCompleted
Todos.Main = TodosMain
Todos.Footer = TodosFooter
Todos.Header = TodosHeader

export default Todos
