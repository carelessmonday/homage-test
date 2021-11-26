import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('clinics')
export default class Clinic {
  @PrimaryGeneratedColumn()
    id: number;

  @Column('text')
    name: string;
}
