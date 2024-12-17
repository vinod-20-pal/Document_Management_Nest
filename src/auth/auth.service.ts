import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register-auth.dto';
import { LoginDto } from './dto/login-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from './entities/auth.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { StoreToken } from './entities/storeToken.entity';
import { request } from 'http';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService : JwtService,
  @InjectRepository(Auth)
  private readonly authRepository: Repository<Auth>,
  @InjectRepository(StoreToken)
  private readonly tokenRepository: Repository<StoreToken>){}

  async register(registerAuthDto: RegisterDto) {
    const { email, password, role} = registerAuthDto;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // create user
    const user = this.authRepository.create({...registerAuthDto, password: hashedPassword});
    console.log("user data established",user);
    return this.authRepository.save(user);
  }

  async login(loginAuthDto: LoginDto): Promise<any> {
    const { email, password } = loginAuthDto;
  
    // Find user by email
    const user = await this.authRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
  
    // Compare the hashed password
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }
  
    // Generate JWT token with minimal payload
    const payload = { id: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload,{ secret: `CODINGNINJAS`});
    // Return sanitized user data and token
    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      status: 200,
    };
  }
  

  async logout(token:any) {
    const storeToken = this.tokenRepository.create({ token });
    await this.tokenRepository.save(storeToken);

    return {
      message: 'Successfully logged out',
      status: 200,
    };
  }

  async isTokenStored(token: string): Promise<boolean> {
    const storeToken = await this.tokenRepository.findOne({ where: { token } });
    return !!storeToken;
  }
}
