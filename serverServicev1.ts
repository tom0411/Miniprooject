import { Client } from "pg";

export class ServerService {
  constructor(private client: Client) {}

  async getItems() {
    const result = await this.client.query("SELECT * FROM item");
    return result.rows;
  }
}
