import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findById(id: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });
        
        if (!user) {
            throw new NotFoundException('User with this id was not found.')
        }

        return user
    }

    async create(data: CreateUserInput): Promise<User> {
        const user = this.userRepository.create(data);
        const userSaved = await this.userRepository.save(user);

        if (!userSaved) {
            throw new InternalServerErrorException('Error when creating a user.')
        }
        
        return userSaved;
    }

    async update(id: string, data: UpdateUserInput): Promise<User> {
        const user = await this.findById(id);

        await this.userRepository.update(user, data);

        return this.userRepository.create({ ...user, ...data });
    }
}
