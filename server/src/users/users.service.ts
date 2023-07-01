import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  async findByEmail(email: string): Promise<UserEntity> {
    return this.repository.findOneBy({ email });
  }

  async findById(id: number): Promise<UserEntity> {
    return this.repository.findOneBy({ id });
  }

  create(dto: CreateUserDto) {
    return this.repository.save(dto);
  }
}
