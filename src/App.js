import React from 'react'
import { getTodos } from './services'

import Todos from './Todos'
import Todo from './Todos/Todo'

function App() {
  const [filter, setFilter] = React.useState('all')
  const [todos, setTodos] = React.useState([])

  async function fetchTodos() {
    const todos = await getTodos()
    setTodos(todos)
  }

  React.useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <Todos>
      <Todos.Header>
        <Todos.Add onTodoAdded={fetchTodos} />
      </Todos.Header>
      <Todos.Main>
        <Todos.ToggleAll onAllTodosToggled={fetchTodos} todos={todos} />
        <Todos.List todos={todos} filter={filter}>
          {(todo) => (
            <Todos.ListItem key={todo.id} todo={todo}>
              {({ editing, stopEditing }) => (
                <React.Fragment>
                  <Todo>
                    <Todo.Toggle onTodoToggled={fetchTodos} todo={todo} />
                    <Todo.Label todo={todo} />
                    <Todo.Delete onTodoDeleted={fetchTodos} todo={todo} />
                  </Todo>
                  {editing.id === todo.id && (
                    <Todos.Edit
                      onBlur={async () => {
                        await fetchTodos()
                        stopEditing()
                      }}
                      todo={todo}
                    />
                  )}
                </React.Fragment>
              )}
            </Todos.ListItem>
          )}
        </Todos.List>
      </Todos.Main>
      <Todos.Footer>
        <Todos.Count>{todos.length}</Todos.Count>
        <Todos.Filters onFilterChange={(filter) => setFilter(filter)} filter={filter} />
        <Todos.ClearCompleted todos={todos} onCompletedTodosCleared={fetchTodos} />
      </Todos.Footer>
    </Todos>
  )
}

export default App
