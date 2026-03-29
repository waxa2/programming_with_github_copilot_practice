import { BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import 'jest';

describe('create', () => {
	let userService: UserService;
	let userRepository: Repository<User>;

	beforeEach(() => {
		userRepository = {
			findOne: jest.fn(),
			save: jest.fn(),
		userService = new UserService(userRepository as Repository<User>);
		userService = new UserService(userRepository);
	});

	it('should create a user successfully', async () => {
		const createUserDto = {
			username: 'testUser',
			password: 'Password1!',
		};
		const savedUser = {
			id: 1,
			username: 'testUser',
			password: 'hashedPassword',
		};

		jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
		jest.spyOn(userRepository, 'save').mockResolvedValue(savedUser);
		jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword');

		const result = await userService.create(createUserDto);

		expect(result).toEqual(savedUser);
		expect(userRepository.findOne).toHaveBeenCalledWith({
			where: { username: createUserDto.username },
		});
		expect(bcrypt.hash).toHaveBeenCalledWith(createUserDto.password, 10);
		expect(userRepository.save).toHaveBeenCalledWith({
			username: createUserDto.username,
			password: 'hashedPassword',
		});
	});

	it('should throw BadRequestException if username already exists', async () => {
		const createUserDto = {
			username: 'existingUser',
			password: 'Password1!',
		};

		jest.spyOn(userRepository, 'findOne').mockResolvedValue({ id: 1 });

		await expect(userService.create(createUserDto)).rejects.toThrow(
			BadRequestException,
		);
		expect(userRepository.findOne).toHaveBeenCalledWith({
			where: { username: createUserDto.username },
		});
	});

	it('should throw BadRequestException if username is invalid', async () => {
		const createUserDto = {
			username: 'ab',
			password: 'Password1!',
		};

		await expect(userService.create(createUserDto)).rejects.toThrow(
			BadRequestException,
		);
	});

	it('should throw BadRequestException if password is invalid', async () => {
		const createUserDto = {
			username: 'validUser',
			password: 'short',
		};

		await expect(userService.create(createUserDto)).rejects.toThrow(
			BadRequestException,
		);
	});

	it('should throw BadRequestException if username is missing', async () => {
		const createUserDto = {
			username: '',
			password: 'Password1!',
		};

		await expect(userService.create(createUserDto)).rejects.toThrow(
			BadRequestException,
		);
	});

	it('should throw BadRequestException if password is missing', async () => {
		const createUserDto = {
			username: 'validUser',
			password: '',
		};

		await expect(userService.create(createUserDto)).rejects.toThrow(
			BadRequestException,
		);
	});
});