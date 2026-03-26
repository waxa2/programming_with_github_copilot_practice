import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { QueryFailedError } from 'typeorm';
import { FindOneUserDto } from './dto/find-one-user.dto';

describe('UserService', () => {
  let service: UserService;
  let userRepository: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<any>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should throw BadRequestException', async () => {
      await expect(service.create(null)).rejects.toThrow(BadRequestException);
    });

    it('should create a new user and return it', async () => {
      const createUserDto = {
        username: 'tester',
        password: 'Password123!',
      };

      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(
        createUserDto.password,
        saltOrRounds,
      );

      const newUser: User = {
        username: createUserDto.username,
        password: hashedPassword,
      };

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
      jest.spyOn(userRepository, 'save').mockResolvedValue(newUser);

      const result = await service.create(createUserDto);

      expect(result).toEqual(newUser);
    });

    it('should throw BadRequestException when save method throws QueryFailedError with SQLITE_CONSTRAINT message', async () => {
      const createUserDto = {
        username: 'tester',
        password: 'Password123!',
      };

      jest
        .spyOn(userRepository, 'save')
        .mockRejectedValue(
          new QueryFailedError(
            'SQLITE_CONSTRAINT',
            [],
            new BadRequestException('SQLITE_CONSTRAINT'),
          ),
        );

      await expect(service.create(createUserDto)).rejects.toThrow(
        new BadRequestException('Bad Request: Duplicate entry'),
      );
    });

    it('should throw the original error when save method throws an error other than QueryFailedError', async () => {
      const createUserDto = {
        username: 'tester',
        password: 'Password123!',
      };

      const error = new Error('Some error');
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
      jest.spyOn(userRepository, 'save').mockRejectedValue(error);

      await expect(service.create(createUserDto)).rejects.toThrow(error);
    });
  });

  describe('findOne', () => {
    it('should find a user by id', async () => {
      // Arrange
      const query = { id: 1 } as any;
      const expectedUser = { id: 1, username: 'testuser' };
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(expectedUser);

      // Act
      const result = await service.findOne(query);

      // Assert
      expect(result).toEqual(expectedUser);
      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should find a user by username', async () => {
      // Arrange
      const query = { username: 'testuser' } as any;
      const expectedUser = { id: 1, username: 'testuser' };
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(expectedUser);

      // Act
      const result = await service.findOne(query);

      // Assert
      expect(result).toEqual(expectedUser);
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { username: 'testuser' },
      });
    });

    it('should throw BadRequestException when query parameter is null', async () => {
      // Arrange
      const query = null as FindOneUserDto;

      // Act
      try {
        await service.findOne(query);
      } catch (error) {
        // Assert
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toEqual('Missing parameter');
      }
    });

    it('should throw BadRequestException when query parameter is missing', async () => {
      // Arrange
      const query = {} as FindOneUserDto;

      // Act
      try {
        await service.findOne(query);
      } catch (error) {
        // Assert
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toEqual('Missing parameter');
      }
    });
  });
});
