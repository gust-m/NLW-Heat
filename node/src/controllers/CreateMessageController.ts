import { Request, Response } from 'express'; 
import { CreateMessageService } from "../services/CreateMessageService";

export class CreateMessageController {
  public async handle(request: Request, response: Response) {

    const { message }: { message: string } = request.body;
    const { user_id } = request;

    const createMessage = new CreateMessageService();
    const result = await createMessage.execute(message, user_id);

    return response.json(result);
  }
}