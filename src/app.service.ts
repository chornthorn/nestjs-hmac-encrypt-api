import { Injectable, BadRequestException } from '@nestjs/common';
import * as crypto from 'crypto'; // import * as is used to import the entire module

@Injectable()
export class AppService {
  // create hmac hash function
  async createHmacHash(data: any) {
    try {
      // convert data to base64 string
      const dataString = Buffer.from(JSON.stringify(data)).toString('base64');

      // create hmac hash
      const hmac = crypto.createHmac('sha512', process.env.HMAC_SECRET);
      hmac.update(dataString);

      // convert hmac hash to hex string
      const hash = hmac.digest('hex');
      return { hash };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // verify hmac hash function
  async verifyHmacHash(data: any, hash: string) {
    try {
      // convert data to base64 string
      const dataString = Buffer.from(JSON.stringify(data)).toString('base64');

      // create hmac hash
      const hmac = crypto.createHmac('sha512', process.env.HMAC_SECRET);
      hmac.update(dataString);

      // convert hmac hash to hex string
      const newHash = hmac.digest('hex');

      // compare the two hashes
      if (newHash === hash) {
        return { verified: true };
      } else {
        return { verified: false };
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // check valid hmac hash function using timing safe equal
  async checkValidHmacHash(data: any, hash: string) {
    try {
      // convert data to base64 string
      const dataString = Buffer.from(JSON.stringify(data)).toString('base64');

      // create hmac hash
      const hmac = crypto.createHmac('sha512', process.env.HMAC_SECRET);
      hmac.update(dataString);

      // convert hmac hash to hex string
      const newHash = hmac.digest('hex');

      // compare the two hashes
      const valid = crypto.timingSafeEqual(
        Buffer.from(hash), // convert hash to buffer
        Buffer.from(newHash),
      );

      return { valid };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
