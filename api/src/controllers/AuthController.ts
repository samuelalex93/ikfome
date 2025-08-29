import { Controller, Route, Post, Body, Tags } from "tsoa";
import { AuthService } from "../services/AuthService";
import { LoginDto, TokenResponse } from "../types/AuthTypes";
@Route("login")
@Tags("Login")
export class AuthController extends Controller {
  private authService: AuthService;

  constructor() {
    super();
    this.authService = new AuthService();
  }

  @Post()
  public async login(@Body() body: LoginDto): Promise<TokenResponse> {
    const {email, password} = body
    const result = await this.authService.login(email, password);
    return result;
  }
}
