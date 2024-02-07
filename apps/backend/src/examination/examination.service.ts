import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Examination } from './examination.entity';
import { Repository } from 'typeorm';
import slugify from 'slugify';

@Injectable()
export class ExaminationService {
    constructor(
        @InjectRepository(Examination)
        private readonly examinationRepository: Repository<Examination>
    ) {}
    
    async createExamination(
        data: Omit<Examination, 'createdAt' | 'updatedAt' | 'id' | 'slug' | 'numberOfStar' | 'numberOfTake' | 'createdBy'>,
    ) {
        const slug = slugify(data.title, { lower: true });
        return this.examinationRepository.save({ ...data, slug });
    }

    async getPublicExaminations() {
        return this.examinationRepository.find({
            select: ['id', 'title', 'slug', 'description', 'createdAt', 'updatedAt'],
            
        });
    }

    async getExaminationDetail(id: number) {
        return this.examinationRepository.findOne({
            where: { id },
            relations: ['questions'],
            relationLoadStrategy: 'join',
        })
    }
}
