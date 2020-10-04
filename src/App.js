import React from 'react'
import { usePaginatedQuery } from 'react-query'
import { Footer, TodosAdd, TodosListItem, TodosToggleAll, TodosClearCompleted, TodosFilters } from './components'
import { getTodos } from './services'
import TodosContext from './TodosContext'

function App() {
  const [currentFilter, setFilter] = React.useState('all')
  const { resolvedData = [] } = usePaginatedQuery(['todos', currentFilter], getTodos)

  return (
    <TodosContext.Provider value={{ todos: resolvedData, currentFilter, setFilter }}>
      <main>
        <section className="todoapp">
          <header className="header">
            <h1>todos</h1>
            <TodosAdd />
          </header>
          <section className="main">
            <TodosToggleAll />
            <ul className="todo-list">
              {resolvedData.map((todo) => (
                <TodosListItem key={todo.id} todo={todo} />
              ))}
            </ul>
          </section>
          <footer className="footer">
            <span className="todo-count">{resolvedData.length}</span>
            <TodosFilters />
            <TodosClearCompleted />
          </footer>
        </section>
        <Footer />
      </main>
    </TodosContext.Provider>
  )
}

export default App
