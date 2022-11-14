import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Note } from './Note';
import { NoteShared } from './NoteShared';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Note, (note) => note.owner, { cascade: true })
  notes: Note[];

  @OneToMany(() => NoteShared, (noteShared) => noteShared.owner, { cascade: true })
  notes_shared: NoteShared[];

  @OneToMany(() => NoteShared, (noteShared) => noteShared.receiver, { cascade: true })
  notes_received: NoteShared[];

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
