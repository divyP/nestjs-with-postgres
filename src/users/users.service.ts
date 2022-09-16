import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  create(createUserDto: CreateUserDto): Promise<User> {
    const user: User = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    return this.repository.save(user);
  }

  findAll() {
    return this.repository.find({
      order: {
        id: 'DESC',
      },
    });
  }

  findOne(id: number): Promise<User> {
    return this.repository.findOne({
      where: { id },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    const { name, email } = updateUserDto;
    const updatedAt = new Date();
    return this.repository.update({ id }, { name, email, updatedAt });
  }

  remove(id: number) {
    this.repository.delete(id);
    return `Delete successful`;
  }
}
