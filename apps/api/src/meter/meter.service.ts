import { HttpStatus, Injectable } from '@nestjs/common';

import { CreateMeterDto } from './dto/create-meter.dto';
import { CreateMeterReadingDto } from './dto/create-meter-reading.dto';
import { PrismaService } from '@prisma/prisma.service';
import { AppException } from '@/common/exceptions/base.exception';
import { ExceptionCode } from '@/common/exceptions/exception-codes';

@Injectable()
export class MeterService {
  constructor(private prisma: PrismaService) {}

  async createMeter(roomId: number, dto: CreateMeterDto) {
    const room = await this.prisma.room.findUnique({
      where: { id: roomId },
      include: { meter: true },
    });

    if (!room) {
      throw new AppException(
        'Room not found',
        ExceptionCode.TENANT_ROOM_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    if (room.meter) {
      throw new AppException(
        'Room already has a meter',
        ExceptionCode.METER_ALREADY_EXISTS,
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.prisma.meter.create({
      data: {
        roomId,
        meterNumber: dto.meterNumber,
      },
    });
  }

  async getMeterByRoom(roomId: number) {
    return this.prisma.meter.findUnique({
      where: { roomId },
      include: {
        readings: {
          orderBy: {
            readingDate: 'desc',
          },
        },
      },
    });
  }

  async getMetersByBuilding(buildingId: number) {
    return this.prisma.meter.findMany({
      where: {
        room: {
          floor: {
            buildingId,
          },
        },
      },
      include: {
        room: true,
        readings: {
          orderBy: {
            readingDate: 'desc',
          },
        },
      },
    });
  }

  async addReading(meterId: number, dto: CreateMeterReadingDto) {
    const meter = await this.prisma.meter.findUnique({
      where: { id: meterId },
    });

    if (!meter) {
      throw new AppException(
        'Meter not found',
        ExceptionCode.METER_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.prisma.meterReading.create({
      data: {
        meterId,
        reading: dto.reading,
        readingDate: new Date(),
      },
    });
  }

  async getReadings(meterId: number) {
    return this.prisma.meterReading.findMany({
      where: { meterId },
      orderBy: {
        readingDate: 'desc',
      },
    });
  }
}
