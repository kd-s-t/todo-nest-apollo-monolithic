# Todo App made with React, Nest and Apollo by Kenn  

<div align="center">

<img src="https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white" />
<img src="https://img.shields.io/badge/-ApolloGraphQL-311C87?style=for-the-badge&logo=apollo-graphql" />
<img src="https://img.shields.io/badge/-GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white" />
<img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" />

</div>

### setup
```bash
npm run start:dev
```

Open http://localhost:3000/graphql  

### Create a To-do
```cli
mutation {
  createTodo(createTodoInput: {
    title: "Finish test task",
    description: "Build frontend next"
  }) {
    id
    title
    description
    isCompleted
  }
}
```

### Get All Todos
```cli
query {
  getAllTodos {
    id
    title
    description
    isCompleted
  }
}
```

### Get Single Todo by ID
```cli
query {
  getTodoById(id: "PASTE_ID_HERE") {
    id
    title
    description
    isCompleted
  }
}
```

### Update Todo by ID
```cli
mutation {
  updateTodo(id: "your-id-here", update: {
    isCompleted: true
    title: "Updated title"
  }) {
    id
    title
    isCompleted
  }
}

```

### Delete Todo by ID
```cli
mutation {
  deleteTodo(id: "your-id-here")
}
```
