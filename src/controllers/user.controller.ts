import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { CreateUserDto } from "../dtos/user.dto";
import { UserService } from "../services/user.service";
import { LocalAuthGuard } from "../auth/local-auth.guard";
import { AuthService } from "../auth/auth.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { LoginDto } from "../dtos/login.dto";
import { AccessRefreshResponse } from "../dtos/accessToken.dto";

@ApiTags("User")
@Controller("/user")
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private usrServ: UserService, private authService: AuthService) {}

  @Post("/register")
  @HttpCode(201)
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ description: "Error Email is already taken", status: 409 })
  @ApiResponse({ type: AccessRefreshResponse })
  @ApiResponse({ status: 400, description: "JSON input data is wrong" })
  async registerUser(@Body() body: CreateUserDto) {
    return this.usrServ.register(body);
  }

  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginDto })
  @ApiResponse({ type: AccessRefreshResponse })
  @Post("/login")
  async loginUser(@Req() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/whoiam")
  @HttpCode(200)
  @ApiBearerAuth()
  async whoIam(@Req() { user }) {
    return this.usrServ.whoiam(user.email);
  }
}
