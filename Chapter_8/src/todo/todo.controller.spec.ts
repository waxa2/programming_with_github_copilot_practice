import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

describe('TodoController', () => {
  let controller: TodoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [TodoService],
    }).compile();

    controller = module.get<TodoController>(TodoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Add test for the create method
  it('should create a todo', () => {
    const todo = {
      title: 'Test todo',
      description: 'Test description',
    };
    expect(controller.create(todo)).toEqual({
      id: 1,
      ...todo,
      isCompleted: false,
    });
  });
});
