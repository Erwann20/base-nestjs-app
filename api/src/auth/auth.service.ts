import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';

import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  
  constructor(
      private usersService: UsersService, 
      private jwtService: JwtService
  ) {}
  
  async create(createAuthDto: CreateAuthDto) {
    const user = await this.validateUser(createAuthDto);

    const payload = {
      userId: user.id
    }

    return {
      access_token: this.jwtService.sign(payload)
    }
  }
  
  async validateUser(createAuthDto: CreateAuthDto): Promise<User> {
    const {email, password } = createAuthDto;
    
    const user = await  this.usersService.findByEmail(email);

    if (!(await user ?.validatePassword(password))) {
      throw new UnauthorizedException;
    }

    return user
  }
  
}
