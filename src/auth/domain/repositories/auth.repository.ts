import { UserModel } from 'src/user/domain/models/user.model';

export interface AuthRepository {
  signIn(loginDto: { username: string; password: string }): Promise<UserModel>;
}
