import { Request } from 'express';
import { JwtPayload } from './jwt-payload.dto.js';

export interface RequestWithUser extends Request {
  user: JwtPayload;
}
