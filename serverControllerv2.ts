import { Request, Response } from 'express';
import { ServerService } from './serverServicev1'; // Assuming this is the path to your ServerService

export class ServerController {


  constructor(private serverService: ServerService) {
    
  }

  getitem = async (req: Request, res: Response) => {
    try {
      const result = await this.serverService.getItems();
      res.json(result);
    } catch (e) {   
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}


