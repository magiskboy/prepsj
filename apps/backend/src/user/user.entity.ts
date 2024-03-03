import { Column, Entity } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @Column({
    type: 'varchar',
    primary: true,
  })
  id: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  password: string;

  @Column({ type: 'varchar', nullable: false })
  fullname: string;

  @Column({ type: 'boolean', default: false })
  isVerified: boolean;

  @Column({ type: 'varchar', nullable: true })
  locale: string;

  @Column({ type: 'varchar', nullable: true })
  profileURL: string;

  @Column({ type: 'varchar', nullable: true })
  googleId: string;

  @Column({ type: 'varchar', nullable: true })
  facebookId: string;

  @Column({ type: 'varchar', nullable: true })
  twitterId: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: null, onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
