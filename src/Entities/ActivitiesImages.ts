import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Activities } from './Activities';

@Entity()
export class ActivitiesImages extends BaseEntity {
  @PrimaryGeneratedColumn()
  img_id!: number;
  @Column()
  img_url: string;
  @Column('text')
  img_data: string;
  @ManyToOne(() => Activities, activity => activity.images)
  @JoinColumn({ name: 'act_id' })
  activity: Activities;
}
