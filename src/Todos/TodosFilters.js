import React from 'react'
import classNames from 'classnames'

function TodosFilters({ filter, onFilterChange }) {
  const onHashChange = React.useCallback(() => {
    const hash = window.location.hash.split('/')[1]
    onFilterChange(hash)
  }, [onFilterChange])

  React.useEffect(() => {
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [onHashChange])

  return (
    <ul className="filters">
      <li>
        <a href="#/all" className={classNames({ selected: filter === 'all' })}>
          All
        </a>
      </li>
      <li>
        <a href="#/active" className={classNames({ selected: filter === 'active' })}>
          Active
        </a>
      </li>
      <li>
        <a href="#/completed" className={classNames({ selected: filter === 'completed' })}>
          Completed
        </a>
      </li>
    </ul>
  )
}

export default TodosFilters
