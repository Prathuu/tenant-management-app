import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

import { Reflector } from '@nestjs/core';
import { AccessService } from './access.service';
import { ACCESS_KEY, AccessResource } from './access.decorator';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private accessService: AccessService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const metadata = this.reflector.getAllAndOverride<{
      resource: AccessResource;
      paramKey: string;
    }>(ACCESS_KEY, [context.getHandler(), context.getClass()]);

    if (!metadata) return true;

    const request = context.switchToHttp().getRequest();

    const user = request.user;

    const resourceId = Number(request.params[metadata.paramKey]);

    switch (metadata.resource) {
      case 'building':
        await this.accessService.validateBuildingAccess(
          user.userId,
          user.role,
          resourceId,
        );
        break;

      case 'tenant':
        await this.accessService.validateTenantAccess(
          user.userId,
          user.role,
          resourceId,
        );
        break;

      case 'invoice':
        await this.accessService.validateInvoiceAccess(
          user.userId,
          user.role,
          resourceId,
        );
        break;

      case 'lease':
        await this.accessService.validateLeaseAccess(
          user.userId,
          user.role,
          resourceId,
        );
        break;

      case 'payment':
        await this.accessService.validatePaymentAccess(
          user.userId,
          user.role,
          resourceId,
        );
        break;

      case 'room':
        await this.accessService.validateRoomAccess(
          user.userId,
          user.role,
          resourceId,
        );
        break;

      case 'meter':
        await this.accessService.validateMeterAccess(
          user.userId,
          user.role,
          resourceId,
        );
        break;

      case 'maintenance':
        await this.accessService.validateMaintenanceAccess(
          user.userId,
          user.role,
          resourceId,
        );
        break;
    }

    return true;
  }
}
