import { Module } from '@nestjs/common';
import { ArenaGateway } from './arena/arena.gateway';

@Module({
  providers: [ArenaGateway]
})
export class GatewayModule {}
