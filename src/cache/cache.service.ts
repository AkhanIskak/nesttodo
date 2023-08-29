import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
export interface IUnconfirmedEmail {
  codeCreated: number;
  attempts: number;
  code: number;
}
@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  async setEmailConfirmCode(email: string, code: number): Promise<void> {
    const jsonStr = JSON.stringify({
      codeCreated: Date.now() / 1000,
      attempts: 0,
      code,
    });
    await this.cacheManager.set(email, jsonStr, 3600 * 100);
  }
  async addAttempt(email: string): Promise<void> {
    const data: IUnconfirmedEmail = JSON.parse(
      await this.cacheManager.get(email),
    );
    const jsonStr = JSON.stringify({
      codeCreated: data.codeCreated,
      attempts: data.attempts + 1,
      code: data.code,
    });
    await this.cacheManager.set(email, jsonStr, 3600 * 1000);
  }
  async getUnconfirmedEmail(email: string): Promise<IUnconfirmedEmail> {
    const data = await this.cacheManager.get(email);
    return JSON.parse(<string>data);
  }
  get(key: string) {
    return this.cacheManager.get(key);
  }

  async del(key: string) {
    await this.cacheManager.del(key);
  }
}
