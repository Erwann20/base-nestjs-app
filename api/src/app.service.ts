import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return {
      'version': process.env.npm_package_version
    };
  }
}
