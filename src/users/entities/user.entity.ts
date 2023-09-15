import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { addresses } from './address.entity';

@Entity()
export class users {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  firstName: string;

  @Column({ type: 'varchar', nullable: true })
  lastName: string;

  @Column({ type: 'varchar', nullable: true })
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isDeleted: boolean;

  @OneToMany(() => addresses, (addresses) => addresses.users, {
    cascade: true,
    nullable: true,
    onUpdate: 'CASCADE',
    eager: true,
    orphanedRowAction: 'delete',
  })
  addresses: addresses[];
}
