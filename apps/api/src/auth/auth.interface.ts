import { User } from '../entities/user.entity';
import { UserDetails } from '../utils/types';

export interface IAuthService {
  validateUser(details: UserDetails): Promise<User>;
}
