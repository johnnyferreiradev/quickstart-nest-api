import { TokenPayload } from '../dtos/token-payload.dto';

export interface JwtRepository {
  generateAccessToken(tokenPayload: TokenPayload): Promise<string>;
  generateRefreshToken(tokenPayload: TokenPayload): Promise<string>;
  validateAccessToken(token: string): Promise<boolean>;
  decodeRefreshToken(oldToken: string): Promise<TokenPayload>;
}
