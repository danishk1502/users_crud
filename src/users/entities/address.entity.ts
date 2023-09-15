import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { users } from './user.entity';

@Entity()
export class addresses {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'varchar', nullable: true })
  State: string;

  @Column({ type: 'varchar', nullable: true })
  Distt: string;

  @Column({ type: 'varchar', nullable: true })
  Countary: string;

  @Column({ type: 'varchar', nullable: true })
  Zip: string;

  @ManyToOne(() => users, (users) => users.id, {
    nullable: true,
    orphanedRowAction: 'delete',
  })
  @JoinColumn()
  users: string;
}
