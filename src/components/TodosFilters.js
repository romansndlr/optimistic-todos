import React from 'react'
import classNames from 'classnames'
import { TODOS_FILTERS } from '../constants'
import { useTodos } from '../hooks'

function TodosFilters() {
  const { currentFilter, setFilter, invalidateAllFilters } = useTodos()

  React.useEffect(() => {
    const onHashChange = () => {
      const [, filter] = window.location.hash.split('/')
      setFilter(filter)
    }

    window.addEventListener('hashchange', onHashChange)

    return () => window.removeEventListener('hashchange', onHashChange)
  }, [setFilter])

  React.useEffect(() => {
    invalidateAllFilters()
  }, [invalidateAllFilters])

  return (
    <ul className="filters">
      <li>
        <a href="#/all" className={classNames({ selected: currentFilter === TODOS_FILTERS.ALL })}>
          All
        </a>
      </li>
      <li>
        <a href="#/active" className={classNames({ selected: currentFilter === TODOS_FILTERS.ACTIVE })}>
          Active
        </a>
      </li>
      <li>
        <a href="#/completed" className={classNames({ selected: currentFilter === TODOS_FILTERS.COMPLETED })}>
          Completed
        </a>
      </li>
    </ul>
  )
}

export default TodosFilters
