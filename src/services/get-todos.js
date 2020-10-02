async function getTodos() {
  return await fetch('/api/todos').then((res) => res.json())
}

export default getTodos
