import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileEntity } from './entities/file.entity';
import { FileType } from './entities/file.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private repository: Repository<FileEntity>,
  ) {}

  findAll(userId: number, fileType: FileType) {
    const query = this.repository.createQueryBuilder('file');

    query.where('file.userId = :userId', { userId });

    if (fileType === FileType.PHOTOS) {
      query.andWhere('file.mimetype LIKE :mimetype', { mimetype: '%image%' });
    }

    if (fileType === FileType.TRASH) {
      query.andWhere('file.deletedAt IS NOT NULL').withDeleted();
    }

    if (fileType === FileType.ALL) {
      query.withDeleted();
    }

    return query.getMany();
  }

  create(file: Express.Multer.File, userId: number) {
    return this.repository.save({
      filename: file.filename,
      originalname: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      user: { id: userId },
    });
  }

  async remove(userId: number, ids: string) {
    const idsArray = ids.split(',').map(Number);

    const query = this.repository.createQueryBuilder('file');

    query.where('id IN (:...ids) AND userId = :userId', {
      ids: idsArray,
      userId,
    });

    return query.softDelete().execute();
  }
}
