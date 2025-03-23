import { Injectable } from '@nestjs/common';
import { Todo } from './models/todo.model';
import { CreateTodoInput } from './dto/create-todo.input';
import { randomUUID } from 'crypto';

@Injectable()
export class TodoService {
  private todos: Todo[] = [];

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: string): Todo | undefined {
    return this.todos.find((todo) => todo.id === id);
  }

  create(createTodoInput: CreateTodoInput): Todo {
    const newTodo: Todo = {
      id: randomUUID(),
      isCompleted: false,
      ...createTodoInput,
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  deleteTodo(id: string): boolean {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index === -1) return false;
    this.todos.splice(index, 1);
    return true;
  }

  updateTodo(id: string, update: Partial<Todo>): Todo {
    const todo = this.getTodoById(id);
    if (!todo) throw new Error('Todo not found');
    Object.assign(todo, update);
    return todo;
  }

  getTodoById(id: string): Todo {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      throw new Error(`Todo with id ${id} not found`);
    }
    return todo;
  }
}
