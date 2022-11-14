import { BaseEntity, Column, ManyToOne, Entity, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Note } from './Note';
import { User } from './User';

@Entity('note_shared')
export class NoteShared extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  ownerId: string;

  @ManyToOne(() => User, (user) => user.notes_shared, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @Column()
  receiverId: string;

  @ManyToOne(() => User, (user) => user.notes_received, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'receiverId' })
  receiver: User;

  @Column()
  noteId: string;

  @ManyToOne(() => Note, (note) => note.shares, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'noteId' })
  note: Note;
}
