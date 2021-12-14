import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) {
    if (createUserDto.firstName && createUserDto.lastName && createUserDto.email && createUserDto.password) {
        const user = User.create(createUserDto);
        await user.save();
        delete user.password;
        return user;

    } else {
      return JSON.stringify(createUserDto) + 'is not a valid user.'
    }
  }

  findAll() {
    return User.find();
  }

  async findOne(id: number) {
    const user = await User.findOne(id);
    delete user.password;
    return user;
  }

  findByEmail(email: string) {
    return User.findOne({
      where: {
        email: email
      }
    })
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const {email, password, firstName, lastName} = updateUserDto;
    const user = await User.findOne(id)

    user.email = email;
    user.password = password
    user.firstName = firstName;
    user.lastName = lastName;

    await user.save()

    return user;
  }

  async remove(id: number) {
    const user = await User.findOne(id)
    return User.remove(user);
  }
}
