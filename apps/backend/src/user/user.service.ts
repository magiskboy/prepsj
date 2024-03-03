import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { IGoogleUserInfo } from 'src/auth/types';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createGogoleUser(data: IGoogleUserInfo): Promise<User> {
    const user = this.userRepository.create({
      id: uuidv4(),
      googleId: data.id,
      email: data.email,
      fullname: data.name,
      locale: data.locale,
      isVerified: data.verified_email,
      profileURL: data.picture,
    });
    await this.userRepository.save(user);
    return user;
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    return user;
  }
}
