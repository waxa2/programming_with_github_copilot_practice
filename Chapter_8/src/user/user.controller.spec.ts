import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Logger } from '@nestjs/common';
import { User } from './entities/user.entity';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        Logger,
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto = { username: 'JohnDoe', password: 'password123' };
      const createdUser = { id: 1, ...createUserDto };
      jest.spyOn(userService, 'create').mockResolvedValue(createdUser);

      const result = await controller.create(createUserDto);

      expect(userService.create).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual(createdUser);
    });

    it('should throw exception when an error occurs', async () => {
      const createUserDto = { username: 'JohnDoe', password: 'password123' };
      const error = new Error('Invalid input');
      jest.spyOn(userService, 'create').mockRejectedValue(error);

      const errorSpy = jest.spyOn(controller.logger, 'error');

      await expect(controller.create(createUserDto)).rejects.toThrow();
      expect(errorSpy).toHaveBeenCalledWith(
        `Error creating user: ${error.message}`,
      );
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const users = [
        { id: 1, username: 'JohnDoe' },
        { id: 2, username: 'JaneSmith' },
      ] as User[];
      jest.spyOn(userService, 'findAll').mockResolvedValue(users);

      const result = await controller.findAll();

      expect(userService.findAll).toHaveBeenCalled();
      expect(result).toEqual(users);
    });

    it('should throw exception when an error occurs', async () => {
      const error = new Error('Failed to fetch users');
      jest.spyOn(userService, 'findAll').mockRejectedValue(error);

      const errorSpy = jest.spyOn(controller.logger, 'error');

      await expect(controller.findAll()).rejects.toThrow();
      expect(errorSpy).toHaveBeenCalledWith(
        `Error finding all users: ${error.message}`,
      );
    });
  });

  describe('findOne', () => {
    it('should find a user by ID', async () => {
      // Arrange
      const id = '1';
      const user = { id: 1, username: 'JohnDoe' } as User;
      jest.spyOn(userService, 'findOne').mockResolvedValue(user);

      // Act
      const result = await controller.findOne(id);

      // Assert
      expect(userService.findOne).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual(user);
    });

    it('should throw exception when an error occurs', async () => {
      // Arrange
      const id = '1';
      const error = new Error('Failed to find user');
      jest.spyOn(userService, 'findOne').mockRejectedValue(error);
      const errorSpy = jest.spyOn(controller.logger, 'error');

      // Act & Assert
      await expect(controller.findOne(id)).rejects.toThrow();
      expect(errorSpy).toHaveBeenCalledWith(
        `Error finding user with ID ${id}: ${error.message}`,
      );
    });
  });
});
