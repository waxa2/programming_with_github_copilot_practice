import { TodoService } from './todo.service';

describe('TodoService', () => {
  let todoService: TodoService;

  beforeEach(() => {
    todoService = new TodoService();
  });

  describe('create', () => {
    it('should create a new todo', () => {
      const createTodoDto = {
        title: 'Test Todo',
        description: 'This is a test todo',
      };

      const result = todoService.create(createTodoDto);

      expect(result.id).toBeDefined();
      expect(result.title).toBe(createTodoDto.title);
      expect(result.description).toBe(createTodoDto.description);
      expect(result.isCompleted).toBe(false);
    });
  });

  describe('findAll', () => {
    it('should return all todos', () => {
      const result = todoService.findAll();

      expect(result).toBe('This action returns all todo');
    });
  });

  describe('findOne', () => {
    it('should return a specific todo', () => {
      const id = 1;

      const result = todoService.findOne(id);

      expect(result).toBe(`This action returns a #${id} todo`);
    });
  });

  describe('update', () => {
    it('should update a specific todo', () => {
      const id = 1;
      const updateTodoDto = {
        title: 'Updated Todo',
        description: 'This is an updated todo',
      };

      const result = todoService.update(id, updateTodoDto);

      expect(result).toBe(`This action updates a #${id} todo`);
    });
  });

  describe('remove', () => {
    it('should remove a specific todo', () => {
      const id = 1;

      const result = todoService.remove(id);

      expect(result).toBe(`This action removes a #${id} todo`);
    });
  });
});
