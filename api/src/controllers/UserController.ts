import { Controller, Get, Route, Tags, Post, Body, Path, Put, Security } from "tsoa";

import { UserService } from "../services/UserService";
import { CreateUserDto, UpdateUserDto, SafeUser } from "../types/UserTypes";
@Route("users")
@Tags("Users")
@Security("jwt")
export class UserController extends Controller {
  private userService: UserService;

  constructor() {
    super();
    this.userService = new UserService();
  }

  @Get("{id}")
  public async getUser(@Path() id: string): Promise<SafeUser | null> {
    return this.userService.getUserById(id);
  }

  @Post("register")
  public async register(
    @Body() body: CreateUserDto
  ): Promise<SafeUser> {
    return this.userService.registerUser(body.name, body.email, body.password);
  }

  @Put("{id}")
  async updateUser(
    @Path() id: string,
    @Body() data: UpdateUserDto
  ): Promise<SafeUser> {
    return this.userService.updateUser(id, data)
  }

  @Get()
  public async listUsers(): Promise<SafeUser[]> {
    return this.userService.listUsers();
  }
}
