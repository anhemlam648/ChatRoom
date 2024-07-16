import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User | undefined> {
    return await this.userRepository.findOne(id);
  }

  async create(user: Partial<User>): Promise<User> {
    const newUser = await this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }

  async update(id: number, updateUser: Partial<User>): Promise<User | undefined> {
    await this.userRepository.update(id, updateUser);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}