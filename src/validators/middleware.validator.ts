import { plainToInstance } from 'class-transformer';
import {validate, ValidationError } from 'class-validator';
import * as express from 'express';
import HttpException from '.././exceptions/HttpExceptions';

function validationMiddleware<T>(type: any): express.RequestHandler {
  return(req, res, next) => {
    validate(plainToInstance(type, req.body))
    .then((errors: ValidationError[]) => {
      if(errors.length > 0){
        const message = errors.map((error: ValidationError) =>
        Object.values(error.constraints)). join(', ');
        next(new HttpException(400, message));}
        else{
          next();
        }
    });
  };
}

export default validationMiddleware;
