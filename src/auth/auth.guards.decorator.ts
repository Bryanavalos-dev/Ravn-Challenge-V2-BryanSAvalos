import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export class CheckForCouplesGuard implements CanActivate {
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest();
    const { limit, page } = req.query;

    if (limit && !page) {
      throw new BadRequestException('You must send the page property');
    }
    if (page && !limit) {
      throw new BadRequestException('You must send the limit property');
    }
    return true;
  }
}

export class CheckForPermissionGuard implements CanActivate {
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest();

    const routePath = req.route.path.split('/')[1];
    const routeMethod = Object.keys(req.route.methods)[0];
    const userPermission = req.user.profile.permissions ?? null;

    switch (routePath) {
      case 'products':
        switch (routeMethod) {
          case 'post':
            if (
              req.route.path.includes('upload-image') &&
              userPermission.uploadImagesPerProducts
            )
              return true;
            if (userPermission.createProducts) {
              return true;
            } else {
              throw new UnauthorizedException(
                "You don't have permission to do this.",
              );
            }

          case 'put':
            if (
              req.route.path.includes('status') &&
              userPermission.changeProductsStatus
            )
              return true;
            if (userPermission.updateProducts) {
              return true;
            } else {
              throw new UnauthorizedException(
                "You don't have permission to do this.",
              );
            }

          case 'delete':
            if (userPermission.deleteProducts) {
              return true;
            } else {
              throw new UnauthorizedException(
                "You don't have permission to do this.",
              );
            }
        }
        break;
    }
  }
}
