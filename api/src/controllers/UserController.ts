import { Controller, Get, Route, Query } from "tsoa";

interface User {
  id: number;
  name: string;
}

@Route("users")
export class UserController extends Controller {

  @Get()
  public async getUsers(@Query() limit?: number): Promise<User[]> {
    return [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" }
    ].slice(0, limit);
  }
}
