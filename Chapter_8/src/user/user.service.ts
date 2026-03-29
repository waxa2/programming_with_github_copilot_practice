import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, QueryFailedError, Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { FindOneUserDto } from './dto/find-one-user.dto';

@Injectable()
/**
 * Service responsible for managing user-related operations.
 * Provides methods for creating, retrieving, updating, and deleting users,
 * as well as validating user input such as usernames and passwords.
 */
export class UserService {
  constructor(
	@InjectRepository(User)
	private userRepository: Repository<User>,
  ) {}

  /**
   * Creates a new user with the provided data.
   * Validates the username and password before saving the user.
   *
   * @param param - The data required to create a new user.
   * @returns A promise that resolves to the created user.
   * @throws BadRequestException if the input data is invalid or if there is a duplicate entry.
   */
  async create(param: CreateUserDto): Promise<User> {
	if (!param) {
	  throw new BadRequestException('Missing parameter');
	}

	const { username, password } = param;
	await this.validateUsername(username);

	// validate password
	this.validatePassword(password);

	const saltRounds = 10;
	const hashedPassword = await bcrypt.hash(password, saltRounds);

	const newUser: User = {
	  username,
	  password: hashedPassword,
	};

	try {
	  return await this.userRepository.save(newUser);
	} catch (error) {
	  if (
		error instanceof QueryFailedError &&
		error.message.includes('SQLITE_CONSTRAINT')
	  ) {
		throw new BadRequestException('Bad Request: Duplicate entry');
	  }
	  throw error;
	}
  }

  async findAll(): Promise<User[]> {
	return await this.userRepository.find();
  }

  async findOne(query: FindOneUserDto): Promise<User> {
	if (!query) {
	  throw new BadRequestException('Missing parameter');
	}

	const { id, username } = query;
	if (id) {
	  return await this.userRepository.findOne({ where: { id } });
	}
	if (username) {
	  return await this.userRepository.findOne({ where: { username } });
	}

	throw new BadRequestException('Missing parameter');
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
	const user = await this.userRepository.findOne({ where: { id } });
	if (!user) {
	  throw new BadRequestException('User not found');
	}
	const { username, password } = updateUserDto;

	// update user
	if (username) {
	  user.username = username;
	}
	if (password) {
	  const saltRounds = 10;
	  const hashedPassword = await bcrypt.hash(password, saltRounds);
	  user.password = hashedPassword;
	}
	try {
	  return await this.userRepository.save(user);
	} catch (error) {
	  throw error;
	}
  }

  async remove(id: number): Promise<DeleteResult> {
	return await this.userRepository.delete(id);
  }

  private validatePassword(password: string) {
	if (!password) {
	  throw new BadRequestException('Password is required');
	}
	if (password.length < 6) {
	  throw new BadRequestException(
		'Password must be at least 6 characters long'
	  );
	}
	if (password.length > 20) {
	  throw new BadRequestException('Password cannot exceed 20 characters');
	}
	if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
	  throw new BadRequestException(
		'Password must contain at least one special character'
	  );
	}
	if (!/\d/.test(password)) {
	  throw new BadRequestException(
		'Password must contain at least one number'
	  );
	}
	if (!/[A-Z]/.test(password)) {
	  throw new BadRequestException(
		'Password must contain at least one uppercase letter'
	  );
	}
	if (!/[a-z]/.test(password)) {
	  throw new BadRequestException(
		'Password must contain at least one lowercase letter'
	  );
	}
  }

  private async validateUsernameFormat(username: string) {
	if (!username) {
	  throw new BadRequestException('Username is required');
	}
	if (username.length < 3) {
	  throw new BadRequestException(
		'Username must be at least 3 characters long'
	  );
	}
	if (username.length > 20) {
	  throw new BadRequestException('Username cannot exceed 20 characters');
	}
	if (!/^[a-zA-Z0-9_]+$/.test(username)) {
	  throw new BadRequestException(
		'Username can only contain letters, numbers, and underscores'
	  );
	}
	if (await this.userRepository.findOne({ where: { username } })) {
	  throw new BadRequestException('Username already exists');
	}
  }

  private async validateUsername(username: string): Promise<void> {
	await this.validateUsernameFormat(username);
  }
}

