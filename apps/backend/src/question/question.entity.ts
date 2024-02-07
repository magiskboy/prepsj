import { Examination } from "src/examination/examination.entity";
import { Column, Entity, JoinTable, ManyToMany } from "typeorm";

@Entity({ name: 'questions' })
export class Question {
    @Column({ primary: true, generated: true, type: 'integer' })
    id: number;

    @Column({ type: 'varchar' })
    content: string;
    
    @Column({ type: 'enum', enum: ['MCQ', 'Text'] })
    type: 'MCQ' | 'Text';
    
    @Column({ type: 'jsonb' })
    options?: IOption[];

    @ManyToMany(() => Examination, examination => examination.questions)
    @JoinTable()
    examinations?: Examination[];
}

export interface IOption {
    content: string;
    code: string;
    checked: boolean;
    explain?: string;
}