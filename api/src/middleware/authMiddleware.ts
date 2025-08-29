import { Request } from "express";
import { validateJwt, DecodedToken } from "../utils/jtw";
import { InvalidPasswordError } from "../errors/CustomError";

export async function expressAuthentication(
  request: Request,
  securityName: string,
  _scopes?: string[]
): Promise<DecodedToken> {
  if (securityName === "jwt") {
    const authHeader = request.headers["authorization"];
    if (!authHeader) {
      throw new InvalidPasswordError("Missing Authorization header");
    }

    const token = authHeader.split(" ")[1]; 
    if (!token) {
      throw new InvalidPasswordError("Invalid Authorization header format");
    }

    return validateJwt(token);
  }

  throw new Error("Unsupported security type");
}

