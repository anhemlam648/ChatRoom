import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Room } from './room.entity';
import { Message } from './message.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Room, room => room.owner)
  roomsOwned: Room[];

  @OneToMany(() => Message, message => message.user)
  messages: Message[];
}