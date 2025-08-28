import { User } from "@prisma/client";

export type SafeUser = Omit<User, "password">;

export type UserType = User;

export interface UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
} 

export type CreateUserDto = {
  name: string;
  email: string;
  password: string;
};