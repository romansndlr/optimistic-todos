import React from 'react'
import { Footer, TodosAdd, TodosListItem, TodosToggleAll, TodosClearCompleted, TodosFilters } from './components'
import { getTodos } from './services'
import TodosContext from './TodosContext'

function App() {
  const [currentFilter, setFilter] = React.useState('all')
  const [todos, setTodos] = React.useState([])

  const fetchTodos = React.useCallback(async () => {
    const todos = await getTodos(currentFilter)
    setTodos(todos)
  }, [currentFilter])

  React.useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  return (
    <TodosContext.Provider value={{ todos, refetchTodos: fetchTodos, currentFilter, setFilter }}>
      <main>
        <section className="todoapp">
          <header className="header">
            <h1>todos</h1>
            <TodosAdd />
          </header>
          <section className="main">
            <TodosToggleAll />
            <ul className="todo-list">
              {todos.map((todo) => (
                <TodosListItem key={todo.id} todo={todo} />
              ))}
            </ul>
          </section>
          <footer className="footer">
            <span className="todo-count">{todos.length}</span>
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
