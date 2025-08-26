import { Controller, Route, Post, Body } from "tsoa";

interface RegisterBody {
  name: string;
  email: string;
  password: string;
}

interface LoginBody {
  email: string;
  password: string;
}

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

interface RefreshBody {
  refreshToken: string;
}

@Route("auth")
export class AuthController extends Controller {

  @Post("register")
  public async register(@Body() body: RegisterBody): Promise<{ message: string }> {
    return { message: `User ${body.name} registered successfully (mock)` };
  }

  @Post("login")
  public async login(@Body() body: LoginBody): Promise<TokenResponse> {
    return {
      accessToken: "mockAccessToken123",
      refreshToken: "mockRefreshToken456"
    };
  }

  @Post("refresh")
  public async refresh(@Body() body: RefreshBody): Promise<TokenResponse> {
    return {
      accessToken: "newMockAccessToken789",
      refreshToken: body.refreshToken
    };
  }
}
