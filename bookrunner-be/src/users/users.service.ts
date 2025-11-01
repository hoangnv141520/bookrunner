import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) { }

  async getAllUsers() {
    return await this.userRepository.find({ relations: ['role', 'cartDetail', 'novels', 'novelVotes', 'bookVotes', 'payment'] });
  }

  async getUsers() {
    return await this.userRepository.find();
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['role', 'cartDetail', 'novels', 'novelVotes', 'bookVotes', 'payment', 'novels.chapters', 'novels.author', 'novels.categories', 'novels.artist'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    
    await this.userRepository.update(id, updateUserDto);  
    return this.getUserById(id);
  }

  async delete(id: number) {
    const user = await this.getUserById(id);
    return await this.userRepository.remove(user);
  }

  async updateUserImage(username: string, imageUrl: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.image = imageUrl;
    await this.userRepository.save(user);
  }
}
