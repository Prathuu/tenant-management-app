import { SetMetadata } from '@nestjs/common';

export const ACCESS_KEY = 'access_resource';

export type AccessResource =
  | 'building'
  | 'tenant'
  | 'invoice'
  | 'lease'
  | 'payment'
  | 'room'
  | 'meter'
  | 'maintenance';

export const Access = (resource: AccessResource, paramKey: string) =>
  SetMetadata(ACCESS_KEY, { resource, paramKey });
