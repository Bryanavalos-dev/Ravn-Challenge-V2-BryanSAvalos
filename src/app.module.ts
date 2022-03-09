import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { SystemModule } from './system/system.module';

@Module({
  imports: [AuthModule, ProductsModule, OrdersModule, UsersModule, SystemModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
