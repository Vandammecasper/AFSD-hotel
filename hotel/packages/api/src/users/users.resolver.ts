import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { Role, User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { FirebaseGuard } from 'src/authentication/guards/firebase.guard';
import { UserRecord } from 'firebase-admin/auth';
import { FirebaseUser } from 'src/authentication/user.decorator';
import { AllowedRoles } from './decorators/role.decorator';
import { RolesGuard } from './guards/roles.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  // @UseGuards(FirebaseGuard)
  @Mutation(() => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
    // @FirebaseUser() user: UserRecord
    ) {
    return this.usersService.create(createUserInput);
  }

  @AllowedRoles(Role.ADMIN, Role.SUPER_ADMIN)
  @UseGuards(FirebaseGuard, RolesGuard)
  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.usersService.findOne(id);
  }

  @Query(() => User, { name: 'userByUid' })
  findOneByUid(@Args('uid', { type: () => String }) uid: string) {
    return this.usersService.findOneByUid(uid);
  }

  @Query(() => User, { name: 'userByEmail' })
  findOneByEmail(@Args('email', { type: () => String }) email: string) {
    return this.usersService.findOneByEmail(email);
  }

  @Mutation(() => User)
  updateRole(
    @Args('id', { type: () => String }) id: string,
    @Args('role', { type: () => String }) role: Role
  ) {
    return this.usersService.updateRole(id, role);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => String }) id: string) {
    return this.usersService.remove(id);
  }
}
