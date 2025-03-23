import { gql } from "@apollo/client";

export const TOGGLE_TODO = gql`
  mutation ToggleTodo($id: String!, $update: UpdateTodoInput!) {
    updateTodo(id: $id, update: $update) {
      id
      isCompleted
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: String!) {
    deleteTodo(id: $id)
  }
`;

export const UPDATE_TODO = gql`
  mutation UpdateTodo($id: String!, $update: UpdateTodoInput!) {
    updateTodo(id: $id, update: $update) {
      id
      title
      description
    }
  }
`;

export const CREATE_TODO = gql`
  mutation CreateTodo($input: CreateTodoInput!) {
    createTodo(createTodoInput: $input) {
      id
      title
      description
      isCompleted
    }
  }
`;