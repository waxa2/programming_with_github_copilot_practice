import { BadRequestException } from '@nestjs/common';

export class ValidationUtil {
  static validatePassword(password: string): void {
    if (!password) {
      throw new BadRequestException('Password is required');
    }
    if (password.length < 6) {
      throw new BadRequestException('Password must be at least 6 characters long');
    }
    if (password.length > 20) {
      throw new BadRequestException('Password cannot exceed 20 characters');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      throw new BadRequestException('Password must contain at least one special character');
    }
    if (!/\d/.test(password)) {
      throw new BadRequestException('Password must contain at least one number');
    }
    if (!/[A-Z]/.test(password)) {
      throw new BadRequestException('Password must contain at least one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
      throw new BadRequestException('Password must contain at least one lowercase letter');
    }
  }

  static validateUsername(username: string): void {
    if (!username) {
      throw new BadRequestException('Username is required');
    }
    if (username.length < 3) {
      throw new BadRequestException('Username must be at least 3 characters long');
    }
    if (username.length > 20) {
      throw new BadRequestException('Username cannot exceed 20 characters');
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      throw new BadRequestException('Username can only contain letters, numbers, and underscores');
    }
  }
}