import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RoleGuardGuard implements CanActivate {
    constructor(private readonly reflector: Reflector,
      private jwtService: JwtService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      let token = this.extractTokenFromHeader(request);

      if (!token) {
        throw new UnauthorizedException();
      }
      const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
      if (!requiredRoles) {
        return true; // No roles required for this route
      }
      try{
        const payload = await this.jwtService.verifyAsync(token, {
          secret: "CODINGNINJAS",
        });
        request.user = payload;
        if (!request.user || !requiredRoles.includes(request.user.role)) {
          throw new ForbiddenException('You do not have permission to perform this action');
        }
        return true;
      }catch {
        throw new UnauthorizedException();
      }
    }
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers['authorization']?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
}
