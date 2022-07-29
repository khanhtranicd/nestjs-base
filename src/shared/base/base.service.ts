import { Repository } from 'typeorm';
import { BaseServiceOptions } from '@shared/common/types';
import { DELETE_MODE } from '@shared/common/constants';

export class BaseService<T> {
  repository: Repository<T>;
  deleteMode: string;
  constructor(options: BaseServiceOptions) {
    this.repository = options.repository;
    this.deleteMode = options.deleteMode;
  }

  protected mapRequestDtoToModel(requestDto: any): any {
    return requestDto;
  }

  protected mapModelToResponseDto(record: T): any {
    return record;
  }

  public async findOne(options = {}): Promise<any> {
    const existingRecord: T = await this.repository.findOne(options);
    return existingRecord ? this.mapModelToResponseDto(existingRecord) : null;
  }

  public async update(id: number, data: any): Promise<T> {
    try {
      const existingRecord: T = await this.findOne({ id });
      if (!existingRecord) {
        return Promise.reject('Record not found');
      }

      data = { ...existingRecord, ...data };
      data = this.removeTemporaryFields(data);
      await this.repository.update(id, data);

      return Promise.resolve(data);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  public removeTemporaryFields(entity: T) {
    return entity;
  }

  public async deleteById(id): Promise<void> {
    try {
      if (this.deleteMode === DELETE_MODE.Hard) {
        await this.repository.delete(id);
        return Promise.resolve();
      }

      await this.update(id, { delete_flg: true });
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
