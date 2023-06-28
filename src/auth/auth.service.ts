import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async register(
    email: string,
    fullName: string,
    password: string,
  ): Promise<any> {
    try {
      const user = await this.usersService.findByEmail(email);

      if (user) {
        return null;
      }

      const newUser = await this.usersService.create({
        email,
        fullName,
        password,
      });

      return { token: this.jwtService.sign({ id: newUser.id }) };
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Something went wrong');
    }
  }

  async login(user: UserEntity) {
    return {
      token: this.jwtService.sign({ id: user.id }),
    };
  }
}
