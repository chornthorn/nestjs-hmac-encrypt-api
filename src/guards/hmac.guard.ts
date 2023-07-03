import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class HmacGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // get the data and HMAC hash from the request body
    const data = request.body.data;
    const hash = request.body.hash;

    if (!data || !hash) {
      throw new BadRequestException(
        'The request body must contain a data and hash property',
      );
    }

    // check if the request.body.data is not an string type and must be base64
    if (typeof data !== 'string' || !Buffer.from(data, 'base64')) {
      throw new BadRequestException(
        'The request body data must be a base64 string',
      );
    }

    try {
      // generate an HMAC hash of the data using the secret key
      const hmac = crypto.createHmac('sha512', process.env.HMAC_SECRET);
      hmac.update(data);
      const newHash = hmac.digest('hex');

      // log new hash
      // console.log(newHash);

      // compare the two hashes if they are equal
      if (hash !== newHash) {
        throw new BadRequestException('The HMAC hash is invalid');
      }

      // compare the two hashes using timingSafeEqual()
      // to prevent timing attacks (https://snyk.io/blog/node-js-timing-attack-ccc-ctf/)
      const valid = crypto.timingSafeEqual(
        Buffer.from(hash, 'hex'),
        Buffer.from(newHash, 'hex'),
      );

      if (!valid) {
        throw new BadRequestException('The HMAC hash is invalid');
      }

      return valid;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new BadRequestException('Something went wrong with the HMAC hash');
    }
  }
}
