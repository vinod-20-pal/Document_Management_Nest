import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService,
    private readonly authService: AuthService
  ){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    let token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    const isBlacklisted = await this.authService.isTokenStored(token);
    if (isBlacklisted) {
      throw new UnauthorizedException('Token has been revoked');
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: "CODINGNINJAS",
      });
      request.user = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
