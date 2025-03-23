import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Todo } from './models/todo.model';
import { TodoService } from './todo.service';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => [Todo], { name: 'getAllTodos' })
  findAll(): Todo[] {
    return this.todoService.findAll();
  }

  @Query(() => Todo, { name: 'getTodoById', nullable: true })
  findOne(@Args('id') id: string): Todo | undefined {
    return this.todoService.findOne(id);
  }

  @Mutation(() => Todo)
  createTodo(@Args('createTodoInput') input: CreateTodoInput): Todo {
    return this.todoService.create(input);
  }

  @Mutation(() => Todo)
  updateTodo(@Args('id') id: string, @Args('update') update: UpdateTodoInput) {
    return this.todoService.updateTodo(id, update);
  }

  @Mutation(() => Boolean)
  deleteTodo(@Args('id') id: string) {
    return this.todoService.deleteTodo(id);
  }
}
