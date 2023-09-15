import { map } from 'rxjs';
import { userSchema } from './schema.validation';
import {
  ArgumentMetadata,
  BadGatewayException,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class userCreateValidator implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    try {
      const pipe = await userSchema.validate(value, { abortEarly: false });
      return pipe;
    } catch (err) {
      //   const data = errorHandler(err.errors);
      throw new BadRequestException(errorHandler(err.errors)[0]);
    }
  }
}

//function for error handler

let obj: any = {};
const errorHandler = (error: any) =>
  error.map((err: any) => {
    const msg = err.split(' ');
    obj[msg[0]] = err;
    return obj;
  });
