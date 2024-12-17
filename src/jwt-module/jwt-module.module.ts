import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { JwtModule, JwtService } from "@nestjs/jwt"
import { PassportModule } from "@nestjs/passport"
import { TypeOrmModule } from "@nestjs/typeorm"

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }),
        PassportModule.register({ defaultStrategy: 'jwt' }),  
        JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (config: ConfigService) => {
          return {
            secret: config.get<string>('JWT_SECRET'),
            signOptions: { expiresIn: '1h' },
          }
        }
      })
    ],
      providers: [JwtService],
      controllers: [],
      exports: [JwtModule]
})
export class JwtModuleModule {}
