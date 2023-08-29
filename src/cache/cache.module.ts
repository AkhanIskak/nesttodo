import { CacheService } from './cache.service';
import { Module } from '@nestjs/common';
import { CacheModule as Cache } from '@nestjs/cache-manager';
@Module({
  imports: [Cache.register()],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
