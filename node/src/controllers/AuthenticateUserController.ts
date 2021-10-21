import { Request, Response } from 'express'; 
import { AuthenticateUserService } from "../services/AuthenticateUserService";

export class AuthenticateUserController {
  public async handle(request: Request, response: Response) {
    const { code }: {code: string} = request.body;

    try {
      const authenticateUserService = new AuthenticateUserService();
      const result = await authenticateUserService.execute(code);
      
      return response.json(result);
    } catch (err: any) {
      return response.json({ error: err.message });
    }


  }
}