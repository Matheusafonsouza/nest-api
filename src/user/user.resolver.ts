import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { UserService } from './user.service';
import { User } from './user.entity';

@Resolver('User')
export class UserResolver {
    constructor (
        private userService: UserService
    ) {}

    @Query(() => [User])
    async users(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Mutation(() => User)
    async createUser(
        @Args('data') data: CreateUserInput
    ): Promise<User> {
        return this.userService.create(data);
    }
}
