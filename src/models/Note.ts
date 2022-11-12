import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity('notes')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  text: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
