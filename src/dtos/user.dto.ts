import { IUser } from "../entitites/user.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsEmail, IsString } from "class-validator";

export class CreateUserDto implements IUser {
  @IsEmail()
  @ApiProperty()
  email: string;
  @IsString()
  @ApiProperty()
  name: string;
  @IsString()
  @ApiProperty()
  password: string;
  @IsString()
  @ApiProperty()
  surname: string;
}
export interface ILoginUser {
  password: string;
  email: string;
}
export class LoginUserDto {
  @ApiProperty()
  password: string;
  @ApiProperty()
  email: string;
}
export class LoginResponse {
  @ApiProperty({
    description:
      "Полученный токен дальше нужно вставлять в хедер Authorization:Bearer ACCESS_TOKEN",
  })
  accessToken: string;
}
export class ConfirmEmailDto {
  @ApiProperty()
  code: number;
}

@Exclude()
export class UserResponse implements IUser {
  @Expose()
  @ApiProperty()
  id: string;
  @Expose()
  @ApiProperty()
  email: string;
  @Expose()
  @ApiProperty()
  name: string;
  @Expose()
  @ApiProperty()
  password: string;
  @Expose()
  @ApiProperty()
  surname: string;
  constructor(partial: Partial<any>) {
    Object.assign(this, partial);
  }
}
