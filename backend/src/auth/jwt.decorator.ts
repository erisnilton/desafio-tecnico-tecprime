import { createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

declare module 'express' {
  export interface Request {
    jwt: string;
    jwt_payload: any;
  }
}

export const Jwt = createParamDecorator((_, context) => {
  const req = context.switchToHttp().getRequest<Request>();
  return req.jwt;
});

export const JwtPayload = createParamDecorator((_, context) => {
  const req = context.switchToHttp().getRequest<Request>();
  return req.jwt_payload;
});

export const UserId = createParamDecorator((_, context) => {
  const req = context.switchToHttp().getRequest<Request>();
  return req.jwt_payload.sub;
});

