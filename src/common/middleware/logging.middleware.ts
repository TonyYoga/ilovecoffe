import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.time('Reqyest-responce time');
    console.log('Middleware there...');
    res.on('finish', () => console.timeEnd('Reqyest-responce time'));
    next();
  }
}
