import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Repository } from 'typeorm';
import { Role, User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}
  
  findAll() {
    return this.usersRepository.find();
  }
  
  findOne(id: string) {
    //@ts-ignore
    return this.usersRepository.findOne({_id: id});
  }

  findOneByUid(uid: string) {
    return this.usersRepository.findOneByOrFail({uid});
  }

  findOneByEmail(email: string) {
    return this.usersRepository.findOneByOrFail({email});
  }
  
  async create(createUserInput: CreateUserInput) {
    const user = new User();
    user.userName = createUserInput.userName;
    user.email = createUserInput.email;
    user.uid = createUserInput.uid;
    if(createUserInput.role === 'ADMIN') {
      user.role = Role.ADMIN;
    } else if (createUserInput.role === 'USER') {
      user.role = Role.USER;
    }

    const createdUser = await this.usersRepository.save(user);

    return createdUser;
  }

  updateRole(id: string, role: Role) {
    return this.usersRepository.update(new ObjectId(id), {role});
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }

  // functions for seeding

  async saveAll(users: User[]): Promise<User[]> {
    return this.usersRepository.save(users);
  }

  async deleteAll(): Promise<void> {
    return this.usersRepository.clear();
  }
}
