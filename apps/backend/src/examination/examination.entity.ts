import { Question } from 'src/question/question.entity';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity({ name: 'examinations' })
export class Examination {
  @Column({ primary: true, generated: true, type: 'integer' })
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'varchar', default: 'admin@prepsj.com' })
  createdBy: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: string;

  @Column({ type: 'integer', default: 0 })
  numberOfStar: number;

  @Column({ type: 'integer', default: 0 })
  numberOfTake: number;

  @ManyToMany(() => Question, (question) => question.examinations)
  questions?: Question[];
}
