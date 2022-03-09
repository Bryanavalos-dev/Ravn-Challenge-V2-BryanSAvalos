import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Repository } from 'typeorm';

const logger = new Logger('Tools');

export function logDatabaseError(type: string, error: any): void {
  let message: string;
  switch (error.name) {
    case 'QueryFailedError':
      switch (error.code) {
        case '23503':
          message = `The ${type} can't be earesed`;

          break;
        case '22P02':
          message = `El formato de id para el ${type} seleccionado es incorrecto.`;
          break;
        default:
          message = 'Error no identificada en la base de datos.';
          break;
      }
      throw new BadRequestException(message);
    case 'EntityNotFound':
    case 'EntityNotFoundError':
      throw new BadRequestException(`El ${type} seleccionado no existe.`);

    default:
      throw new InternalServerErrorException('Error no identificado');
  }
}

export function applyMixins(derivedCtor: any, constructors: any[]) {
  constructors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      Object.defineProperty(
        derivedCtor.prototype,
        name,
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
          Object.create(null),
      );
    });
  });
}
