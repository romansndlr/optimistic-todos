async function getTodos(_queryKey, filter = 'all') {
  return await fetch(`/api/todos?filter=${filter}`).then((res) => res.json())
}

export default getTodos
