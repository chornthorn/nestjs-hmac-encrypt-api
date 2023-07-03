import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

/**
 * A decorator that decodes a base64-encoded value from the request body and returns it.
 * @param key - The key of the value to decode.
 * @param context - The execution context of the request.
 * @returns The decoded value from the request body.
 */
export const DecodeBase64 = createParamDecorator(
  (key: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const body = request.body;

    if (body && body[key]) {
      try {
        const decodedValue = Buffer.from(body[key], 'base64').toString('utf-8');
        const parsedValue = JSON.parse(decodedValue);
        if (typeof parsedValue === 'object' && parsedValue !== null) {
          body[key] = parsedValue;
        } else {
          throw new BadRequestException(`Invalid JSON object in ${key}`);
        }
      } catch (error) {
        throw new BadRequestException(
          `The request body ${key} must be a base64 string that contains a JSON object `,
        );
      }
    } else {
      // throw an error if the request body does not contain the key
      throw new BadRequestException(
        `The request body must contain a ${key} key`,
      );
    }

    return body[key];
  },
);
