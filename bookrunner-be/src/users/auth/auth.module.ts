import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/database/database.module';
import { UsersModule } from 'src/users/users.module'; // ✅ Import UsersModule
import { authProvider } from 'src/provider/auth.provider';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: "burhburhlmao",
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [...authProvider, AuthService],
  exports: [AuthService],
})
export class AuthModule { }
