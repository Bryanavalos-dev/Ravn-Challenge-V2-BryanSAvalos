import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

export class CheckForCouplesGuard implements CanActivate {
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest();
    const { limit, page, order, prop } = req.query;

    if (limit && !page) {
      throw new BadRequestException('You must send the page property');
    }
    if (page && !limit) {
      throw new BadRequestException('You must send the limit property');
    }
    return true;
  }
}
