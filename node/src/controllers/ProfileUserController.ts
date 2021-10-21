import { Request, Response } from 'express'; 
import { ProfileUserService } from '../services/ProfileUserService';

export class ProfileUserController {
  public async handle(request: Request, response: Response) {
    const { user_id } = request;

    const profileUserService = new ProfileUserService();

    const result = await profileUserService.execute(user_id);

    return response.json(result);
  }
}