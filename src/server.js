import { Server, Model, RestSerializer, Response } from 'miragejs'

export function makeServer({ env } = { env: 'development' }) {
  return new Server({
    models: {
      todo: Model,
    },

    environment: env,

    serializers: {
      application: RestSerializer.extend({
        root: false,
        embed: true,
      }),
    },

    routes() {
      this.namespace = 'api'
      this.timing = 200

      this.get('todos', (schema, request) => {
        const filter = request.queryParams.filter

        if (!filter || filter === 'all') {
          return schema.todos.all()
        }

        return schema.todos.where({ completed: filter === 'completed' })
      })

      this.post('todos', (schema, request) => {
        if (Math.random() > 0.7) {
          return Response(500)
        }

        const todo = JSON.parse(request.requestBody)
        schema.todos.create(todo)
      })

      this.patch('todos/:id', (schema, request) => {
        if (Math.random() > 0.7) {
          return Response(500)
        }

        const id = request.params.id
        const todo = JSON.parse(request.requestBody)
        schema.todos.find(id).update(todo)
      })

      this.delete('todos/:id', (schema, request) => {
        if (Math.random() > 0.7) {
          return Response(500)
        }

        const id = request.params.id
        const todo = JSON.parse(request.requestBody)
        schema.todos.find(id).destroy(todo)
      })

      this.passthrough()
    },

    seeds(server) {
      server.create('todo', { title: 'Buy Milk', completed: false })
      server.create('todo', { title: 'Do Homework', completed: true })
      server.create('todo', { title: 'Clean House', completed: false })
    },
  })
}
