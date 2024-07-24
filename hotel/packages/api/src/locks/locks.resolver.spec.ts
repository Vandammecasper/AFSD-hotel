import { Test, TestingModule } from '@nestjs/testing';
import { LocksResolver } from './locks.resolver';
import { LocksService } from './locks.service';

describe('LocksResolver', () => {
  let resolver: LocksResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocksResolver, LocksService],
    }).compile();

    resolver = module.get<LocksResolver>(LocksResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
