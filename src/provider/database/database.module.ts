import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
          useFactory: () => ({
            type: 'postgres',
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT) || 5432,
            username: process.env.DB_USER || 'postgres',
            password: process.env.DB_PASSWORD || 'postgres',
            database: process.env.DB_NAME || 'user_management',
            autoLoadEntities: true,  // It scans for all classes decorated with @Entity and include them in database schema
            synchronize: true, // when its true it will automatically update database schema match with entity classes on every application launch  
          }),
        }),
      ],                                                                                                            
      exports: [TypeOrmModule],
})
export class DatabaseModule {}
