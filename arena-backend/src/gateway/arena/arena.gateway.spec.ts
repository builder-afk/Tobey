import { Test, TestingModule } from '@nestjs/testing';
import { ArenaGateway } from './arena.gateway';

describe('ArenaGateway', () => {
  let gateway: ArenaGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArenaGateway],
    }).compile();

    gateway = module.get<ArenaGateway>(ArenaGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
