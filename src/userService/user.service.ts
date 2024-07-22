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

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User | undefined> {
    return this.userRepository.findOneBy({ id });
  }

  create(user: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async update(id: number, user: Partial<User>): Promise<User | undefined> {
    await this.userRepository.update(id, user);
    return this.userRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async login(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email, password } });
    return user || null;
  }
  //check login api
  @Post('/login')
  async login(@Body() loginDto: { email: string, password: string }, @Res() res: Response): Promise<void> {
    const user = await this.userService.login(loginDto.email, loginDto.password);
    if (user) {
      res.status(HttpStatus.OK).json(user);
    } else {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }
}
