import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { userDto } from './dto/user.dto';
import { users } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { userSchema } from 'src/helper/schema.validation';
import { messageEnum } from 'src/helper/enumMessages';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(users)
    private userRepository: Repository<users>,
  ) {}

  /*
   * Create User Account
   * @req Users Details
   */
  async create(createUserDto: CreateUserDto) {
    try {
      const { username, email } = createUserDto;
      const userName = { username: username };
      const userEmail = { email: email };
      const [usernameExist, emailExist] = await Promise.all([
        this.findExistingUser(userName),
        this.findExistingUser(userEmail),
      ]);
      if (usernameExist && emailExist) {
        return { message: 'username and email already exist' };
      }
      if (usernameExist) {
        return { message: messageEnum.USER_ALREADY_EXIST };
      }
      if (emailExist) {
        return { message: messageEnum.EMAIL_ALREADY_EXIST };
      }
      const userInsert = this.userRepository.create(createUserDto);
      const saveUser = await this.userRepository.save(userInsert);
      return saveUser;
    } catch (error) {
      return error;
    }
  }

  /*
   *  User Authentication
   * @req users Credentials
   */
  async login(userCredentials: any) {
    try {
      const { username, password } = userCredentials;
      const isUserExist = await this.findExistingUser({ username: username });
      if (!isUserExist) {
        return { message: 'User not exist' };
      }
      if (password != isUserExist.password) {
        return { message: 'Wrong Password' };
      }
      return { message: 'login successful' };
    } catch (error) {
      return error;
    }
  }

  /*
   *  Forget password
   * @param id
   * @req {Current Password, new Password, confirm password}
   */

  async resetPassword(userDetails: userDto, id: string) {
    try {
      const { currentPassword, newPassword, confirmPassword } = userDetails;
      const isUserExist = await this.userRepository.findOneById(id);
      if (!isUserExist || isUserExist.isDeleted === true) {
        return { message: 'User not exist' };
      }
      if (newPassword != confirmPassword) {
        return { message: 'Password are not Matched' };
      }
      if (isUserExist.password != currentPassword) {
        return { message: 'Wrong Password' };
      }
      const updatePassword = { password: newPassword };
      const changePassword = await this.userRepository.update(
        id,
        updatePassword,
      );
      return { message: 'password changed' };
    } catch (error) {
      return error;
    }
  }

  /*
   * Fetch all users and their details
   */

  async findAll() {
    try {
      return await this.userRepository.find({ where: { isDeleted: false } });
    } catch (error) {
      return error.detail;
    }
  }

  /*
   * Fetch One user and their details
   * @param: Id
   */
  async findOne(id: string) {
    try {
      const userFind = await this.userRepository.findOneById(id);
      const user = userFind.isDeleted === true ? 'user not exist' : userFind;
      return user;
    } catch (error) {
      return error.detail;
    }
  }

  /*
   * Update user
   * @param: Id
   */
  update(id: string, updateUserDto: userDto) {
    try {
      const userUpdate = this.userRepository.update(id, updateUserDto);
      return userUpdate;
    } catch (error) {
      return error.detail;
    }
  }

  /*
   * remove user
   * @param: Id
   */
  remove(id: string) {
    try {
      const userUpdate = this.userRepository.update(id, { isDeleted: true });
      return userUpdate;
    } catch (error) {
      return error.detail;
    }
  }

  // find Existing user by attributes

  async findExistingUser(attribute: any) {
    try {
      if (attribute.username) {
        const qr = await this.userRepository
          .createQueryBuilder('user')
          .where('user.username = :name', {
            name: attribute.username,
          })
          .getOne();
        return qr;
      }
      if (attribute.email) {
        const qr = await this.userRepository
          .createQueryBuilder('email')
          .where('email.email = :name', {
            name: attribute.email,
          })
          .getOne();
        return qr;
      }
    } catch (error) {}
  }
}
//      .leftJoinAndSelect('user.addresses', 'address')
