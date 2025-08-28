import { Controller, Get, Route, Tags, Post, Body, Path, Put } from "tsoa";

import { UserService } from "../services/UserService";
import { CreateUserDto, UpdateUserDto, UserType, SafeUser } from "../types/UserTypes";
@Route("users")
@Tags("Users")
export class UserController extends Controller {
  private userService: UserService;

  constructor() {
    super();
    this.userService = new UserService();
  }

  @Get("{id}")
  public async getUser(@Path() id: string): Promise<UserType | null> {
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
  public async listUsers(): Promise<UserType[]> {
    return this.userService.listUsers();
  }
}
