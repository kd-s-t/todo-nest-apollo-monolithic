import { gql } from '@apollo/client';
import { TODO_FIELDS } from './fragments';

export const GET_ALL_TODOS = gql`
  ${TODO_FIELDS}
  query GetAllTodos {
    getAllTodos {
      ...TodoFields
    }
  }
`;

export const GET_TODO_BY_ID = gql`
  query GetTodoById($id: String!) {
    getTodoById(id: $id) {
      id
      title
      description
      isCompleted
    }
  }
`;
