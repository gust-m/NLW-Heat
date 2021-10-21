import { Request, Response } from 'express'; 
import { GetLastThreeMessagesService } from "../services/GetLastThreeMessagesService";

export class GetLastThreeMessagesController {
  public async handle(request: Request, response: Response) {
    const getMessage = new GetLastThreeMessagesService();

    const result = await getMessage.execute();

    return response.json(result);
  }
}