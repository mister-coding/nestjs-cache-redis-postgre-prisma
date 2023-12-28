import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CacheService } from './libs/cache/cache.service';


@Injectable()
export class AppService {

  constructor(private cache: CacheService) { }

  private db = new PrismaClient();

  getHello(): string {
    return 'Hello World!';
  }


  async getUsers() {
    const key = 'users';
    if (await this.cache.getCache(key)) {
      return await this.cache.getCache(key)
    }
    const users = await this.db.user.findMany();
    if(users){
      await this.cache.setCache(key, users, 10000);
    }
    return users;
  }

}
