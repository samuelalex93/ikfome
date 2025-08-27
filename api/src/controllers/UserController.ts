import { Controller, Get, Route, Tags, Post, Body, Path } from "tsoa";
import { User } from "@prisma/client";

import { UserService } from "../services/UserService";

@Route("users")
@Tags("Users")
export class UserController extends Controller {
  private userService: UserService;

  constructor() {
    super();
    this.userService = new UserService();
  }

  @Get("{id}")
  public async getUser(@Path() id: string): Promise<User | null> {
    return this.userService.getUserById(id);
  }

  @Post("register")
  public async register(
    @Body() body: { name: string; email: string; password: string }
  ): Promise<User> {
    // gerar hash da senha
    const passwordHash = "hash_fake_" + body.password; 
    return this.userService.registerUser(body.name, body.email, passwordHash);
  }

  @Get()
  public async listUsers(): Promise<User[]> {
    return this.userService.listUsers();
  }
}
